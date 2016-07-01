define([
    "component/fluido/master/task",
    "component/fluido/master/flow",
    "component/fluido/transaction/flow",
    "component/fluido/transaction/task",
    "component/fluido/transaction/task/variable",
    "component/fluido/agent/event",
    "component/fluido/agent/task"
], function(){
    alt.factory("Fluido_Agent", [
        "$log", "$q", "$validate", "Fluido_Master_Task", "Fluido_Master_Flow", "Fluido_Transaction_Flow", "Fluido_Transaction_Task", "Fluido_Transaction_Task_Variable", "Fluido_Agent_Task", "Fluido_Agent_Event",
        function($log, $q, $validate, Fluido_Master_Task, Fluido_Master_Flow, Fluido_Transaction_Flow, Fluido_Transaction_Task, Fluido_Transaction_Task_Variable, Fluido_Agent_Task, Fluido_Agent_Event){
            var Fluido_Agent = function(data){
                var agent = typeof Fluido_Agent[data.type + "_" + data.subtype] !== "undefined" ?
                    new Fluido_Agent[data.type + "_" + data.subtype]():
                    new Fluido_Agent[data.type]();

                // set data
                agent.data = data;

                /**
                 * Create or retrieve task based on data
                 * 
                 * @returns {deferred.promise|{then, catch, finally}}
                 */
                agent._connect = function(){
                    var deferred = $q.defer();

                    if($validate.required(agent.data.trxtaskid)){
                        Fluido_Transaction_Task.insert(data).then(function(response){
                            agent.data.trxtaskid = response.data;
                            deferred.resolve(agent.data);
                        }).catch(function(error){
                            deferred.reject(error.status ? error : {status: 500, message: "Tidak dapat menambah task!"});
                        });
                    }else{
                        Fluido_Transaction_Task.retrieve(data).then(function(response){
                            agent.data = response.data;
                            deferred.resolve(agent.data);
                        }).catch(function(error){
                            deferred.reject(error.status ? error : {status: 500, message: "Tidak dapat menambah task!"});
                        });
                    }

                    return deferred.promise;
                };
                agent.connect = agent.connect || agent._connect;

                /**
                 * Evaluate an expression with data
                 * @param expression
                 * @param data
                 * @private
                 */
                agent._evaluate = function(expression, data){
                    data = data || {};
                    
                    if(expression == true || expression == "")
                        return true;
                    
                    try{
                        var exp = "'use strict'";
                        angular.forEach(data, function(val, key){
                            exp = exp + " var " + key + " = " + (typeof val === "string" ? "\"" + val + "\"" : val) + ";";
                        });
                        exp += expression;

                        expression = eval(exp);
                    }catch(e){
                        expression = false;
                    }

                    return expression;
                };
                agent.evaluate = agent.evaluate || agent._evaluate;

                /**
                 * Do the job
                 *
                 * @returns {deferred.promise|{then, catch, finally}}
                 * @private
                 */
                agent._run = function(){
                    var deferred = $q.defer();

                    agent.connect().then(function(){
                        return Fluido_Transaction_Task.update({
                            trxtaskid: agent.data.trxtaskid,
                            status: "running"
                        });
                    }).catch(function(error){
                        deferred.reject(error.status ? error : {status: 500, message: "Tidak dapat menjalankan task!"});
                    });

                    return deferred.promise;
                };
                agent.run = agent.run || agent._run;

                /**
                 * Completing task, call next agents
                 *
                 * @returns {deferred.promise|{then, catch, finally}}
                 * @private
                 */
                agent._complete = function(){
                    var deferred = $q.defer();

                    Fluido_Transaction_Task.update({
                        trxtaskid: agent.data.trxtaskid,
                        status: "complete"
                    }).then(function(response){
                        return Fluido_Master_Flow.get({
                            select: "target, expression, flowid",
                            processid: "= " + agent.data.processid,
                            deploymentid: "= " + agent.data.deploymentid,
                            source: "= " + agent.data.taskid
                        });
                    }).then(function(response){
                        var promise = [];
                        angular.forEach(response.data, function(task, key){
                            if(!agent.evaluate(task.expression))
                                return;

                            // get next task
                            var newtask = {},
                                newagent;

                            promise.push(
                                Fluido_Master_Task.retrieve({
                                    processid: "= " + agent.data.processid,
                                    deploymentid: "= " + agent.data.deploymentid,
                                    taskid: task.target
                                }).then(function(response) {
                                    newtask = angular.copy(response.data);
                                    newtask.trxprocessid = agent.data.trxprocessid;
                                    newtask.rev = 1;
                                    newtask.processid = agent.data.processid;
                                    newtask.deploymentid = agent.data.deploymentid;

                                    // create agent
                                    newagent = Fluido_Agent(newtask);
                                    return newagent.connect();
                                }).then(function(response){
                                    // save to trx_flow
                                    return Fluido_Transaction_Flow.insert({
                                        flowid: task.flowid,
                                        deploymentid: agent.data.deploymentid,
                                        processid: agent.data.processid,
                                        trxprocessid: agent.data.trxprocessid,
                                        trxtasksource: agent.data.trxtaskid,
                                        trxtasktarget: newagent.data.trxtaskid
                                    });
                                }).then(function(response){
                                    // run new agent
                                    return newagent.run();
                                })
                            );
                        });

                        return $q.all(promise);
                    }).then(function(response){
                        deferred.resolve(agent.data);
                    }).catch(function(error){
                        deferred.reject(error.status ? error : {status: 500, message: "Tidak dapat menyelesaikan task!"});
                    });

                    return deferred.promise;
                };
                agent.complete = agent.complete || agent._complete;

                /**
                 * Recursive cancel
                 *
                 * @returns {deferred.promise|{then, catch, finally}}
                 * @private
                 */
                agent._cancel = function(){
                    var deferred = $q.defer();

                    Fluido_Transaction_Task.update({
                        trxtaskid: agent.data.trxtaskid,
                        status: "cancel"
                    }).then(function(response){
                        // get targets from trx_flow
                        return Fluido_Transaction_Flow.get({
                            select: "trxtasktarget",
                            trxtasksource: "= " + agent.data.trxtaskid
                        });
                    }).then(function(response){
                        // cancel all next targets
                        var promise = [];
                        angular.forEach(response.data, function(task, key){
                            promise.push(
                                Fluido_Transaction_Task.retrieve({
                                    trxtaskid: task.trxtasktarget
                                }).then(function(response) {
                                    // create agent
                                    return Fluido_Agent(response.data).cancel();
                                })
                            );
                        });

                        return $q.all(promise);
                    }).catch(function(error){
                        deferred.reject(error.status ? error : {status: 500, message: "Tidak dapat membatalkan task!"});
                    });

                    return deferred.promise;
                };
                agent.cancel = agent.cancel || agent._cancel;

                return agent;
            };

            var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
            var ARGUMENT_NAMES = /([^\s,]+)/g;
            function getParamNames(func) {
                var fnStr = func.toString().replace(STRIP_COMMENTS, '');
                var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
                if(result === null)
                    result = [];
                return result;
            }

            var arg = arguments;
            angular.forEach(getParamNames(arg.callee), function(val, key){
                if(val.indexOf("Fluido_Agent_") === 0)
                    Fluido_Agent[val.replace("Fluido_Agent_", "").toLowerCase()] = arg[key];
            });

            return Fluido_Agent;
        }
    ]);
});
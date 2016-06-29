define([
    "component/fluido/agent",
    "component/fluido/master/process",
    "component/fluido/master/task",
    "component/fluido/master/flow",
    "component/fluido/transaction/process",
    "component/fluido/transaction/process/variable",
    "component/fluido/transaction/task",
    "component/fluido/transaction/task/variable",
    "component/fluido/transaction/flow"
], function(){
    alt.factory("Fluido_Process", [
        "$log", "$q", "$validate", "Fluido_Agent", "Fluido_Master_Process", "Fluido_Master_Task", "Fluido_Master_Flow", "Fluido_Transaction_Process", "Fluido_Transaction_Process_Variable", "Fluido_Transaction_Task", "Fluido_Transaction_Task_Variable", "Fluido_Transaction_Flow",
        function($log, $q, $validate, Fluido_Agent, Fluido_Master_Process, Fluido_Master_Task, Fluido_Master_Flow, Fluido_Transaction_Process, Fluido_Transaction_Process_Variable, Fluido_Transaction_Task, Fluido_Transaction_Task_Variable, Fluido_Transaction_Flow){
            var Fluido_Task = {
                // status
                START: "start",
                RUNNING: "running",
                COMPLETE: "complete",
                CANCEL: "cancel",

                // type
                TASK: "task",
                EVENT: "event",
                GATEWAY: "gateway",

                // subtype
                TASK_USER: "user",
                GATEWAY_EXCLUSIVE: "exclusive",

                /**
                 * Additional validation
                 * - revision
                 * - status
                 *
                 * @param data
                 * @returns {deferred.promise|{then, catch, finally}}
                 */
                validate: function(param){
                    var data = angular.copy(param || {});
                    data.force = data.force && data.force == 1;

                    var deferred = $q.defer();

                    // retrieve task
                    Fluido_Transaction_Task.retrieve({
                        select: "trxtaskid, rev, status",
                        trxtaskid: data.trxtaskid
                    }).then(function(response){
                        var task = response.data;

                        // check revision
                        if(data.rev < task.rev){
                            deferred.reject({status: 500, message: "Update task terlebih dahulu!"});
                        }else if(task.status != Fluido_Task.RUNNING && data.force){
                            deferred.reject({status: 500, message: "Task sedang tidak berjalan!"});
                        }else{
                            deferred.resolve(task);
                        }
                    }).catch(function(error){
                        deferred.reject(error.status ? error : {status: 500, message: "Tidak dapat mengambil task!"});
                    });

                    return deferred.promise;
                },

                /**
                 * Helper for quote
                 *
                 * @param string
                 * @returns {string}
                 */
                quote: function(string){
                    return Fluido_Transaction_Task.quote(string);
                },

                /**
                 * Count tasks
                 *
                 * @param data
                 * @returns {deferred.promise|{then, catch, finally}}
                 */
                count: function(data){
                    return Fluido_Transaction_Process.count(data);
                },

                /**
                 * Get all tasks
                 *
                 * @returns {deferred.promise|{then, catch, finally}}
                 */
                get: function(data){
                    return Fluido_Transaction_Task.get(data);
                },

                /**
                 * Get all task based on search
                 *
                 * @param data
                 * @returns {deferred.promise|{then, catch, finally}}
                 */
                table: function(data){
                    return Fluido_Transaction_Task.table(data);
                },

                /**
                 * Return task based on task id
                 * @param data
                 * @returns {deferred.promise|{then, catch, finally}}
                 */
                retrieve: function(data){
                    var deferred = $q.defer(),
                        isvalid = $validate()
                            .rule($validate.required(data.trxtaskid), "Task belum dipilih!")
                            .validate();

                    if(!isvalid.res){
                        deferred.reject({status: 500, message: isvalid.message});
                    }else{
                        var task;
                        Fluido_Transaction_Task.retrieve(data).then(function(response){
                            task = response.data;
                            return Fluido_Transaction_Task_Variable.keyvalues({
                                trxtaskid: "= " + data.trxtaskid,
                                key: "field",
                                values: "content"
                            });
                        }).then(function(response){
                            task.variable = response.data;
                            deferred.resolve({status: 200, data: task});
                        }).catch(function(error){
                            deferred.reject(error.status ? error : {status: 500, message: "Tidak dapat mengambil task!"});
                        });
                    }

                    return deferred.promise;
                },

                /**
                 * Start task, create if not exist
                 *
                 * @param data
                 * @returns {deferred.promise|{then, catch, finally}}
                 */
                start: function(data){
                    var deferred = $q.defer();

                    if(!$validate.required(data.trxtaskid) && $validate.required(data.taskid)){
                        Fluido_Master_Task.retrieve(data).then(function(response){
                            return Fluido_Agent.factory(response.data).run();
                        }).then(function(response){
                            deferred.resolve(response.data);
                        }).catch(function(error){
                            deferred.reject(error.status ? error : {status: 500, message: "Tidak dapat menjalankan task!", data: error});
                        });
                    }else if(!$validate.required(data.trxtaskid)){
                        deferred.reject({status: 500, message: "Taskid atau Trxtaskid harus diisi!"})
                    }else{
                        Fluido_Agent.factory(data).run().then(function(response){
                            deferred.resolve(response.data);
                        }).catch(function(error){
                            deferred.reject(error.status ? error : {status: 500, message: "Tidak dapat menjalankan task!"});
                        });
                    }

                    return deferred.promise;
                },

                /**
                 * Save task
                 *
                 * @param data
                 * @returns {deferred.promise|{then, catch, finally}}
                 */
                save: function(data){
                    var deferred = $q.defer(),
                        isvalid = $validate()
                            .rule($validate.required(data.trxtaskid), "Task belum dipilih!")
                            .rule($validate.required(data.rev), "Versi task belum diisi!")
                            .validate();

                    if(!isvalid.res){
                        deferred.reject({status: 500, message: isvalid.message});
                    }else{
                        // set task variable
                        data.variable = data.variable || [];

                        // additional validation
                        Fluido_Task.validate(data).then(function(response){
                            // update task, increment version
                            data.rev++;

                            return Fluido_Transaction_Task.update(data);
                        }).then(function(response){
                            deferred.resolve(response);
                        }).catch(function(e){
                            deferred.reject(e.status ? e : {status: 500, "Tidak dapat menyimpan task!"});
                        });
                    }

                    return deferred.promise;
                },

                /**
                 * Complete task
                 *
                 * @returns {deferred.promise|{then, catch, finally}}
                 */
                complete: function(data){
                    var deferred = $q.defer(),
                        isvalid = $validate()
                            .rule($validate.required(data.trxtaskid), "Task belum dipilih!")
                            .rule($validate.required(data.rev), "Versi task belum diisi!")
                            .check();

                    if(!isvalid.res){
                        deferred.reject({status: 500, message: isvalid.message});
                    }else{
                        Fluido_Task.save(data).then(function(response){
                            return Fluido_Transaction_Task.retrieve({
                                select: "trxtaskid, type, subtype",
                                trxtaskid: data.trxtaskid
                            });
                        }).then(function(response){
                            return Fluido_Agent.factory(response.data).complete();
                        }).then(function(response){
                            deferred.resolve(response.data);
                        }).catch(function(error){
                            deferred.reject(error.status ? error : {status: 500, message: "Tidak dapat menyelesaikan task!"});
                        });
                    }

                    return deferred.promise;
                }
            };

            return Fluido_Task;
        }
    ]);
});
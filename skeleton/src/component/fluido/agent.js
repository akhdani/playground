define([
    "component/fluido/transaction/task",
    "component/fluido/transaction/task/variable",
    "component/fluido/agent/task"
], function(){
    alt.factory("Fluido_Agent", [
        "$log", "$q", "$validate", "Fluido_Transaction_Task", "Fluido_Transaction_Task_Variable", "Fluido_Agent_Task",
        function($log, $q, $validate, Fluido_Transaction_Task, Fluido_Transaction_Task_Variable, Fluido_Agent_Task){
            var Fluido_Agent = function(data){
                var agent = typeof Fluido_Agent[data.type + "_" + data.subtype] !== "undefined" ?
                    new Fluido_Agent[data.type + "_" + data.subtype]():
                    new Fluido_Agent[data.type]();

                agent.data = data;
                agent._run = function(){
                    console.log("agent run", this);
                };
                agent.run = agent.run || agent._run;

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
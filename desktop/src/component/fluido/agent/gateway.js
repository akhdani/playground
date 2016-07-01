define([
    "component/fluido/transaction/flow",
    "component/fluido/transaction/task/variable"
], function(){
    alt.factory("Fluido_Agent_Gateway", [
        "$log", "$q", "$validate", "Fluido_Transaction_Flow", "Fluido_Transaction_Task_Variable",
        function($log, $q, $validate, Fluido_Transaction_Flow, Fluido_Transaction_Task_Variable){
            var Fluido_Agent_Gateway = function(){};

            /**
             * Gateway evaluate data from previous task variable
             *
             * @param expression
             * @param data
             * @returns {deferred.promise|{then, catch, finally}}
             */
            Fluido_Agent_Gateway.prototype.evaluate = function(expression, data){
                data = data || {};

                var self = this;

                if(Object.keys(data).length == 0){
                    return Fluido_Transaction_Flow.retrieve({
                        select: "trxtasksource",
                        trxtasktarget: "= " + self.data.trxtaskid
                    }).then(function(response){
                        return Fluido_Transaction_Task_Variable.keyvalues({
                            trxtaskid: "= " + response.data.trxtasksource,
                            key: "field",
                            values: "content"
                        });
                    }).then(function(response){
                        return self._evaluate(expression, response.data);
                    });
                }else{
                    return this._evaluate(expression, data);
                }
            };

            /**
             * Auto close task when event completed
             *
             * @returns {deferred.promise|{then, catch, finally}}
             */
            Fluido_Agent_Gateway.prototype.run = function(){
                var self = this;
                return self._run().then(function(){
                    return self.complete();
                });
            };

            return Fluido_Agent_Gateway;
        }
    ]);
});
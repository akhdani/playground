define([

], function(){
    alt.factory("Fluido_Agent_Event", [
        "$log", "$q", "$validate",
        function($log, $q, $validate){
            var Fluido_Agent_Event = function(){};

            /**
             * Auto close task when event completed
             *
             * @returns {deferred.promise|{then, catch, finally}}
             */
            Fluido_Agent_Event.prototype.run = function(){
                var self = this;
                return self._run().then(function(){
                    return self.complete();
                });
            };

            return Fluido_Agent_Event;
        }
    ]);
});
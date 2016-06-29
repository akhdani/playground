define([

], function(){
    alt.factory("Fluido_Agent_Task", [
        "$log", "$q", "$validate",
        function($log, $q, $validate){
            var Fluido_Agent_Task = function(){};

            Fluido_Agent_Task.prototype.run = function(){
                this._run();
                console.log("agent task run", this);
            };

            return Fluido_Agent_Task;
        }
    ]);
});
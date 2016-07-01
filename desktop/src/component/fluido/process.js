define([
    "component/fluido/master/process",
    "component/fluido/master/task",
    "component/fluido/master/flow",
    "component/fluido/transaction/process",
    "component/fluido/transaction/process/variable",
    "component/fluido/transaction/task",
    "component/fluido/transaction/task/variable",
    "component/fluido/transaction/flow",
    "component/fluido/task"
], function(){
    alt.factory("Fluido_Process", [
        "$log", "$q", "$validate", "Fluido_Master_Process", "Fluido_Master_Task", "Fluido_Master_Flow", "Fluido_Transaction_Process", "Fluido_Transaction_Process_Variable", "Fluido_Transaction_Task", "Fluido_Transaction_Task_Variable", "Fluido_Transaction_Flow", "Fluido_Task",
        function($log, $q, $validate, Fluido_Master_Process, Fluido_Master_Task, Fluido_Master_Flow, Fluido_Transaction_Process, Fluido_Transaction_Process_Variable, Fluido_Transaction_Task, Fluido_Transaction_Task_Variable, Fluido_Transaction_Flow, Fluido_Task){
            var Fluido_Process = {
                validate: function(data){
                    var deferred = $q.defer();



                    return deferred.promise;
                },
                count: function(data){
                    return Fluido_Transaction_Process.count(data);
                }
            };

            return Fluido_Process;
        }
    ]);
});
define([
    "component/fluido/master/deployment",
    "component/fluido/master/process",
    "component/fluido/master/task",
    "component/fluido/master/flow"
], function(){
    return ["$scope", "$log", "$alert", "Fluido_Master_Deployment", "Fluido_Master_Process", "Fluido_Master_Task", "Fluido_Master_Flow", function($scope, $log, $alert, Fluido_Master_Deployment, Fluido_Master_Process, Fluido_Master_Task, Fluido_Master_Flow){
        Fluido_Master_Deployment.list().then(function(response){
            console.log("deployment", response.data);
        });

        Fluido_Master_Process.list().then(function(response){
            console.log("process", response.data);
        });

        Fluido_Master_Task.list().then(function(response){
            console.log("task", response.data);
        });

        Fluido_Master_Flow.list().then(function(response){
            console.log("flow", response.data);
        });
    }];
});
define([
    "component/fluido/agent"
], function(){
    return ["$scope", "$log", "$alert", "Fluido_Agent", function($scope, $log, $alert, Fluido_Agent){
        Fluido_Agent({type: "task"}).run();
    }];
});
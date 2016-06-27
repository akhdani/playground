define([
    "component/todo/project",
    "component/todo/task",
    "component/todo/tag"
], function(){
    return ["$scope", "$log", "$rootScope", "$window", "Todo_Project", "Todo_Task", "Todo_Tag", function($scope, $log, $rootScope, $window, Todo_Project, Todo_Task, Todo_Tag){
        $rootScope.theme.layout = "layout1";
        $rootScope.theme.template = "content";

        Todo_Project.retrieve({select: "title"}).then(function(response) {
            console.log("project", response);
        });

        /*Todo_Task.list().then(function(response){
            console.log("task", response);
        });

        Todo_Tag.list().then(function(response){
            console.log("tag", response);
        });*/
    }];
});
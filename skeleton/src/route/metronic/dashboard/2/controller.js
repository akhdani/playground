define([

], function(){
    return ["$scope", "$log", "$rootScope", "$routeParams", function($scope, $log, $rootScope, $routeParams){
        $rootScope.theme.layout = "layout2";
        $rootScope.theme.template = "content";
    }];
});
define([

], function(){
    return ["$scope", "$log", "$rootScope", "$routeParams", function($scope, $log, $rootScope, $routeParams){
        $rootScope.theme.layout = "layout1";
        $log.debug("b");
    }];
});
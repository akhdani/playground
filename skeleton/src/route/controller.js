define([

], function(){
    return ["$scope", "$log", "$rootScope", "$window", function($scope, $log, $rootScope, $window){
        $rootScope.theme.layout = "layout1";
        $rootScope.theme.template = "content";
    }];
});
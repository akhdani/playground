define([

], function(){
    return ["$scope", "$log", "$timeout", "$rootScope", function($scope, $log, $timeout, $rootScope){
        $scope.title = "Toolbar Title";
        $scope.description = "Toolbar Description";
        $scope.breadcrumb = [{
            title: "Toolbar"
        }, {
            title: "Breadcrumb"
        }];
    }];
});
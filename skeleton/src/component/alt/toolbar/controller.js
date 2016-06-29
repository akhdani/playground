define([

], function(){
    return ["$scope", "$log", "$interval", "$rootScope", function($scope, $log, $interval, $rootScope){
        $scope.title = "Toolbar Title";
        $scope.description = "Toolbar Description";
        $scope.breadcrumb = [{
            title: "Toolbar"
        }, {
            title: "Breadcrumb"
        }];

        $scope.moment = moment;
        $scope.time = moment();
        $interval(function(){
            $scope.time = moment();
        }, 1000);
    }];
});
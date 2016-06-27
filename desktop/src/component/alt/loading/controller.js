define([
    
], function () {
    return ["$scope", "$log", "$rootScope", "$loading", function ($scope, $log, $rootScope, $loading) {
        $rootScope.$loading.counter = $rootScope.$loading.counter || 0;
        $scope.counter = 0;
        $scope.isshow = false;
    }]
});
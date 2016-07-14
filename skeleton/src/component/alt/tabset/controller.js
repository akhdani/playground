define([
    "component/alt/tabset/tab/controller"
], function () {
    return ["$scope", "$log", "$timeout", function ($scope, $log, $timeout) {
        $scope.tabs = [];
        $scope.current = 0;

        $scope.onselect = angular.noop;
        $scope.select = function(index) {
            var tab = $scope.tabs[index];

            if(tab.isdisabled)
                return;

            angular.forEach($scope.tabs, function (tab) {
                tab.isactive = false;
            });
            tab.isactive = true;

            $scope.onselect();
        };

        $timeout(function(){
            angular.forEach($scope.tabs, function(val, key){
                $scope.tabs[key].isshow = typeof $scope.tabs[key].isshow === "undefined" ? true : $scope.tabs[key].isshow;
                $scope.tabs[key].isactive = typeof $scope.tabs[key].isactive === "undefined" ? false : $scope.tabs[key].isactive;
            });

            $scope.select($scope.current);
        });
    }]
});
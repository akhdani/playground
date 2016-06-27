define([
    'component/alt/tabset/tab/controller'
], function () {
    return ['$scope', '$log', function ($scope, $log) {
        $scope.tabs = [];

        $scope.select = function (tab) {
            if(tab.isdisabled)
                return;

            angular.forEach($scope.tabs, function (tab) {
                tab.selected = false;
            });
            tab.selected = true;
        };

        $scope.add = function (tab) {
            if ($scope.tabs.length === 0 && tab.show) {
                $scope.select(tab);
            }
            $scope.tabs.push(tab);
        };
    }]
});
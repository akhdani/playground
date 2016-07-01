define([

], function(){
    return ["$scope", "$log", "$timeout", "$rootScope", "$compile", function($scope, $log, $timeout, $rootScope, $compile){
        $scope.panes = [{title: "Pills", isactive: false}];
        $scope.current = 0;
        $scope.onselect = angular.noop;
        $scope.select = function(stepid){
            var previd = $scope.current;
            angular.forEach($scope.panes, function(value, key){
                value.isactive = false;
            });
            $scope.panes[stepid].isactive = true;
            $scope.current = stepid;

            // call onselect
            $scope.onselect(stepid, previd);
        };

        $timeout(function(){
            $scope.select(0);
        });
    }];
});
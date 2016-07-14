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
            angular.forEach($scope.panes, function(val, key){
                $scope.panes[key].isshow = typeof $scope.panes[key].isshow === "undefined" ? true : $scope.panes[key].isshow;
                $scope.panes[key].isactive = typeof $scope.panes[key].isactive === "undefined" ? false : $scope.panes[key].isactive;
            });

            $scope.select(0);
        });
    }];
});
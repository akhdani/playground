define([

], function(){
    return ["$scope", "$log", "$timeout", "$rootScope", "$compile", function($scope, $log, $timeout, $rootScope, $compile){
        $scope.panels = [];
        $scope.current = 0;
        $scope.ismultiple = false;
        $scope.onselect = angular.noop;
        $scope.select = function(stepid){
            if(!$scope.panels[stepid].isenabled)
                return;

            var previd = $scope.current;

            if(!$scope.ismultiple){
                angular.forEach($scope.panels, function(value, key){
                    if(key != stepid) value.isactive = false;
                });
            }
            $scope.panels[stepid].isactive = !$scope.panels[stepid].isactive;
            $scope.current = stepid;

            // call onselect
            $scope.onselect(stepid, previd);
        };

        $timeout(function(){
            angular.forEach($scope.panels, function(val, key){
                $scope.panels[key].isshow = typeof $scope.panels[key].isshow === "undefined" ? true : $scope.panels[key].isshow;
                $scope.panels[key].isenabled = typeof $scope.panels[key].isenabled === "undefined" ? true : $scope.panels[key].isenabled;
                $scope.panels[key].isactive = typeof $scope.panels[key].isactive === "undefined" ? false : $scope.panels[key].isactive;
            });

            $scope.current = $scope.ismultiple ? null : $scope.current;
            if($scope.current != null)
                $scope.select($scope.current);
        });
    }];
});
define([

], function(){
    return ["$scope", "$rootScope", "$log", "$auth", "$notification",
        function($scope, $rootScope, $log, $auth, $notification){
            $scope.notif = {
                alert: [],
                inbox: []
            };
        }
    ];
});
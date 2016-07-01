define([

], function(){
    return ["$scope", "$alert", "$rootScope", function($scope, $alert, $rootScope){
        $alert.add("Success!", $alert.success);
        $alert.add("Info!", $alert.info);
        $alert.add("Warning!", $alert.warning);
        $alert.add("Danger!", $alert.danger);

        $scope.alert = [{
            type: $alert.success,
            message: "Success!"
        }, {
            type: $alert.info,
            message: "Info!"
        }, {
            type: $alert.warning,
            message: "Warning!"
        }, {
            type: $alert.danger,
            message: "Danger!"
        }];
    }];
});
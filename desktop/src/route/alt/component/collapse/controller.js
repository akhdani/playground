define([

], function(){
    return ["$scope", "$alert", function($scope, $alert){
        $scope.collapse = {
            panels: [{
                title: "Panel 1"
            }, {
                title: "Panel 2"
            }, {
                title: "Panel 3"
            }]
        };
    }];
});
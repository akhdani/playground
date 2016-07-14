define([

], function(){
    return ["$scope", "$log", function($scope, $log){
        $scope.accordion = {
            ismultiple: true,
            panels: [{
                title: "Panel 1",
                isactive: false
            }, {
                title: "Panel 2",
                isactive: true
            }, {
                title: "Panel 3",
                isactive: true
            }]
        };
    }];
});
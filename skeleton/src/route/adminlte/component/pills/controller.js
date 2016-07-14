define([

], function(){
    return ["$scope", "$alert", function($scope, $alert){
        $scope.pills = {
            panes: [{
                title: "Pane 1"
            }, {
                title: "Pane 2"
            }, {
                title: "Pane 3"
            }]
        };
    }];
});
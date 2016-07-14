define([

], function(){
    return ["$scope", "$alert", function($scope, $alert){
        $scope.tabset = {
            tabs: [{
                title: "Tab 1"
            }, {
                title: "Tab 2"
            }, {
                title: "Tab 3"
            }]
        };
    }];
});
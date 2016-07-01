define([

], function(){
    return ["$scope", "$alert", "$rootScope", function($scope, $alert, $rootScope){
        $rootScope.theme.toolbar = {
            title: "Toolbar",
            description: "display toolbar and breadcrumb",
            breadcrumb: [{
                title: "Alt"
            }, {
                title: "UI Features"
            }, {
                title: "Toolbar"
            }]
        };

        $scope.toolbar1 = {
            isshowbreadcrumb: false
        };
    }];
});
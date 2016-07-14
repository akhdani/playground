define([

], function(){
    return ["$scope", "$alert", "$rootScope", function($scope, $alert, $rootScope){
        $scope.toolbar1 = {
            isshowtoolbar: false,
            breadcrumb: [{
                title: "Breadcrumb"
            }, {
                title: "Calendar Only"
            }]
        };

        $scope.toolbar2 = {
            isshowpagebar: false,
            title: "Toolbar Title 1",
            description: "without pagebar (breadcrumb and calendar)"
        };

        $scope.toolbar3 = {
            isshowbreadcrumb: false,
            title: "Toolbar Title 2",
            description: "without breadcrumb"
        };

        $scope.toolbar4 = {
            isshowcalendar: false,
            title: "Toolbar Title 3",
            description: "without calendar",
            breadcrumb: [{
                title: "Breadcrumb 1"
            }, {
                title: "Breadcrumb 2"
            }]
        };
    }];
});
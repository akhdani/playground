define([
    
], function () {
    return ["$scope", "$log", "$rootScope", "$button", "$popup", function ($scope, $log, $rootScope, $button, $popup) {
        $scope.response = {
            status: false,
            data: ""
        };
        
        $scope.title = "";
        $scope.caption = "";
        $scope.isshow = false;
        $scope.showinput = false;
        $scope.buttons = [
            $button("no", {
                title: "No",
                onclick: function(){
                    $popup.close(false);
                }
            }),
            $button("yes", {
                title: "Yes",
                onclick: function(){
                    $popup.close(true);
                }
            })
        ];

    }]
});
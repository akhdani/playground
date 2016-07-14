define([

], function(){
    return ["$scope", "$log", "$button", function($scope, $log, $button){
        $scope.btn = $button("open", {
            onclick: function(){
                $scope.modal.open();
            }
        });

        $scope.modal = {
            header: "Modal Title"
        };
    }];
});
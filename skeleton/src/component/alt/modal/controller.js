define([

], function(){
    return ["$scope", "$log", "$button", function($scope, $log, $button){
        $scope.isshow = false;
        $scope.style = "";

        // open modal
        $scope.open = function(){
            $scope.isshow = true;
        };

        // close modal
        $scope.close = function(){
            $scope.isshow = false;
        };

        // tombol close
        $scope.btnclose = $button("close", {
            onclick: function(){
                $scope.close();
            }
        });

        // tombol di bawah, defaultnya hanya close
        $scope.buttons = [
            $scope.btnclose
        ];
    }];
});
define([

], function(){
    return ["$scope", "$log", function($scope, $log){
        $scope.collapse = {
            current: 1,
            panels: [{
                title: "Panel 1"
            }, {
                title: "Panel 2"
            }, {
                title: "Panel 3 : Click here to show Panel 4"
            }, {
                title: "Panel 4 : Click here to enable Panel 5",
                isshow: false
            }, {
                title: "Panel 5 : Disabled",
                isenabled: false
            }],
            onselect: function(current, previous){
                if(current == 2){
                    $scope.collapse.panels[3].isshow = true;
                }else if(current == 3){
                    $scope.collapse.panels[4].isenabled = true;
                    $scope.collapse.panels[4].title = "Panel 5 : Enabled";
                }
            }
        };
    }];
});
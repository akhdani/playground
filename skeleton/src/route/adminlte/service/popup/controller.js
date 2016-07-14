define([

], function(){
    return ["$scope", "$popup", "$button", "$alert", function($scope, $popup, $button, $alert){
        $scope.alert = $button("alert", {
            title: "Alert",
            class: "btn btn-danger",
            icon: "fa fa-warning",
            onclick: function(){
                $popup.alert("Alert!");
            }
        });
        
        $scope.confirm = $button("confirm", {
            title: "Confirm",
            class: "btn btn-success",
            icon: "fa fa-info",
            onclick: function(){
                $popup.confirm("Are you sure?").then(function(response){
                    $alert.add("Sure!", $alert.success);
                }, function(response){
                    $alert.add("Nope!", $alert.warning);
                });
            }
        });

        $scope.prompt = $button("prompt", {
            title: "Prompt",
            class: "btn btn-warning",
            icon: "fa fa-question",
            onclick: function(){
                $popup.prompt("Enter something!").then(function(response){
                    $alert.add("You type : " + response.data, $alert.success);
                }, function(response){
                    $alert.add("Nope!", $alert.warning);
                });
            }
        });

        $scope.custom = $button("custom", {
            title: "Custom",
            class: "btn btn-primary",
            icon: "fa fa-gears",
            onclick: function(){
                $popup.show("custom", {
                    title: "Custom popup!",
                    buttons: [
                        $button("yes", {
                            onclick: function(){
                                $popup.close(true, "yes!");
                            }
                        }),
                        $button("no", {
                            onclick: function(){
                                $popup.close(true, "not quite!");
                            }
                        }),
                        $button("cancel", {
                            onclick: function(){
                                $popup.close(false, "cancel!");
                            }
                        }),
                        $button("close", {
                            onclick: function(){
                                $popup.close(false, "close!");
                            }
                        })
                    ]
                }).then(function(response){
                    $alert.add("You type : " + response.data, $alert.success);
                }, function(response){
                    $alert.add("Nope!", $alert.warning);
                });
            }
        });
    }];
});
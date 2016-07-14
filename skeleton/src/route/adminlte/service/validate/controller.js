define([

], function(){
    return ["$scope", "$alert", "$validate", "$button", function($scope, $alert, $validate, $button){
        $scope.check = $button("alert", {
            title: "Check",
            class: "btn btn-info",
            icon: "fa fa-warning",
            onclick: function(){
                var isvalid = $validate()
                    .rule($validate.required(null), "Field harus diisi!")
                    .check();

                if(!isvalid) return;

                $alert.add("Valid!", $alert.success);
            }
        });

        $scope.validate = $button("alert", {
            title: "Validate",
            class: "btn btn-info",
            icon: "fa fa-warning",
            onclick: function(){
                var isvalid = $validate()
                    .rule($validate.required(null), "Field harus diisi!")
                    .validate();

                if(isvalid.res) return;

                angular.forEach(isvalid.message, function(val, key){
                    $alert.add(val, $alert.danger);
                });
            }
        });
    }];
});
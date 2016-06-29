define([
    "component/fluido/master/deployment",
    "component/fluido"
], function(){
    return ["$scope", "$auth", "$log", "$window", "$button", "$alert", "$popup", "Fluido_Master_Deployment", "Fluido",
        function($scope, $auth, $log, $window, $button, $alert, $popup, Fluido_Master_Deployment, Fluido){
            $scope.toolbar = {
                title: "Master Deployment",
                description: "Upload your workflow here!",
                breadcrumb: [{
                    title: "Master",
                    isactive: true
                },{
                    title: "Deployment",
                    isactive: true
                }]
            };

            // table
            $scope.table = {
                reload: function(params){
                    $scope.table.isloading = Fluido_Master_Deployment.table(params);
                    $scope.table.isloading.then(function(response){
                        $scope.table.total = response.data.total;
                        $scope.table.data = response.data.list;
                    });
                },
                buttons : function(index, item) {
                    return [
                        $button("", {
                            title: "",
                            description: "See Process(es)",
                            icon: "fa fa-tasks",
                            class: "btn btn-sm btn-info",
                            onclick: function () {
                                $window.location.href = alt.baseUrl + "fluido/master/process?deploymentid=" + item.deploymentid;
                            }
                        })
                    ];
                }
            };

            $scope.bpmn = {
                isupload: true,
                isview: false,
                accept: "application/xml",
                data:{}
            };

            $scope.btnadd = $button("save", {
                title: "New Deployment",
                onclick: function(){
                    $scope.modal.open();
                    $scope.modal.data = angular.copy({});
                    $scope.bpmn.clear();
                }
            });

            $scope.btnclear = $button("remove", {
                title: "Clear All Data",
                onclick: function(){
                    $popup.confirm("Are you sure want to clear all data?").then(function(response){
                        return Fluido.clear();
                    }).then(function(response){
                        $alert.add("All data has been deleted!", $alert.success);
                        $scope.table.reload($scope.table.params());
                    });
                }
            });

            $scope.modal = {
                header: "Deploy New BPMN",
                data  : {},
                class : "modal-lg",
                buttons: [
                    $button("save", {
                        title: "Deploy!",
                        onclick: function(){
                            var deployment = {
                                name: $scope.modal.data.name,
                                bpmn: $scope.bpmn.model,
                                description: $scope.modal.data.description
                            };
                            Fluido.deploy(deployment).then(function(response){
                                $alert.add("BPMN has been successfully deployed!", $alert.success);
                                $scope.table.reload($scope.table.params());
                                $scope.modal.close();
                            });
                        }
                    }),
                    $button("close", {
                        title: "Close",
                        onclick: function(){
                            $scope.modal.close();
                        }
                    })
                ]
            };
        }
    ];
});
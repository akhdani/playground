define([
    "component/explorer/master/deployment",
    "component/explorer/deploy"
], function(){
    return ["$scope", "$auth", "$log", "$window", "$button", "$alert", "Explorer_Mst_Deployment", "Explorer_Deploy",
        function($scope, $auth, $log, $window, $button, $alert, Explorer_Mst_Deployment, Explorer_Deploy){
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
                    // kirim data ke server
                    $scope.table.isloading = Explorer_Mst_Deployment.table(params);
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
                                $window.location.href = alt.baseUrl + "master/process/list?deploymentid=" + item.deploymentid;
                            }
                        })
                    ]
                }
            };

            $scope.bpmn = {
                isupload: true,
                isview: false,
                accept: "application/xml",
                data:{}
            };

            $scope.newDeployment = $button("save", {
                title: "New Deployment",
                onclick: function(){
                    $scope.modal.open();
                    $scope.modal.data = angular.copy({});
                    $scope.bpmn.clear();
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
                            Explorer_Deploy.deploy(deployment).then(function(response){
                                $alert.add("BPMN has been successfully deployed!", $alert.success);
                                $scope.table.reload();
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
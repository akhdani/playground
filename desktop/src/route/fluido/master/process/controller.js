define([
    "component/fluido/master/process"
], function(){
    return ["$scope", "$auth", "$log", "$button", "$window", "$alert", "$routeParams", "Fluido_Master_Process",
        function($scope, $auth, $log, $button, $window, $alert, $routeParams, Fluido_Master_Process){
            $scope.toolbar = {
                title: "Master Process",
                description: "Process detected from deployment",
                breadcrumb: [{
                    title: "Master",
                    isactive: true
                },{
                    title: "Process",
                    isactive: true
                }]
            };

            $scope.table = {
                filter: {
                    deploymentid: $routeParams.deploymentid
                },
                reload: function(params){
                    if(params.deploymentid)
                        params.deploymentid = "= " + params.deploymentid;

                    $scope.table.isloading = Fluido_Master_Process.table(params);
                    $scope.table.isloading.then(function(response){
                        $scope.table.total = response.data.total;
                        $scope.table.data = response.data.list;
                    });
                },
                buttons : function(index, item){
                    return [
                        $button("", {
                            title: "",
                            description: "Start Process",
                            icon: "fa fa-play",
                            class: "btn btn-sm btn-success",
                            onclick: function(){
                                var process = {
                                    deploymentid: item.deploymentid,
                                    processid: item.processid
                                };
                                Fluido_Master_Process.start(process).then(function(response){
                                    $alert.add("Process has been successfully started!", $alert.success);
                                });
                            }
                        }),
                        $button("", {
                            title: "",
                            description: "See Task(s)",
                            icon: "fa fa-tasks",
                            class: "btn btn-sm btn-info",
                            onclick: function () {
                                $window.location.href = alt.baseUrl + "fluido/master/task?deploymentid=" + item.deploymentid + "&processid=" + item.processid;
                            }
                        }),
                        $button("", {
                            title: "",
                            description: "See Flow(s)",
                            icon: "fa fa-exchange",
                            class: "btn btn-sm btn-primary",
                            onclick: function () {
                                $window.location.href = alt.baseUrl + "fluido/master/flow?deploymentid=" + item.deploymentid + "&processid=" + item.processid;
                            }
                        })
                    ]
                }
            };
        }
    ];
});
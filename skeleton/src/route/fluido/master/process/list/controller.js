define([
    "component/explorer/master/process"
], function(){
    return ["$scope", "$auth", "$log", "$button", "$window", "$alert", "$routeParams", "Explorer_Mst_Process",
        function($scope, $auth, $log, $button, $window, $alert, $routeParams, Explorer_Mst_Process){
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
                    // cek apakah sedang mengambil data, batalkan jika ada
                    if($scope.table.isloading != null && $scope.table.isloading.abort)
                        $scope.table.isloading.abort();

                    // kirim data ke server
                    $scope.table.isloading = Explorer_Mst_Process.table(params);
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
                                Explorer_Mst_Process.start(process).then(function(response){
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
                                $window.location.href = alt.baseUrl + "master/task/list?deploymentid=" + item.deploymentid + "&processid=" + item.processid;
                            }
                        }),
                        $button("", {
                            title: "",
                            description: "See Flow(s)",
                            icon: "fa fa-exchange",
                            class: "btn btn-sm btn-primary",
                            onclick: function () {
                                $window.location.href = alt.baseUrl + "master/flow/list?deploymentid=" + item.deploymentid + "&processid=" + item.processid;
                            }
                        })
                    ]
                }
            };
        }
    ];
});
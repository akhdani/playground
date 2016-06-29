define([
    "component/fluido/transaction/process"
], function(){
    return ["$scope", "$auth", "$log", "$button", "$window", "$alert","Fluido_Transaction_Process",
        function($scope, $auth, $log, $button, $window, $alert, Fluido_Transaction_Process){
            $scope.toolbar = {
                title: "Transaction Process",
                description: "Running process",
                breadcrumb: [{
                    title: "Transaction",
                    isactive: true
                },{
                    title: "Process",
                    isactive: true
                }]
            };

            $scope.table = {
                total_data: [],
                filter: {},
                reload: function(params){
                    // cek apakah sedang mengambil data, batalkan jika ada
                    if($scope.table.isloading != null && $scope.table.isloading.abort)
                        $scope.table.isloading.abort();

                    // kirim data ke server
                    $scope.table.isloading = Fluido_Transaction_Process.table(params);
                    $scope.table.isloading.then(function(response){
                        $scope.table.total = response.data.total;
                        $scope.table.data = response.data.list;
                    });
                },
                buttons : function(index, item){
                    return [
                        $button("", {
                            title: "",
                            description: "See Tasks",
                            icon: "fa fa-tasks",
                            class: "btn btn-sm btn-info",
                            onclick: function(){
                                $window.location.href = alt.baseUrl + "transaction/task/list?trxprocessid=" + item.trxprocessid;
                            }
                        })
                    ]
                }
            };
        }
    ];
});
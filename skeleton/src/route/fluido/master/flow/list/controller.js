define([
    "component/explorer/master/flow"
], function(){
    return ["$scope", "$auth", "$log", "$window", "$routeParams", "Explorer_Mst_Flow",
        function($scope, $auth, $log, $window, $routeParams, Explorer_Mst_Flow){
            $scope.toolbar = {
                title: "Master Flow",
                description: "Flow detected from deployment",
                breadcrumb: [{
                    title: "Master",
                    isactive: true
                },{
                    title: "Flow",
                    isactive: true
                }]
            };
    
            $scope.table = {
                filter: {
                    deploymentid: $routeParams.deploymentid,
                    processid: $routeParams.processid
                },
                reload: function(params){
                    // cek apakah sedang mengambil data, batalkan jika ada
                    if($scope.table.isloading != null && $scope.table.isloading.abort)
                        $scope.table.isloading.abort();
    
                    // kirim data ke server
                    $scope.table.isloading = Explorer_Mst_Flow.table(params);
                    $scope.table.isloading.then(function(response){
                        $scope.table.total = response.data.total;
                        $scope.table.data = response.data.list;
                    });
                }
            };
        }
    ];
});
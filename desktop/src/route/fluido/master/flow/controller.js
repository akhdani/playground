define([
    "component/fluido/master/flow"
], function(){
    return ["$scope", "$auth", "$log", "$window", "$routeParams", "Fluido_Master_Flow",
        function($scope, $auth, $log, $window, $routeParams, Fluido_Master_Flow){
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
                    if(params.deploymentid)
                        params.deploymentid = "= " + params.deploymentid;

                    $scope.table.isloading = Fluido_Master_Flow.table(params);
                    $scope.table.isloading.then(function(response){
                        $scope.table.total = response.data.total;
                        $scope.table.data = response.data.list;
                    });
                }
            };
        }
    ];
});
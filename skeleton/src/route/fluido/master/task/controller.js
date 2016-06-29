define([
    "component/fluido/master/task"
], function(){
    return ["$scope", "$auth", "$log", "$window", "$routeParams", "Fluido_Master_Task",
        function($scope, $auth, $log, $window, $routeParams, Fluido_Master_Task){
            $scope.toolbar = {
                title: "Master Task",
                description: "Task detected from deployment",
                breadcrumb: [{
                    title: "Master",
                    isactive: true
                },{
                    title: "Task",
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

                    $scope.table.isloading = Fluido_Master_Task.table(params);
                    $scope.table.isloading.then(function(response){
                        $scope.table.total = response.data.total;
                        $scope.table.data = response.data.list;
                    });
                }
            };
        }
    ];
});
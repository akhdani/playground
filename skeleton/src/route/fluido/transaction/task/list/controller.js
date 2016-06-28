define([
    "component/explorer/transaction/process",
    "component/explorer/transaction/task"
], function(){
    return ["$scope", "$auth", "$log", "$window", "$routeParams", "$button", "$alert", "Explorer_Trx_Process", "Explorer_Trx_Task",
        function($scope, $auth, $log, $window, $routeParams, $button, $alert, Explorer_Trx_Process, Explorer_Trx_Task){
            $scope.toolbar = {
                title: "Transaction Task",
                description: "Running task",
                breadcrumb: [{
                    title: "Transaction",
                    isactive: true
                },{
                    title: "Task",
                    isactive: true
                }]
            };

            $scope.table = {
                filter: {
                    trxprocessid: $routeParams.trxprocessid
                },
                reload: function(params){
                    params = params || $scope.table.params();

                    // cek apakah sedang mengambil data, batalkan jika ada
                    if($scope.table.isloading != null && $scope.table.isloading.abort)
                        $scope.table.isloading.abort();

                    // kirim data ke server
                    $scope.table.isloading = Explorer_Trx_Task.table(params);
                    $scope.table.isloading.then(function(response){
                        $scope.table.total = response.data.total;
                        $scope.table.data = response.data.list;
                    });
                },
                buttons : function(index, item){
                    switch(item.status){
                        case "running":
                        default:
                            return [
                                $button("", {
                                    title: "",
                                    description: "Add variables",
                                    icon: "fa fa-tags",
                                    class: "btn btn-sm btn-info",
                                    onclick: function(){
                                        $scope.modal.data = angular.copy(item);
                                        $scope.modal.header = "Add variable to task " + String(item.name);
                                        $scope.modal.data.variable = [];
                                        $scope.modal.open();
                                    }
                                }),
                                $button("", {
                                    title: "",
                                    description: "Complete",
                                    icon: "fa fa-cog",
                                    class: "btn btn-sm btn-success",
                                    onclick: function(){
                                        var task = {
                                            trxtaskid: item.trxtaskid,
                                            rev: item.rev
                                        };
                                        Explorer_Trx_Task.complete(task).then(function(response){
                                            $alert.add("Task has been successfully completed!", $alert.success);
                                            $scope.table.reload($scope.table.params());
                                        });
                                    }
                                })
                            ];
                            break;
                        case "complete":
                            return item.type == 'task' ? [
                                $button("save", {
                                    title: "",
                                    description: "Correction",
                                    icon: "fa fa-tags",
                                    class: "btn btn-sm btn-info",
                                    onclick: function(){
                                        $scope.modal.data = angular.copy(item);
                                        $scope.modal.data.force = 1;
                                        $scope.modal.header = "Correction variable of task " + String(item.name);
                                        $scope.modal.data.variable = [];
                                        $scope.modal.open();
                                    }
                                }),
                                $button("revert", {
                                    title: "",
                                    description: "Revert process",
                                    icon: "fa fa-rotate-left",
                                    class: "btn btn-sm btn-danger",
                                    onclick: function(){
                                        Explorer_Trx_Process.revert({trxprocessid: item.trxprocessid, rev: item.rev, trxtaskid: item.trxtaskid}).then(function(response){
                                            $alert.add("Process successfully reverted!", $alert.success);
                                            $scope.table.reload($scope.table.params());
                                        });
                                    }
                                })
                            ] : [];
                            break;
                        case "cancel":
                            return [];
                            break;
                    }
                }
            };


            $scope.modal = {
                header: "Add variable to task",
                data  : {},
                class : "modal-lg",
                open  : function(){
                    // get variable from server
                    Explorer_Trx_Task.retrieve({trxtaskid: $scope.modal.data.trxtaskid}).then(function(response){
                        $scope.modal.data.variable = Explorer_Trx_Task.restoreVariables(response.data.variable);
                    });

                    $scope.modal.isshow = true;
                },
                buttonadd : $button("add", {
                    title: "",
                    class: "btn btn-sm btn-success",
                    onclick: function(){
                        $scope.modal.data.variable.push({
                            field: "",
                            content: ""
                        });
                    }
                }),
                buttondel : function($index, item){
                    return $button("remove", {
                        title: "",
                        class: "btn btn-sm btn-danger",
                        onclick: function(){
                            var data = [];
                            angular.forEach($scope.modal.data.variable, function(val, key){
                                if(val !== item)
                                    data.push(val);
                            });
                            $scope.modal.data.variable = data;
                        }
                    })
                },
                buttons: [
                    $button("save", {
                        title: "Save",
                        onclick: function(){
                            var task = {
                                trxtaskid: $scope.modal.data.trxtaskid,
                                rev: $scope.modal.data.rev,
                                force: $scope.modal.data.force || 0,
                                variable: Explorer_Trx_Task.convertVariables($scope.modal.data.variable)
                            };
                            Explorer_Trx_Task.save(task).then(function(response){
                                $alert.add("Variables has been successfully added to the task!", $alert.success);
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
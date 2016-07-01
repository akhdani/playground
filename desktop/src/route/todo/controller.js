define([
    "asset/lib/angular-datepicker/dist/angular-datepicker",
    "component/todo/project",
    "component/todo/task",
    "component/todo/tag"
], function(){
    alt.module("datePicker", true);

    return ["$scope", "$log", "$rootScope", "$button", "$popup", "$alert", "Todo_Project", "Todo_Task", "Todo_Tag", function($scope, $log, $rootScope, $button, $popup, $alert, Todo_Project, Todo_Task, Todo_Tag){
        $scope.moment = moment;

        // project
        $scope.project = {
            current: {},
            list: [],
            add: $button("add", {
                title: "Add",
                description: "Add New Project",
                class: "btn btn-circle grey-salsa btn-outline btn-sm",
                icon: "fa fa-plus",
                onclick: function(){
                    var title = "";
                    $popup.prompt("New project name?").then(function(response){
                        title = response.data;
                        return Todo_Project.insert({title: response.data, total_task: 0});
                    }).then(function(response){
                        $alert.add("Project " + title + " has been created!", $alert.success);
                        $scope.project.reload();
                    });
                }
            }),
            reload: function(){
                $scope.project.list = [];
                Todo_Project.list().then(function(response) {
                    $scope.project.list = angular.copy(response.data);
                });
            },
            button: function(index, item){
                return [
                    $button("remove", {
                        title: "",
                        description: "",
                        onclick: function(){
                            $popup.confirm("Are you sure want to delete project " + item.title + "?").then(function(response){
                                return Todo_Project.remove({projectid: item.projectid});
                            }).then(function(response){
                                return Todo_Task.remove({where: "projectid = " + item.projectid});
                            }).then(function(response){
                                $alert.add("Project " + item.title + " has been deleted!", $alert.success);
                                $scope.project.reload();
                                $scope.task.reload();
                                $scope.task.reset();
                            });
                        }
                    }),
                    $button("edit", {
                        title: "",
                        description: "",
                        onclick: function(){
                            $popup.prompt({
                                title: "Edit project " + item.title + "?",
                                response: {
                                    status: 200,
                                    data: item.title
                                }
                            }).then(function(response){
                                return Todo_Project.update({projectid: item.projectid, title: response.data});
                            }).then(function(response){
                                $alert.add("Project " + item.title + " has been updated!", $alert.success);
                                $scope.project.reload();
                            });
                        }
                    }),
                    $button("view", {
                        title: "",
                        description: "",
                        onclick: function(){
                            $scope.project.current = angular.copy(item);
                            $scope.task.reload();
                        }
                    })
                ];
            }
        };
        $scope.project.reload();

        // tag
        $scope.tag = {
            list: [],
            keyvalues: {},
            add: $button("add", {
                title: "Add",
                description: "Add New Tag",
                class: "btn btn-circle grey-salsa btn-outline btn-sm",
                icon: "fa fa-plus",
                onclick: function(){
                    var title = "";
                    $popup.prompt("New tag name?").then(function(response){
                        title = response.data;
                        return Todo_Tag.insert({title: response.data, total_task: 0});
                    }).then(function(response){
                        $alert.add("Tag " + title + " has been created!", $alert.success);
                        $scope.tag.reload();
                    });
                }
            }),
            reload: function(){
                $scope.tag.list = [];
                $scope.tag.keyvalues = {};
                Todo_Tag.list().then(function(response) {
                    $scope.tag.list = angular.copy(response.data);
                    angular.forEach(response.data, function(val, key){
                        $scope.tag.keyvalues[val.tagid] = val;
                    });
                });
            },
            button: function(index, item){
                return [
                    $button("remove", {
                        title: "",
                        description: "",
                        onclick: function(){
                            $popup.confirm("Are you sure want to delete tag " + item.title + "?").then(function(response){
                                return Todo_Tag.remove({tagid: item.tagid});
                            }).then(function(response){
                                $alert.add("Tag " + item.title + " has been deleted!", $alert.success);
                                $scope.tag.reload();
                            });
                        }
                    }),
                    $button("edit", {
                        title: "",
                        description: "",
                        onclick: function(){
                            $popup.prompt({
                                title: "Edit tag " + item.title + "?",
                                response: {
                                    status: 200,
                                    data: item.title
                                }
                            }).then(function(response){
                                return Todo_Project.update({tagid: item.tagid, title: response.data});
                            }).then(function(response){
                                $alert.add("Tag " + item.title + " has been updated!", $alert.success);
                                $scope.tag.reload();
                            });
                        }
                    })
                ];
            }
        };
        $scope.tag.reload();

        // task
        $scope.task = {
            current: {
                deadline: moment()
            },
            list: [],
            reset: function(){
                $scope.task.current = {
                    deadline: moment()
                };
            },
            reload: function(){
                if(!$scope.project.current.projectid) return;

                $scope.task.list = [];
                Todo_Task.list({projectid: "= " + $scope.project.current.projectid}).then(function(response) {
                    $scope.task.list = angular.copy(response.data);
                });
            },
            button: function(index, item){
                return [
                    $button("remove", {
                        title: "",
                        description: "",
                        onclick: function(){
                            $popup.confirm("Are you sure want to delete task " + item.title + "?").then(function(response){
                                return Todo_Task.remove({taskid: item.taskid});
                            }).then(function(response){
                                $alert.add("Task " + item.title + " has been deleted!", $alert.success);
                                $scope.task.reload();
                                $scope.task.reset();
                            });
                        }
                    }),
                    $button("edit", {
                        title: "",
                        description: "",
                        onclick: function(){
                            $scope.task.current = angular.copy(item);
                        }
                    })
                ];
            },
            form: [
                $button("cancel", {
                    title: "Cancel",
                    description: "Cancel",
                    onclick: function(){
                        $scope.task.reset();
                    }
                }),
                $button("save", {
                    title: "Save",
                    description: "Save Task",
                    onclick: function(){
                        if(!$scope.project.current.projectid){
                            $alert.add("Choose project first!", $alert.warning);
                            return;
                        }

                        var task = angular.copy($scope.task.current);
                        task.projectid = $scope.project.current.projectid;
                        task.deadline = moment(task.deadline, "DD MMMM YYYY").toDate();

                        Todo_Task.insert(task).then(function(response){
                            $scope.task.current = {};
                            $alert.add("Task succesfulley saved!", $alert.success);
                            $scope.task.reload();
                            $scope.task.reset();
                        });
                    }
                })
            ]
        };
    }];
});
define([
    "component/todo/project",
    "component/todo/task",
    "component/todo/tag"
], function(){
    return ["$scope", "$log", "$rootScope", "$button", "$popup", "$alert", "Todo_Project", "Todo_Task", "Todo_Tag", function($scope, $log, $rootScope, $button, $popup, $alert, Todo_Project, Todo_Task, Todo_Tag){
        // project
        $scope.project = {
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
                                $alert.add("Project " + item.title + " has been deleted!", $alert.success);
                                $scope.project.reload();
                            });
                        }
                    }),
                    $button("edit", {
                        title: "",
                        description: "",
                        onclick: function(){
                            $popup.prompt("Edit project " + item.title + "?").then(function(response){
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
                            alert("todo");
                        }
                    })
                ];
            }
        };
        $scope.project.reload();

        // tag
        $scope.tag = {
            list: [],
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
                Todo_Tag.list().then(function(response) {
                    $scope.tag.list = angular.copy(response.data);
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
                            $popup.prompt("Edit tag " + item.title + "?").then(function(response){
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
    }];
});
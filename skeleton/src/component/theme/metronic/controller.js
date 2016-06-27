define([

], function(){
    return ["$scope", "$log", "$timeout", "$interval", "$rootScope", function($scope, $log, $timeout, $interval, $rootScope){
        $scope.layout = "layout1";
        $scope.theme = "default";
        $scope.template = "full";

        $("body").addClass("page-header-fixed page-sidebar-closed-hide-logo page-content-white");

        $scope.view = function(){
            $timeout(function(){
                $(".page-sidebar").css("min-height", $(".page-content").height()+50);
            });
        };

        $scope.menu = function(){
            $(".sub-menu").removeClass("dropdown-menu pull-left");

            switch($scope.layout){
                case "layout1":
                case "layout2":
                case "layout4":
                    $(".sub-menu").hide();

                    $(".sidebar-toggler").on("click", function(e){
                        $("body").toggleClass("page-sidebar-closed");
                        $(".page-sidebar-menu").toggleClass("page-header-fixed page-sidebar-menu-closed");
                    });

                    var active = {};
                    $(".nav-toggle").on("click", function(e){
                        var parents = $(this).parentsUntil(".page-sidebar-menu", ".nav-item"),
                            level = parents.length-1,
                            parent = $(this).parent(),
                            hasSubMenu = parent.children(".sub-menu").length > 0;

                        if(!hasSubMenu) return;

                        // hide previous active
                        if(active[level] != null && !active[level].is($(this))){
                            active[level].parent().removeClass("active open");
                            active[level].children(".arrow").removeClass("open");
                            active[level].parent().children(".sub-menu").hide();
                        }

                        // toggle current level
                        parent.toggleClass("active open");

                        if(parent.hasClass("active open")){
                            $(this).children(".arrow").addClass("open");
                            parent.children(".sub-menu").show();
                            active[level] = $(this);
                        }else{
                            $(this).children(".arrow").removeClass("open");
                            parent.children(".sub-menu").hide();
                            active[level] = null;
                        }
                    });
                    break;
                case "layout3":
                    $(".sub-menu").addClass("dropdown-menu pull-left");
                    break;
            }
        };

        var interval = $interval(function(){
            $scope.view();
            
            if($(".page-content").height())
                $interval.cancel(interval);
        }, 100);
    }];
});
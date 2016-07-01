define([

], function(){
    return ["$scope", "$log", "$timeout", "$interval", "$rootScope", "$loading", "$route", function($scope, $log, $timeout, $interval, $rootScope, $loading, $route){
        $scope.layout = "";
        $scope.color = "default";
        $scope.template = "full";

        $scope.pagebar = {};

        $scope.onload = function(){
            $("body").addClass("page-header-fixed page-sidebar-closed-hide-logo page-content-white");
            $(".page-container").css("min-height", $(window).height()-83);
            $(".page-sidebar").css("min-height", Math.max($(".page-content-wrapper").height(), $(window).height()-83));
        };

        $(window).on("resize", $scope.onload);

        $scope.$watch(function(){
            return $(".page-content-wrapper").height()
        }, function(){
            $scope.onload();
        });

        $scope.view = function(){
            /*$timeout(function(){
                $log.debug("view onload", $(".page-content-wrapper").height(), $(window).height()-83, Math.max($(".page-content-wrapper").height(), $(window).height()-83));
                $scope.onload();
            }, 500);*/
        };

        $scope.menu = function(){
            $(".sub-menu").removeClass("dropdown-menu pull-left");
            var active = {};

            switch($scope.layout){
                case "layout1":
                case "layout2":
                case "layout4":
                    $(".sidebar-toggler").on("click", function(e){
                        $("body").toggleClass("page-sidebar-closed");
                        $(".page-sidebar-menu").toggleClass("page-header-fixed page-sidebar-menu-closed");
                    });

                    $(".nav-link").not(".nav-toggle").on("click", function(e){
                        $(".page-sidebar ul.sub-menu li.menu-dropdown").removeClass("active open");

                        if(!$(this).parent().hasClass("menu-dropdown")){
                            $(".page-sidebar li.nav-item").removeClass("active open");
                            $(".page-sidebar .arrow").removeClass("active open");
                        }

                        $(this).parent().toggleClass("active open");

                        var parents = $(this).parentsUntil(".page-sidebar-menu", ".nav-item"),
                            level = parents.length-1;

                        active[level] = $(this);
                    });
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

            // handle menu active open on reload page
            $timeout(function(){
                $(".page-sidebar-menu a[data-ng-href]").each(function(index, element){
                    element = $(element);
                    if(element.attr("href") == window.location.hash){
                        element.closest("ul.sub-menu").show();
                        element.parents("li.nav-item").each(function(index, parent){
                            var level = $(parent).parentsUntil(".page-sidebar-menu", ".nav-item").length;
                            active[level] = $(parent).children("a.nav-link");

                            $(parent)
                                .addClass("active open")
                                .find(".arrow").addClass("open");
                        });
                    }
                });
            });
        };

        var interval = $interval(function(){
            $scope.view();
            
            if($(".page-content").height())
                $interval.cancel(interval);
        }, 100);
    }];
});
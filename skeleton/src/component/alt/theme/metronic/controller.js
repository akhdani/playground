define([

], function(){
    return ["$scope", "$log", "$timeout", "$interval", "$routeParams", function($scope, $log, $timeout, $interval, $routeParams){
        $scope.name = "metronic";
        $scope.layout = "layout1";
        $scope.skin = "default";
        $scope.template = "content";

        $scope.pagebar = {};

        $scope.onload = function(){
            $("body").addClass("page-header-fixed page-sidebar-closed-hide-logo page-content-white");
            $(".page-container").css("min-height", $(window).height()-83);
            $(".page-sidebar").css("min-height", Math.max($(".page-content-wrapper").height(), $(window).height()-83));
        };

        $(window).on("resize", $scope.onload);

        $scope.$watch(function(){
            return $(".page-content-wrapper").height();
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
            $(".alt-submenu").removeClass("dropdown-menu pull-left");

            $(".alt-link").addClass("nav-link");
            $(".alt-toggle").addClass("nav-toggle");
            $(".alt-item").addClass("nav-item");
            $(".alt-menu").addClass("menu-dropdown classic-menu-dropdown");
            $(".alt-submenu-item").addClass("nav-item menu-dropdown classic-menu-dropdown");

            var active = {};

            switch($scope.layout){
                case "layout1":
                case "layout2":
                case "layout3":
                case "layout4":
                    $(".alt-submenu").addClass("sub-menu");
                    $(".alt-menu").addClass("nav-item menu-dropdown classic-menu-dropdown");
                    break;
                case "layout5":
                    $("li.heading").hide();
                    $(".alt-menu").addClass("dropdown dropdown-fw");
                    $(".alt-submenu").addClass("dropdown-menu dropdown-menu-fw");
                    break;
            }

            switch($scope.layout){
                case "layout1":
                case "layout2":
                case "layout4":
                case "layout5":
                    $(".sidebar-toggler").on("click", function(e){
                        $("body").toggleClass("page-sidebar-closed");
                        $(".page-sidebar-menu").toggleClass("page-header-fixed page-sidebar-menu-closed");
                    });

                    $(".nav-link").not(".nav-toggle").on("click", function(e){
                        $(".page-sidebar ul.sub-menu li.menu-dropdown").removeClass("active open selected");

                        if(!$(this).parent().hasClass("menu-dropdown")){
                            $(".page-sidebar li.nav-item").removeClass("active open selected");
                            $(".page-sidebar .arrow").removeClass("active open selected");
                        }

                        $(this).parent().toggleClass("active open selected");

                        var parents = $(this).parentsUntil(".page-sidebar-menu", ".nav-item"),
                            level = parents.length-1;

                        active[level] = $(this);
                    });

                    $(".alt-toggle").on("click", function(e){
                        var parents = $(this).parentsUntil(".page-sidebar-menu", ".nav-item"),
                            level = parents.length-1,
                            parent = $(this).parent(),
                            hasSubMenu = parent.children(".alt-submenu").length > 0;

                        if(!hasSubMenu) return;

                        // hide previous active
                        if(active[level] != null && !active[level].is($(this))){
                            active[level].parent().removeClass("active open selected");
                            active[level].children(".arrow").removeClass("open");
                            active[level].parent().children(".sub-menu").hide();
                        }

                        // toggle current level
                        parent.toggleClass("active open selected");

                        if(parent.hasClass("active open selected")){
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
                    $(".alt-submenu").addClass("dropdown-menu pull-left");
                    break;
            }

            // handle menu active open selected on reload page
            $timeout(function(){
                $(".page-sidebar-menu a[data-ng-href]").each(function(index, element){
                    element = $(element);
                    if(element.attr("href") == window.location.hash){
                        element.closest("ul.alt-submenu").show();
                        element.parents("li.nav-item").each(function(index, parent){
                            var level = $(parent).parentsUntil(".page-sidebar-menu", ".nav-item").length;
                            active[level] = $(parent).children("a.alt-link");

                            $(parent)
                                .addClass("active open selected")
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
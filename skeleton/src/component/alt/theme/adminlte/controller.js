define([

], function(){
    return ["$scope", "$log", "$routeParams", function($scope, $log, $routeParams){
        $scope.name = "adminlte";
        $scope.layout = "default";
        $scope.skin = "black";
        $scope.template = "full";

        $scope.onload = function(){
            $("body").addClass("hold-transition skin-" + $scope.skin + " sidebar-mini");

            //Get window height and the wrapper height
            var neg = $(".main-header").outerHeight() + $(".main-footer").outerHeight();
            var window_height = $(window).height();
            var sidebar_height = $(".sidebar").height();
            //Set the min-height of the content and sidebar based on the
            //the height of the document.
            if ($("body").hasClass("fixed")) {
                $(".content-wrapper, .right-side").css("min-height", window_height - $(".main-footer").outerHeight());
            } else {
                var postSetWidth;
                if (window_height >= sidebar_height) {
                    $(".content-wrapper, .right-side").css("min-height", window_height - neg);
                    postSetWidth = window_height - neg;
                } else {
                    $(".content-wrapper, .right-side").css("min-height", sidebar_height);
                    postSetWidth = sidebar_height;
                }

                //Fix for the control sidebar height
                var controlSidebar = $(".control-sidebar");
                if (typeof controlSidebar !== "undefined") {
                    if (controlSidebar.height() > postSetWidth)
                        $(".content-wrapper, .right-side").css("min-height", controlSidebar.height());
                }
            };
        };

        $scope.menu = function(){
            var animationSpeed = 500;

            $(".sidebar li a").on("click", function (e) {
                $log.debug("abc");
                //Get the clicked link and the next element
                var $this = $(this);
                var checkElement = $this.next();

                //Check if the next element is a menu and is visible
                if ((checkElement.is(".treeview-menu")) && (checkElement.is(":visible")) && (!$("body").hasClass("sidebar-collapse"))) {
                    //Close the menu
                    checkElement.slideUp(animationSpeed, function () {
                        checkElement.removeClass("menu-open");
                    });
                    checkElement.parent("li").removeClass("active");
                }
                //If the menu is not visible
                else if ((checkElement.is(".treeview-menu")) && (!checkElement.is(":visible"))) {
                    //Get the parent menu
                    var parent = $this.parents("ul").first();
                    //Close all open menus within the parent
                    var ul = parent.find("ul:visible").slideUp(animationSpeed);
                    //Remove the menu-open class from the parent
                    ul.removeClass("menu-open");
                    //Get the parent li
                    var parent_li = $this.parent("li");

                    //Open the target menu and add the menu-open class
                    checkElement.slideDown(animationSpeed, function () {
                        //Add the class active to the parent li
                        checkElement.addClass("menu-open");
                        parent.find("li.active").removeClass("active");
                        parent_li.addClass("active");

                        //Fix the layout in case the sidebar stretches over the height of the window
                        $scope.onload();
                    });
                }

                //if this isn't a link, prevent the page from being redirected
                if (checkElement.is(".treeview-menu")) {
                    e.preventDefault();
                }
            });
        };

        $scope.view = function(){

        };
    }];
});
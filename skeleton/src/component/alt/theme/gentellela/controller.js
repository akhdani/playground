define([

], function(){
    return ["$scope", "$rootScope", "$log", "$window", "$routeParams", function($scope, $rootScope, $log, $window, $routeParams){
        $scope.name = "gentellela";
        $scope.layout = "default";
        $scope.skin = "default";
        $scope.template = "full";

        $scope.onload = function(){
            $("body").addClass("nav-md");

            // reset height
            $(".right_col").css("min-height", $(window).height());

            var bodyHeight = $("body").height(),
                leftColHeight = $(".left_col").eq(1).height() + $(".sidebar-footer").height(),
                contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

            $(".right_col").css("min-height", contentHeight);
            $(".right_col").css("height", "100%");
        };

        $scope.menu = function(){
            $(".nav.child_menu").hide();

            $("#sidebar-menu").find("a").on("click", function(ev) {
                var $li = $(this).parent();

                if ($li.is(".active")) {
                    $li.removeClass("active");
                    $("ul:first", $li).slideUp(function(){
                        $scope.onload();
                    });
                } else {
                    // prevent closing menu if we are on child menu
                    if (!$li.parent().is(".child_menu")) {
                        $("#sidebar-menu").find("li").removeClass("active");
                        $("#sidebar-menu").find("li ul").slideUp();
                    }

                    $li.addClass("active");

                    $("ul:first", $li).slideDown(function(){
                        $scope.onload();
                    });
                }
            });

        };

        $scope.view = function(){

        };

        $(window).on("resize", $scope.onload);
    }];
});
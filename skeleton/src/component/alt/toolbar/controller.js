define([

], function(){
    return ["$scope", "$log", "$interval", "$rootScope", "$timeout", "$routeParams", function($scope, $log, $interval, $rootScope, $timeout, $routeParams){
        $scope.theme = $rootScope.theme.name;
        $scope.isshowpagebar = true;

        $scope.isshowtoolbar = true;
        $scope.title = "";
        $scope.description = "";

        $scope.isshowbreadcrumb = true;
        $scope.breadcrumb = [];

        $scope.isshowcalendar = true;
        $scope.moment = moment;
        $scope.time = moment();
        $interval(function(){
            $scope.time = moment();
        }, 1000);

        $scope.set = function(data){
            angular.forEach(data, function(val, key){
                $scope[key] = val;
            });
        };

        $scope.reset = function(){
            $scope.title = "";
            $scope.description = "";
            $scope.breadcrumb = [];
        };

        $scope.breadcrumbs = function(params){
            if(typeof params === "undefined"){
                params = params || $routeParams;

                var hash = (window.location.hash + "").replace(alt.baseUrl, "").split("/");
                if(hash.length > 0 && Object.keys($routeParams) == 0){
                    params.altaction = hash[0];
                }
            }

            var breadcrumb = [{title: alt.title}],
                url = alt.baseUrl;

            angular.forEach([params.altmodule, params.altcontroller, params.altaction], function(val, key){
                if(typeof val === "undefined" || val == "") return;

                var tmp = (val + "").split("_"),
                    title = "";

                angular.forEach(tmp, function(val, key){
                    title += val.charAt(0).toUpperCase() + val.substr(1) + " ";
                });

                url += val + "/";
                breadcrumb.push({title: title, href: url});
            });

            $scope.breadcrumb = breadcrumb;
            return breadcrumb;
        };
        $scope.breadcrumbs();

        $rootScope.$on("$routeChangeStart", function(event, current, prev){
            $scope.breadcrumbs(current.params);
        });
    }];
});
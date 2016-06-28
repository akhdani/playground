alt.application = "playground-skeleton";
alt.title = "Playground Skeleton";
alt.description = "Playground Skeleton Application";

alt.run(["$rootScope", "$log", "$loading", "$timeout", function($rootScope, $log, $loading, $timeout){
    $rootScope.theme = {
        layout: "layout1",
        color: "darkblue",
        template: "content"
    };
}]);
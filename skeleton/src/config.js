alt.application = "playground-skeleton";
alt.title = "Playground Skeleton";
alt.description = "Playground Skeleton Application";

alt.run(["$rootScope", "$log", "$loading", "$timeout", function($rootScope, $log, $loading, $timeout){
    $rootScope.theme = {
        layout: "layout1",
        color: "darkblue",
        template: "content"
    };

    $rootScope.$on("$routeChangeStart", function(event, current, next){
        if(current.params && current.params.altmodule == "fluido")
            alt.menu = "menu/fluido.html";
    });
}]);
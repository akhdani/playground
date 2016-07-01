alt.application = "playground";
alt.title = "Playground";
alt.description = "Playground Application";

alt.run(["$rootScope", "$log", "$loading", "$timeout", function($rootScope, $log, $loading, $timeout){
    moment.locale("id");

    $rootScope.theme = {
        layout: "layout1",
        color: "default",
        template: "content"
    };

    $rootScope.$on("$routeChangeStart", function(event, current, next){
        if(current.params && current.params.altmodule == "fluido")
            alt.menu = "menu/fluido.html";
        if(current.params && [current.params.altmodule, current.params.altcontroller, current.params.altaction].indexOf("alt") > -1)
            alt.menu = "menu/alt.html";
    });
}]);
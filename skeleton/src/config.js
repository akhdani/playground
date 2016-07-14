alt.application = "playground-skeleton";
alt.title = "Playground Skeleton";
alt.description = "Playground Skeleton Application";

alt.run(["$rootScope", "$log", "$window", "$interval", function($rootScope, $log, $window, $interval){
    moment.locale("id");

    $rootScope.theme = {
        // adminlte
        // skin: "blue",

        // metronic
        /*layout: "layout5",
         skin: "default",
         template: "content"*/
    };

    $rootScope.$on("$routeChangeStart", function(event, current, next){
        var interval = $interval(function(){
            if($rootScope.theme.name) {
                $interval.cancel(interval);
                alt.menu = "menu/" + $rootScope.theme.name + ".html";

                if(current.params.altmodule != $rootScope.theme.name) {
                    $window.location.href = alt.baseUrl + $rootScope.theme.name + "/" + (current.params.altcontroller || "dashboard") + "/" + (current.params.altaction || "1");
                }else{
                    $rootScope.theme.onload();
                }
            }
        }, 100);
    });
}]);
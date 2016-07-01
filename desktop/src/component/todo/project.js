define([
    "component/dbo"
], function(){
    alt.factory("Todo_Project", ["$log", "$dbo", function($log, $dbo){
        var dbo = $dbo("todo/project", {
            pkey: "projectid",
            autoinc: true,
            fields: {
                projectid: $dbo.STRING,
                title: $dbo.STRING,
                total_task: $dbo.NUMBER
            }
        });

        return dbo;
    }]);
});
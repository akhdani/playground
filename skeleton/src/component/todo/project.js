define([
    "component/dbo"
], function(){
    alt.factory("Todo_Project", ["$log", "$dbo", function($log, $dbo){
        var dbo = $dbo("todo/project", {
            pkey: "projectid",
            autoinc: true,
            fields: {
                projectid: $dbo.INTEGER,
                title: $dbo.STRING
            }
        });

        return dbo;
    }]);
});
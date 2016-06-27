define([
    "component/dbo"
], function(){
    alt.factory("Todo_Tag", ["$log", "$dbo", function($log, $dbo){
        var dbo = $dbo("todo/tag", {
            pkey: "tagid",
            autoinc: true,
            fields: {
                "tagid": $dbo.INTEGER,
                "title": $dbo.STRING
            }
        });

        return dbo;
    }]);
});
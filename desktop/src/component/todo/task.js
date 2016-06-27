define([
    "component/dbo"
], function(){
    alt.factory("Todo_Task", ["$log", "$dbo", function($log, $dbo){
        var dbo = $dbo("todo/task", {
            pkey: "taskid",
            autoinc: true,
            fields: {
                "taskid": $dbo.INTEGER,
                "description": $dbo.STRING,
                "deadline": $dbo.DATE_TIME
            }
        });

        return dbo;
    }]);
});
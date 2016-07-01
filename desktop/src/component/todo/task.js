define([
    
], function(){
    alt.factory("Todo_Task", ["$log", "$dbo", function($log, $dbo){
        var dbo = $dbo("todo/task", {
            pkey: "taskid",
            autoinc: true,
            fields: {
                taskid: $dbo.INTEGER,
                title: $dbo.STRING,
                description: $dbo.STRING,
                deadline: $dbo.DATE_TIME,
                tagid: $dbo.INTEGER,
                projectid: $dbo.INTEGER
            }
        });

        return dbo;
    }]);
});
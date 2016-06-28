define([

], function(){
    alt.factory("Fluido_Master_Task", ["$log", "$q", "$dbo", function($log, $q, $dbo){
        return $dbo("fluido/master/task", {
            pkey: "taskid",
            autoinc: true,
            fields: {
                taskid: $dbo.INTEGER,
                processid: $dbo.INTEGER,
                deploymentid: $dbo.INTEGER,
                name: $dbo.STRING,
                type: $dbo.STRING,
                subtype: $dbo.STRING,
                documentation: $dbo.STRING,
                class: $dbo.STRING
            }
        });
    }]);
});
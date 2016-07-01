define([
    "component/dbo"
], function(){
    alt.factory("Fluido_Master_Task", ["$log", "$q", "$dbo", function($log, $q, $dbo){
        return $dbo("fluido/master/task", {
            pkey: "taskid",
            autoinc: false,
            fields: {
                taskid: $dbo.STRING,
                processid: $dbo.STRING,
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
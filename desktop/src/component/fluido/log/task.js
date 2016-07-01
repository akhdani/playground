define([

], function(){
    alt.factory("Fluido_Log_Task", ["$log", "$q", "$dbo", function($log, $q, $dbo){
        return $dbo("fluido/log/task", {
            pkey: "",
            autoinc: false,
            fields: {
                trxtaskid: $dbo.INTEGER,
                taskid: $dbo.INTEGER,
                trxprocessid: $dbo.INTEGER,
                processid: $dbo.INTEGER,
                deploymentid: $dbo.INTEGER,
                name: $dbo.STRING,
                rev: $dbo.STRING,
                type: $dbo.STRING,
                subtype: $dbo.STRING,
                status: $dbo.STRING,
                starttime: $dbo.DATE_TIME,
                startuser: $dbo.STRING,
                endtime: $dbo.DATE_TIME,
                enduser: $dbo.STRING,
                entrytime: $dbo.DATE_TIME,
                entryuser: $dbo.STRING
            }
        });
    }]);
});
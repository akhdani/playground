define([

], function(){
    alt.factory("Fluido_Transaction_Task", ["$log", "$q", "$dbo", function($log, $q, $dbo){
        return $dbo("fluido/transaction/task", {
            pkey: "trxtaskid",
            autoinc: true,
            fields: {
                trxtaskid: $dbo.INTEGER,
                taskid: $dbo.INTEGER,
                trxprocessid: $dbo.INTEGER,
                processid: $dbo.INTEGER,
                deploymentid: $dbo.INTEGER,
                rev: $dbo.INTEGER,
                name: $dbo.STRING,
                type: $dbo.STRING,
                subtype: $dbo.STRING,
                status: $dbo.STRING,
                starttime: $dbo.DATE_TIME,
                startuser: $dbo.STRING,
                endtime: $dbo.DATE_TIME,
                enduser: $dbo.STRING,
                entrytime: $dbo.DATE_TIME,
                entryuser: $dbo.STRING,
                modifiedtime: $dbo.DATE_TIME,
                modifieduser: $dbo.STRING
            }
        });
    }]);
});
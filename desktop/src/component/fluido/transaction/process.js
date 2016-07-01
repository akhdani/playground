define([

], function(){
    alt.factory("Fluido_Transaction_Process", ["$log", "$q", "$dbo", function($log, $q, $dbo){
        return $dbo("fluido/transaction/process", {
            pkey: "trxprocessid",
            autoinc: true,
            fields: {
                trxprocessid: $dbo.INTEGER,
                processid: $dbo.INTEGER,
                deploymentid: $dbo.INTEGER,
                rev: $dbo.INTEGER,
                name: $dbo.STRING,
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
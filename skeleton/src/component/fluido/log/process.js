define([

], function(){
    alt.factory("Fluido_Log_Process", ["$log", "$q", "$dbo", function($log, $q, $dbo){
        return $dbo("fluido/log/process", {
            pkey: "",
            autoinc: false,
            fields: {
                trxprocessid: $dbo.INTEGER,
                processid: $dbo.INTEGER,
                deploymentid: $dbo.INTEGER,
                name: $dbo.STRING,
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
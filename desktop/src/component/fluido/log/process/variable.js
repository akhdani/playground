define([

], function(){
    alt.factory("Fluido_Log_Process_Variable", ["$log", "$q", "$dbo", function($log, $q, $dbo){
        return $dbo("fluido/log/process/variable", {
            pkey: "",
            autoinc: false,
            fields: {
                variableid: $dbo.INTEGER,
                trxprocessid: $dbo.INTEGER,
                field: $dbo.STRING,
                content: $dbo.STRING
            }
        });
    }]);
});
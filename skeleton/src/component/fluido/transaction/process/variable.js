define([

], function(){
    alt.factory("Fluido_Transaction_Process_Variable", ["$log", "$q", "$dbo", function($log, $q, $dbo){
        return $dbo("fluido/transaction/process/variable", {
            pkey: "variableid",
            autoinc: true,
            fields: {
                variableid: $dbo.INTEGER,
                trxprocessid: $dbo.INTEGER,
                field: $dbo.STRING,
                content: $dbo.STRING
            }
        });
    }]);
});
define([

], function(){
    alt.factory("Fluido_Transaction_Flow", ["$log", "$q", "$dbo", function($log, $q, $dbo){
        return $dbo("fluido/transaction/flow", {
            pkey: "trxflowid",
            autoinc: true,
            fields: {
                trxflowid: $dbo.INTEGER,
                flowid: $dbo.INTEGER,
                trxprocessid: $dbo.INTEGER,
                processid: $dbo.INTEGER,
                deploymentid: $dbo.INTEGER,
                trxtasksource: $dbo.INTEGER,
                trxtasktarget: $dbo.INTEGER
            }
        });
    }]);
});
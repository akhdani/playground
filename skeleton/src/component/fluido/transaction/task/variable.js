define([

], function(){
    alt.factory("Fluido_Transaction_Task_Variable", ["$log", "$q", "$dbo", function($log, $q, $dbo){
        return $dbo("fluido/transaction/task/variable", {
            pkey: "variableid",
            autoinc: true,
            fields: {
                variableid: $dbo.INTEGER,
                trxtaskid: $dbo.INTEGER,
                rev: $dbo.INTEGER,
                field: $dbo.STRING,
                content: $dbo.STRING
            }
        });
    }]);
});
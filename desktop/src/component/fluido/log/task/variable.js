define([

], function(){
    alt.factory("Fluido_Log_Task_Variable", ["$log", "$q", "$dbo", function($log, $q, $dbo){
        return $dbo("fluido/log/task/variable", {
            pkey: "",
            autoinc: false,
            fields: {
                trxtaskid: $dbo.INTEGER,
                rev: $dbo.INTEGER,
                field: $dbo.STRING,
                content: $dbo.STRING
            }
        });
    }]);
});
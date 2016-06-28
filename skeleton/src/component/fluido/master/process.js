define([

], function(){
    alt.factory("Fluido_Master_Process", ["$log", "$q", "$dbo", function($log, $q, $dbo){
        return $dbo("fluido/master/process", {
            pkey: "processid",
            autoinc: true,
            fields: {
                processid: $dbo.INTEGER,
                deploymentid: $dbo.INTEGER,
                name: $dbo.STRING,
                documentation: $dbo.STRING,
                isexecutable: $dbo.BOOLEAN
            }
        });
    }]);
});
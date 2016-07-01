define([
    "component/dbo"
], function(){
    alt.factory("Fluido_Master_Deployment", ["$log", "$q", "$dbo", function($log, $q, $dbo){
        var dbo = $dbo("fluido/master/deployment", {
            pkey: "deploymentid",
            autoinc: true,
            fields: {
                deploymentid: $dbo.INTEGER,
                bpmn: $dbo.STRING,
                name: $dbo.STRING,
                description: $dbo.STRING,
                entrytime: $dbo.DATE_TIME,
                entryuser: $dbo.STRING
            }
        });

        return dbo;
    }]);
});
define([

], function(){
    alt.factory("Fluido_Master_Deployment", ["$log", "$q", "$dbo", function($log, $q, $dbo){
        return $dbo("fluido/master/deployment", {
            pkey: "deploymentid",
            autoinc: true,
            fields: {
                deploymentid: $dbo.INTEGER,
                bpmn: $dbo.STRING,
                name: $dbo.STRING,
                description: $dbo.STRING
            }
        });
    }]);
});
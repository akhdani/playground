define([
    "component/dbo"
], function(){
    alt.factory("Fluido_Master_Flow", ["$log", "$q", "$dbo", function($log, $q, $dbo){
        return $dbo("fluido/master/flow", {
            pkey: "flowid",
            autoinc: false,
            fields: {
                flowid: $dbo.STRING,
                deploymentid: $dbo.INTEGER,
                processid: $dbo.INTEGER,
                source: $dbo.STRING,
                target: $dbo.STRING,
                expression: $dbo.STRING
            }
        });
    }]);
});
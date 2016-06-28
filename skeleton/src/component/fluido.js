define([
    "component/fluido/parser",
    "component/fluido/master/deployment"
], function(){
    alt.factory("Fluido", ["$log", "$q", "$validate", "Fluido_Parser", "Fluido_Master_Deployment", function($log, $q, $validate, Fluido_Parser, Fluido_Master_Deployment){
        return {
            deploy: function(data){
                data = data || {};
                data.vendor = data.vendor || "activiti";

                var deferred = $q.defer();

                var isvalid = $validate()
                    .rule($validate.required(data.bpmn), "File bpmn belum dipilih!")
                    .rule($validate.required(data.name), "Nama belum diisi!")
                    .rule($validate.required(data.vendor), "Vendor belum diisi!")
                    .check();

                if(!isvalid){
                    deferred.reject(isvalid);
                }else{
                    Fluido_Parser.parse(data).then(function(response){
                        return Fluido_Master_Deployment.insert(data);
                    }).then(function(response){
                        deferred.resolve(response.data);
                    });
                }

                return deferred.promise;
            }
        };
    }]);
});
define([
    "component/fluido/parser",
    "component/fluido/master/deployment",
    "component/fluido/master/flow",
    "component/fluido/master/process",
    "component/fluido/master/task",
    "component/fluido/transaction/flow",
    "component/fluido/transaction/process",
    "component/fluido/transaction/process/variable",
    "component/fluido/transaction/task",
    "component/fluido/transaction/task/variable"
], function(){
    alt.factory("Fluido", [
        "$log", "$q", "$validate", "Fluido_Parser", "Fluido_Master_Deployment", "Fluido_Master_Flow", "Fluido_Master_Process", "Fluido_Master_Task", "Fluido_Transaction_Flow", "Fluido_Transaction_Process", "Fluido_Transaction_Task", "Fluido_Transaction_Process_Variable", "Fluido_Transaction_Task_Variable",
        function($log, $q, $validate, Fluido_Parser, Fluido_Master_Deployment, Fluido_Master_Flow, Fluido_Master_Process, Fluido_Master_Task, Fluido_Transaction_Flow, Fluido_Transaction_Process, Fluido_Transaction_Task, Fluido_Transaction_Process_Variable, Fluido_Transaction_Task_Variable){
            return {
                clear: function(){
                    var deferred = $q.defer();

                    $q.all([
                        Fluido_Master_Deployment.remove(),
                        Fluido_Master_Process.remove(),
                        Fluido_Master_Task.remove(),
                        Fluido_Master_Flow.remove(),
                        Fluido_Transaction_Process.remove(),
                        Fluido_Transaction_Process_Variable.remove(),
                        Fluido_Transaction_Task.remove(),
                        Fluido_Transaction_Task_Variable.remove(),
                        Fluido_Transaction_Flow.remove()
                    ]).then(function(){
                        deferred.resolve({status: 200, data: 1});
                    }).catch(function(error){
                        deferred.reject(error);
                    });

                    return deferred.promise;
                },
                deploy: function(data){
                    data = data || {};
                    data.vendor = data.vendor || "activiti";

                    var deferred = $q.defer();

                    var isvalid = $validate()
                        .rule($validate.required(data.bpmn), "File bpmn belum dipilih!")
                        .rule($validate.required(data.name), "Nama belum diisi!")
                        .rule($validate.required(data.vendor), "Vendor belum diisi!")
                        .validate();

                    if(!isvalid.res){
                        deferred.reject({status: 500, message: isvalid.message});
                    }else{
                        Fluido_Master_Deployment.insert(data).then(function(response){
                            data.deploymentid = response.data;

                            return Fluido_Parser.parse(data);
                        }).then(function(response){
                            deferred.resolve(response.data);
                        }).catch(function(error){
                            if(data.deploymentid)
                                Fluido_Master_Deployment.remove({deploymentid: data.deploymentid});

                            deferred.reject(error);
                        });
                    }

                    return deferred.promise;
                }
            };
        }
    ]);
});
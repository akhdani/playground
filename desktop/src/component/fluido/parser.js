define([
    "component/fluido/master/process",
    "component/fluido/master/task",
    "component/fluido/master/flow"
], function(){
    alt.factory("Fluido_Parser", ["$log", "$q", "$validate", "Fluido_Master_Process", "Fluido_Master_Task", "Fluido_Master_Flow", function($log, $q, $validate, Fluido_Master_Process, Fluido_Master_Task, Fluido_Master_Flow){
        var parser = {
            process: function(data){
                var process = [];

                angular.forEach([
                    "process"
                ], function(tag){
                    angular.forEach(data.dom.getElementsByTagName(tag), function(val, key){
                        var item = {
                            processid: val.getAttribute("id"),
                            deploymentid: data.deploymentid,
                            name: val.getAttribute("name"),
                            documentation: val.getElementsByTagName("documentation").length > 0 ? val.getElementsByTagName("documentation")[0].innerHTML : "",
                            isexecutable: val.getAttribute("isExecutable") === "true"
                        };

                        Fluido_Master_Process.insert(item);
                        process.push(item);
                    });
                });

                return process;
            },
            task: function(data){
                var task = [];

                angular.forEach([
                    "startEvent",
                    "endEvent",
                    "userTask",
                    "exclusiveGateway",
                    "parallelGateway"
                ], function(tag){
                    var split = tag.replace(/([A-Z])/g, " $1").split(" "),
                        type = (split[1] + "").toLowerCase(),
                        subtype = (split[0] + "").toLowerCase();

                    angular.forEach(data.dom.getElementsByTagName(tag), function(val, key){
                        var item = {
                            taskid: val.getAttribute("id"),
                            deploymentid: data.deploymentid,
                            processid: data.process[0].processid,
                            name: val.getAttribute("name"),
                            type: type,
                            subtype: subtype,
                            documentation: val.getElementsByTagName("documentation").length > 0 ? val.getElementsByTagName("documentation")[0].innerHTML : "",
                            class: val.getAttribute("class")
                        };
                        
                        Fluido_Master_Task.insert(item);
                        task.push(item);
                    });
                });

                return task;
            },
            flow: function(data){
                var flow = [];

                angular.forEach([
                    "sequenceFlow"
                ], function(tag){
                    var split = tag.replace(/([A-Z])/g, " $1").split(" "),
                        type = (split[1] + "").toLowerCase(),
                        subtype = (split[0] + "").toLowerCase();

                    angular.forEach(data.dom.getElementsByTagName(tag), function(val, key){
                        var item = {
                            flowid: val.getAttribute("id"),
                            deploymentid: data.deploymentid,
                            processid: data.process[0].processid,
                            source: val.getAttribute("sourceRef"),
                            target: val.getAttribute("targetRef"),
                            expression: val.getElementsByTagName("conditionExpression").length > 0 ? (val.getElementsByTagName("conditionExpression")[0].innerHTML + "").replace("<![CDATA[${", "").replace("}]]", "") : ""
                        };

                        Fluido_Master_Flow.insert(item);
                        flow.push(item);
                    });
                });

                return flow;
            },
            parse: function(data){
                var deferred = $q.defer();

                var isvalid = $validate()
                    .rule($validate.required(data.bpmn), "File bpmn belum dipilih!")
                    .rule($validate.required(data.deploymentid), "Deploymentid belum diisi!")
                    .validate();

                if(!isvalid.res){
                    deferred.reject({status: 500, message: isvalid.message});
                }else{
                    // load bpmn file
                    var reader = new FileReader();

                    reader.onload = function(event){
                        try{
                            data.dom = (new window.DOMParser()).parseFromString(reader.result, "text/xml");
                            data.process = parser.process(data);
                            data.task = parser.task(data);
                            data.flow = parser.flow(data);

                            deferred.resolve(data);
                        }catch(e){
                            deferred.reject({status: 500, message: "Tidak dapat melakukan parsing file bpmn!"});
                        }
                    };

                    reader.onerror = function(error){
                        deferred.reject({status: 500, message: "Tidak dapat membaca file bpmn!"});
                    };

                    reader.readAsText(data.bpmn);
                }

                return deferred.promise;
            }
        };

        return parser;
    }]);
});
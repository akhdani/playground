define([

], function(){
    return ["$scope", "$alert", "$button", "$popup", function($scope, $alert, $button, $popup){
        $scope.toolbar1 = {
            isshowpagebar: false,
            title: "Table",
            description: "with local data"
        };

        $scope.table1 = {
            // isshowpagination: false,
            // isshowviewdata: false,
            // isshowfilter: false,
            limit: 1,
            total_data: [{
                code: "A01",
                area: "Abc"
            }, {
                code: "A02",
                area: "Def"
            }, {
                code: "A03",
                area: "Ghi"
            }],
            buttons: function(index, item){
                return [
                    $button("view", {
                        title: "",
                        href: alt.baseUrl + "master/area/detail?action=view&areaid=" + item.areaid
                    }),
                    $button("edit", {
                        title: "",
                        href: alt.baseUrl + "master/area/detail?action=edit&areaid=" + item.areaid
                    }),
                    $button("remove", {
                        title: "",
                        onclick: function(){
                            $popup.confirm("Apakah anda yakin akan menghapus area " + item.code + "?").then(function(response){
                                return Migsys_Master_Area.remove({areaid: item.areaid})
                            }).then(function(response){
                                $alert.add("Area berhasil dihapus!", $alert.success);
                                $scope.table.reload($scope.table.params());
                            });
                        }
                    })
                ];
            }
        };
    }];
});
'use strict';
app.controller('NaviController', ['dataService', function NaviController(sData){
    var cNavi = this;

    sData.getList().then(function (list) {
        cNavi.list = list;
    });
}]);
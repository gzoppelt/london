'use strict';

app.factory('dataService', function($q, $http){
    var sData = this;
    sData.loaded = false;

    function loadData() {
        var i;
        return $q(function(resolve, reject){
            sData.list = [];
            sData.nameList = [];
            sData.listList = [];
            sData.currentIndex = -1;
            sData.currentItem = {};
            $http.get('data/locations.json').then(function (result) {
                sData.list = result.data;
                for (i in sData.list) {
                    sData.nameList[i] = sData.list[i].name;
                    sData.listList[i] = sData.list[i].list;
                }
                sData.loaded = true;
                resolve();
            });

        });
    }

    sData.loadData = function () {
        loadData();
    }

    sData.getAll = function () {
        return $q(function (resolve, reject) {
            if (sData.loaded) {
                resolve(sData.list);
            } else {
                loadData().then(function () {
                    resolve(sData.list);
                });
            }
        });
    };

    sData.getList = function () {
        return $q(function (resolve, reject) {
           if (sData.loaded) {
               resolve(sData.listList)
           } else {
               loadData().then(function () {
                    resolve(sData.listList);
               });
           }
        });
    };

    function get(list) {
        var index = sData.listList.indexOf(list);
        sData.currentIndex = index;
        sData.currentItem = sData.list[index];
        return sData.currentItem;
    }

    sData.getFromList = function (list) {
        return $q(function (resolve, reject) {
            if (sData.loaded) {
                resolve(get(list));
            } else {
                loadData().then(function () {
                    resolve(get(list));
                });
            }
        });
    };

    sData.getNameList = function () {
        return $q(function (resolve, reject) {
            if (sData.loaded) {
                resolve(sData.nameList)
            } else {
                loadData().then(function () {
                    resolve(sData.nameList);
                });
            }
        });
    };

    return sData;
});
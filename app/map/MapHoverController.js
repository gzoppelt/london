'use strict';
app.controller('MapHoverController', ['sData', function MapHoverController(sData){
    var cMapHover = this;
    cMapHover.list = sData.getList();
}]);
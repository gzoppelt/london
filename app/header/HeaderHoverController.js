'use strict';
app.controller('HeaderHoverController', ['$state', 'sData', function HeaderHoverController($state, sData) {
    var cHeaderHover = this;
    cHeaderHover.points = sData.getAll();
}]);
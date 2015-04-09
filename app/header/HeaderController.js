'use strict';

app.controller('HeaderController', ['dataService', function HeaderController(sData) {
    var cHeader = this;

    cHeader.points = [];
    sData.getAll().then(function (list) {
        cHeader.points = list;
    });
}]);

app.directive(
    "bnLogDomCreation",     //author: Ben Nadler
    function() {

        // I link the DOM element to the view model.
        function link( $scope, element, attributes ) {
            console.log(
                "Link Executed:",
                $scope.point.name,
                $scope.point
            );
        }

        // Return directive configuration.
        return({
            link: link,
            restrict: "A"
        });
    }
);
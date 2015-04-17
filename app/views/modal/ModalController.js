'use strict';

app.controller('ModalController', [
    //list of dependencies
    'dataService',
    '$modalInstance',
    'item',
    function ModalController(sData, $modalInstance, item) {
        var cModal = this;

        cModal.item = item.trim();

        //handles click on OK button
        cModal.ok = function () {
            $modalInstance.close();
        };

        //street view image or substitute
        switch (item.trim()) {
            case 'The Shard, London, UK':
                //street view points in wrong direction
                cModal.streetViewUrl = 'app/common/images/shard.jpg';
                break;
            case "St. Paul's Cathedral":
                //no street view image
                cModal.streetViewUrl = 'app/common/images/paul.jpg';
                break;
            case "Tower of London":
                //no street view image
                cModal.streetViewUrl = 'app/common/images/tower.jpg';
                break;
            default:
                cModal.streetViewUrl =
                    'http://maps.googleapis.com/maps/api/streetview?size=640x640 &fov=120 &location='
                    + cModal.item + ', London, UK';
        }

        //New York Times
        sData.getNyt(cModal.item)
            .then(function (list){
                cModal.nytArticles = list;
                if(cModal.nytArticles.length == 0){
                    cModal.nytArticles = [{
                        web_url: '#',
                        headline: { main: 'No "The New York Times" Articles'},
                        snippet: 'could be found matching the search criteria: ' + cModal.item
                    }];
                }
        });
    }
]);

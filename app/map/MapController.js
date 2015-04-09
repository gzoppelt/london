'use strict';
app.controller('MapController', ['$q', 'dataService', function MapController($q, sData) {
    var cMap = this;
    sData.getList().then(function (list) {
        cMap.list = list;
        initializeMap();
    });

    /*
     Copied from helper.js -- udacity project: frontend-nanodegree-resume
     */
    function initializeMap() {
        var locations;

        var mapOptions = {
            disableDefaultUI: true
        };

        cMap.map = new google.maps.Map(document.querySelector('#map'), mapOptions);

        function locationFinder() {
            var i,
                locations = []
            ;
            for (i in cMap.list) {
                locations.push(cMap.list[i] + ' London UK');
            }
            return locations;
        }

        function createMapMarker(placeData) {
            var lat = placeData.geometry.location.lat();    // latitude from the place service
            var lon = placeData.geometry.location.lng();    // longitude from the place service
            var name = placeData.name;                      // name of the place from the place service
            var bounds = window.mapBounds;                  // current boundaries of the map window

            var marker = new google.maps.Marker({
                map: cMap.map,
                position: placeData.geometry.location,
                title: name
            });

            var infoWindow = new google.maps.InfoWindow({
                content: name
            });

            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open(cMap.map, marker);
            });

            bounds.extend(new google.maps.LatLng(lat, lon));
            cMap.map.fitBounds(bounds);
            cMap.map.setCenter(bounds.getCenter());
        }

        function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                createMapMarker(results[0]);
            }
        }

        function pinPoster(locations) {
            var service = new google.maps.places.PlacesService(cMap.map);

            for (var place in locations) {
                var request = {
                    query: locations[place]
                };
                service.textSearch(request, callback);
            }
        }

        window.mapBounds = new google.maps.LatLngBounds();
        locations = locationFinder();
        pinPoster(locations);
    }
}]);

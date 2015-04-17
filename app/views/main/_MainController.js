'use strict';
app.controller('MainController', [
    //list of dependencies
    '$modal',
    '$q',
    'dataService',
    function MainController($modal, $q, sData) {
    //cMain is short for MainController and is used instead of the outdated $scope
    var cMain = this;

    /* sData stands for dataService which is defined in /app/common/services/dataService.js
       loaded with index.html and injected in this application in the controller definition.
     */

    //loads the data
    sData.getAll().then(function (list) {
        cMain.list = list;
        initializeMap();
    });

    //deals with hover events either over navi or header or map marker
    cMain.hover = function (id) {
        id = Number(id);
        cMain.hoverId = id;

        var next = id + 1;

        //mark header entry red
        $('#img'+id).attr('src', cMain.list[id].picture_red[0]);
        if (id == 6) {
            $('#img'+next).attr('src', cMain.list[id].picture_red[1]);
        }
    }

    //undoes the hover effects
    cMain.home = function () {
        //set all back no not hovered
        var id = cMain.hoverId;
        var next = id + 1;
        $('#img'+id).attr('src', cMain.list[id].picture_black[0]);
        if (id == 6) {
            $('#img'+next).attr('src', cMain.list[id].picture_black[1]);
        }
        cMain.hoverId = null;

    }

    //deals with click events either over navi or header or map marker
    cMain.click = function (id) {
        var modalInstance = $modal.open({
            templateUrl:    'app/views/modal/modalTemplate.html',
            controller:     'ModalController as cModal',
            size:           'lg',
            resolve: {
                item: function () {
                    return $('#li'+id).text();
                }
            }
        });
    }

    /*
     The following has been copied and adapted from helper.js
     in the  Udacity project: frontend-nanodegree-resume
     */
    function initializeMap() {
        var locations;

        var mapOptions = {
            disableDefaultUI: true
        };

        cMain.map = new google.maps.Map(document.querySelector('#map'), mapOptions);

        function locationFinder() {
            var i,
                locations = []
                ;
            for (i in cMain.list) {
                locations.push(cMain.list[i].list + ' London UK');
            }
            return locations;
        }

        function createMapMarker(placeData, id) {
            var lat = placeData.geometry.location.lat();    // latitude from the place service
            var lon = placeData.geometry.location.lng();    // longitude from the place service
            var name = placeData.name;                      // name of the place from the place service
            var bounds = window.mapBounds;                  // current boundaries of the map window

            var marker = new google.maps.Marker({
                map: cMain.map,
                position: placeData.geometry.location,
                title: name
            });

            var infoWindow = new google.maps.InfoWindow({
                content: name
            });

            google.maps.event.addListener(marker, 'click', function () {
                cMain.click(id);
            });

            google.maps.event.addListener(marker, 'mouseover', function () {
                //cMain.hover(marker.id);
                // does not apply some of the magic that happens through dom events
                // i.e. the entry in the navi list was not highlighted
                // so let's create some dom action:
                $('#li'+id).mouseover();
            });

            google.maps.event.addListener(marker, 'mouseout', function () {
                cMain.home();
            });

            bounds.extend(new google.maps.LatLng(lat, lon));
            cMain.map.fitBounds(bounds);
            cMain.map.setCenter(bounds.getCenter());
        }
        var myCallback = function(id) {
            return function (results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    createMapMarker(results[0], id);
                }
            }
        }

        function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                createMapMarker(results[0]);
            }
        }

        function pinPoster(locations) {
            var service = new google.maps.places.PlacesService(cMain.map);

            for (var place in locations) {
                var request = {
                    query: locations[place]
                };
                service.textSearch(request, myCallback(place));
            }
        }

        window.mapBounds = new google.maps.LatLngBounds();
        locations = locationFinder();
        pinPoster(locations);
    }
}]);

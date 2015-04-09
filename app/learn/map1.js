'use strict';

var map;    // declares a global map variable
function initializeMap() {
    var locations = [
        "Big Ben London UK",
        "London Underground  London UK",
        "Shard  London UK",
        "Gherkin  London UK",
        "St Paul's Cathedral London UK",
        "Nelson's Column London UK",
        "London Eye London UK",
        "Tower of London London UK"
    ];

    var mapOptions = {
        disableDefaultUI: true
    };

    map = new google.maps.Map(document.querySelector('#map'), mapOptions);

    function createMapMarker(placeData) {
        var lat = placeData.geometry.location.lat();    // latitude from the place service
        var lon = placeData.geometry.location.lng();    // longitude from the place service
        var name = placeData.formatted_address;         // name of the place from the place service
        var bounds = window.mapBounds;                  // current boundaries of the map window

        var marker = new google.maps.Marker({
            map: map,
            position: placeData.geometry.location,
            title: name
        });

        var infoWindow = new google.maps.InfoWindow({
            content: name
        });

        google.maps.event.addListener(marker, 'click', function() {
            //my code went here
            infoWindow.open(map, marker);
        });

        bounds.extend(new google.maps.LatLng(lat, lon));
        map.fitBounds(bounds);
        map.setCenter(bounds.getCenter());
    }

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            createMapMarker(results[0]);
        }
    }

    function pinPoster(locations) {
        var service = new google.maps.places.PlacesService(map);

        for (var place in locations) {
            var request = {
                query: locations[place]
            };
            service.textSearch(request, callback);
        }
    }

    window.mapBounds = new google.maps.LatLngBounds();
    pinPoster(locations);

}
window.addEventListener('load', initializeMap);
window.addEventListener('resize', function(e) {
    map.fitBounds(mapBounds);
});

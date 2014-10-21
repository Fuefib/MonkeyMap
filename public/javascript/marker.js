function MarkerMng() {
};

MarkerMng.prototype = {
    markers: []
};

MarkerMng.prototype.createMarker = function (map, x, y, description) {
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(y, x),
        map: map,
        title: description
    });

    return marker;
};

MarkerMng.prototype.addMarker = function (map, x, y, description) {

    var marker = markerMgn.createMarker(map, x, y, description);

    google.maps.event.addListener(marker, 'rightclick', function () {
        marker.setMap(null);
    });


    web.post(web.markerUrl, JSON.stringify({x: x, y: y, description: description}), function (data) {
        return true;
    });
    // var infowindow = new google.maps.InfoWindow();
    //infowindow.setContent();

};

MarkerMng.prototype.removeMarker = function (map, marker) {

};


MarkerMng.prototype.removeMarkers = function () {
    for (var i = 0; i < markerMgn.markers.length; i++) {
        var m = markerMgn.markers[i];
        m.setMap(null);
    }
    markerMgn.markers = [];
};


MarkerMng.prototype.getMarkers = function (callback) {
    if (callback) {
        web.get(web.markersUrl, callback);
    }
};

MarkerMng.prototype.initMarkers = function (map) {
    markerMgn.getMarkers(function (data) {
        markerMgn.initMarkersCallback(map, data);
    });
};

MarkerMng.prototype.initMarkersCallback = function (map, result) {
    markerMgn.removeMarkers();
    for (var i = 0; i < result.length; i++) {
        var markerOptions = result[i];
        var marker = markerMgn.createMarker(map, markerOptions.y, markerOptions.x, markerOptions.description);
        markerMgn.markers.push(marker);
        console.log(result);
    }
};


var markerMgn = new MarkerMng();
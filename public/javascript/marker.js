function MarkerMng() {
};

MarkerMng.prototype = {
    markers: []
};

MarkerMng.prototype.roundCoord = function (B, k){
    var nB = parseFloat(B.toPrecision(6));
    var nk = parseFloat(k.toPrecision(6));

    console.log({
        "B" : nB,
        "k" : nk
    });

    return {
        "B" : nB,
        "k" : nk
    };
};

MarkerMng.prototype.createMarker = function (map, B, k, description) {
    
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(k, B),
        map: map,
        title: description
    });

    google.maps.event.addListener(marker, 'rightclick', function () {
        markerMgn.removeMarker(marker);
    });

    return marker;
};

MarkerMng.prototype.addMarker = function (map, B, k, description) {
    var coord = markerMgn.roundCoord(B,k);
    var marker = markerMgn.createMarker(map, coord.B, coord.k, description);

    web.post(web.markerUrl, JSON.stringify({B: coord.B, k: coord.k, description: description}), function (data) {
        return true;
    });
    // var infowindow = new google.maps.InfoWindow();
    //infowindow.setContent();

};

MarkerMng.prototype.removeMarker = function (marker) {
     marker.setMap(null);

     var coord = markerMgn.roundCoord(marker.position.B,marker.position.k);
     web.delete(web.markerUrl, JSON.stringify({B: coord.B, k: coord.k}), function (data) {
        return true;
    });
     console.log(marker);
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
        var marker = markerMgn.createMarker(map, markerOptions.B, markerOptions.k, markerOptions.description);
        markerMgn.markers.push(marker);
        console.log(result);
    }
};


var markerMgn = new MarkerMng();
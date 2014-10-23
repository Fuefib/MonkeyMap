function MarkerMng() {
};

MarkerMng.prototype = {
    markers: [],
    currentDataTime : 0
};

MarkerMng.prototype.roundCoord = function (B, k){
    var nB = parseFloat(B.toPrecision(6));
    var nk = parseFloat(k.toPrecision(6));

    return {
        "B" : nB,
        "k" : nk
    };
};

MarkerMng.prototype.createInfoWindow = function (map, marker, content, creationDate) {

    var contentString = "<div class=\"description\">";

    if(content && content != ''){
         contentString += content;
     }

     contentString += "</div>";
        
    if(creationDate){
        var time = $.format.prettyDate(creationDate);
        contentString += "<div class=\"creationdate\">created " + time + "</div>";
    }
    
    if(contentString != ""){
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        google.maps.event.addListener(marker, 'mouseover', function () {
            infowindow.open(map,marker);
        });

        google.maps.event.addListener(marker, 'mouseout', function () {
            infowindow.close();
        });     

        return infowindow;   
    }

    return null;
}

MarkerMng.prototype.createMarker = function (map, B, k, description, creationDate) {
    
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(k, B),
        map: map,
        title: description
    });

    var infowindow = markerMgn.createInfoWindow(map, marker, description, creationDate);

    google.maps.event.addListener(marker, 'rightclick', function () {
        markerMgn.removeMarker(marker);
    });

    google.maps.event.addListener(marker, 'click', function () {
        map.panTo(marker.position);
    });



    return marker;
};

MarkerMng.prototype.addMarker = function (map, B, k, description) {
    var coord = markerMgn.roundCoord(B,k);
    var creationDate = new Date().getTime();
    var marker = markerMgn.createMarker(map, coord.B, coord.k, description, creationDate);
    

    web.post(web.markerUrl, JSON.stringify({B: coord.B, k: coord.k, description: description, creationDate: creationDate}), function (data) {
        return true;
    });
};

MarkerMng.prototype.removeMarker = function (marker) {
     marker.setMap(null);

     var coord = markerMgn.roundCoord(marker.position.B,marker.position.k);
     web.delete(web.markerUrl, JSON.stringify({B: coord.B, k: coord.k}), function (data) {
        return true;
    });
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
        var url = web.markersUrl;
        if(markerMgn.currentDataTime){
            url += '?d=' + markerMgn.currentDataTime;
        }

        markerMgn.currentDataTime = new Date().getTime();
        web.get(url, callback);

    }
};

MarkerMng.prototype.initMarkers = function (map) {
    try {
        markerMgn.getMarkers(function (data) {
            markerMgn.initMarkersCallback(map, data);
        });
    } catch (e) {
        console.log('fsw : ' + e);
    }
};

MarkerMng.prototype.initMarkersCallback = function (map, result) {
    markerMgn.removeMarkers();
    for (var i = 0; i < result.length; i++) {
        var markerOptions = result[i];
        var marker = markerMgn.createMarker(map, markerOptions.B, markerOptions.k, markerOptions.description, markerOptions.creationDate);
        markerMgn.markers.push(marker);
    }
};


var markerMgn = new MarkerMng();
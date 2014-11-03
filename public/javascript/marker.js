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
        var time = $.format.date(creationDate, "dd/MM HH:mm:ss");
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

MarkerMng.prototype.createMarker = function (map, markerOptions) {
    
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(markerOptions.k, markerOptions.B),
        map: map,
        title: markerOptions.description
    });

    if(markerOptions.type){
        var icon = "/public/images/" + markerOptions.type.image;
        marker.setIcon(icon);
    }

    var infowindow = markerMgn.createInfoWindow(map, marker, markerOptions.description, markerOptions.creationDate);

    google.maps.event.addListener(marker, 'rightclick', function () {
        markerMgn.removeMarker(marker);
    });

    google.maps.event.addListener(marker, 'click', function () {
        map.panTo(marker.position);
    });

    return marker;
};

MarkerMng.prototype.addMarker = function (map, B, k, description, type) {
    var coord = markerMgn.roundCoord(B,k);
    var creationDate = new Date().getTime();

    web.post(web.markerUrl, JSON.stringify({B: coord.B, k: coord.k, description: description, creationDate: creationDate, type: type}), function (data) {
        return true;
    });
};

MarkerMng.prototype.removeMarker = function (marker) {
     var coord = markerMgn.roundCoord(marker.position.B,marker.position.k);
     var removeDate = new Date().getTime();
     web.delete(web.markerUrl, JSON.stringify({pos: {B: coord.B, k: coord.k}, removeDate: removeDate}), function (data) {
        return true;
    });
};


MarkerMng.prototype.removeMarkers = function () {

    $.each(markerMgn.markers, function (index,value) {
        $.each(value, function (index, marker) {
            marker.setMap(null);
        });
    });

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
    markerMgn.getMarkers(function (data) {
        markerMgn.initMarkersCallback(map, data);
    });
};

MarkerMng.prototype.initMarkersCallback = function (map, result) {
    markerMgn.removeMarkers();
    var created = result.created;
    for (var i = 0; i < created.length; i++) {
        var markerOptions = created[i];
        var marker = markerMgn.createMarker(map, markerOptions);
        markerMgn.markers[markerOptions.B] = [];
        markerMgn.markers[markerOptions.B][markerOptions.k] = marker;
    }
};


MarkerMng.prototype.updateMarkers = function (map) {  
    markerMgn.getMarkers(function (data) {
        markerMgn.updateMarkersCallback(map, data);
    });
};

MarkerMng.prototype.updateMarkersCallback = function (map, result) {

    var created = result["created"];
    var removed = result["removed"];

    for (var i = 0; i < created.length; i++) {
        var markerOptions = created[i];
        var marker = markerMgn.createMarker(map, markerOptions);
        markerMgn.markers[markerOptions.B] = [];
        markerMgn.markers[markerOptions.B][markerOptions.k] = marker;
    }

    for (var i = 0; i < removed.length; i++) {
        var markerOptions = removed[i];
        markerMgn.markers[markerOptions.B][markerOptions.k].setMap(null);
        markerMgn.markers[markerOptions.B][markerOptions.k] = null;
    }
};

var markerMgn = new MarkerMng();
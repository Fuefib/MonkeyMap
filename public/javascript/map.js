function Map(){
};

Map.prototype = {
	map : {}
};

Map.prototype.getNormalizedCoord = function (coord, zoom) {
    var y = coord.y;
    var x = coord.x;

    // tile range in one direction range is dependent on zoom level
    // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
    var tileRange = 1 << zoom;

    // don't repeat across y-axis (vertically)
    if (y < 0 || y >= tileRange) {
        return null;
    }

    // repeat across x-axis
    if (x < 0 || x >= tileRange) {
        return null;
    }

    return {
        x: x,
        y: y
    };
 };

Map.prototype.getAaMapTypeOptions = function () {
	return {
		getTileUrl : function(coord, zoom) {
    	    var normCoord = aaMap.getNormalizedCoord(coord, zoom);

            if (!normCoord) {
                return 'http://fuefib.free.fr/aa/aaTiles/tile_5_0-0.png';
            }

            return 'http://fuefib.free.fr/aa/aaTiles/tile_'+zoom+'_'+normCoord.x+'-'+normCoord.y+'.png'
        },
        tileSize: new google.maps.Size(256, 256),
        maxZoom : 5,
        minZoom : 2,
        name : 'aa'
    };
};


Map.prototype.getAaMapType = function () { 
	return new google.maps.ImageMapType(aaMap.getAaMapTypeOptions());
};

Map.prototype.initialize = function () {
    var myLatlng = new google.maps.LatLng(0, 0);
    var mapOptions = {
        center : myLatlng,
        zoom : 1,
        streetViewControl : false,
        mapTypeControlOptions : {
            mapTypeIds : [ 'aa' ]
        }
    };

    aaMap.map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
    aaMap.map.mapTypes.set('aa', aaMap.getAaMapType());
    aaMap.map.setMapTypeId('aa');
};

Map.prototype.initEvents = function (scope) {
	google.maps.event.addListener(aaMap.map, 'click', function(event) {             

        scope.mapCtrl.currentMarker.x = event.latLng.B;
        scope.mapCtrl.currentMarker.y = event.latLng.k;

		scope.$apply();

		console.log("type : " + scope.mapCtrl.currentMarker.type);

        markerMgn.addMarker(aaMap.map, event.latLng.B, event.latLng.k, scope.mapCtrl.currentMarker.description, scope.mapCtrl.markerTypes[scope.mapCtrl.currentMarker.type]);
        scope.mapCtrl.resetMarker();
        scope.$apply();
     });
}


var aaMap = new Map();
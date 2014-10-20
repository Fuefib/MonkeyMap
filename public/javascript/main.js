(function () {
	var app = angular.module('aaMap', []);

    app.controller('MapController', ['$scope', function (sc) {
        var aaMap;

        var a = {};
        this.latLng = {};
        this.description = "";

        this.currentMarker = {};

        // Normalizes the coords that tiles repeat across the x axis (horizontally)
        // like the standard Google map tiles.
        a.getNormalizedCoord = function (coord, zoom) {
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

        a.aaMapTypeOptions = {
            getTileUrl : function(coord, zoom) {
                var normCoord = a.getNormalizedCoord(coord, zoom);

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


        a.aaMapType = new google.maps.ImageMapType(a.aaMapTypeOptions);

        this.initialize = function () {
            var myLatlng = new google.maps.LatLng(0, 0);
            var mapOptions = {
                center : myLatlng,
                zoom : 1,
                streetViewControl : false,
                mapTypeControlOptions : {
                    mapTypeIds : [ 'aa' ]
                }
            };

            aaMap = new google.maps.Map(document.getElementById('map-canvas'),
                mapOptions);
            aaMap.mapTypes.set('aa', a.aaMapType);
            aaMap.setMapTypeId('aa');


            google.maps.event.addListener(aaMap, 'click', function(event) {             
                console.log(sc);

                sc.mapCtrl.currentMarker.x = event.latLng.B;
                sc.mapCtrl.currentMarker.y = event.latLng.k;

				sc.$apply();


                console.log(sc.mapCtrl.currentMarker);

                var marker = new google.maps.Marker({
                    position: event.latLng,
                    map: aaMap
                });

                google.maps.event.addListener(marker, 'rightclick', function() {
			    	alert("pouet");
	            });
        	});
        };

        this.initialize ();
    }]);
})();
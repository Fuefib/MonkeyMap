var aaMap;

var myMap = {
	
	initialize : function () {


		var aaMapTypeOptions = {
			getTileUrl : function(coord, zoom) {
					var normCoord = myMap.getNormalizedCoord(coord, zoom);
					
					if (!normCoord) {
	        			return 'http://fuefib.free.fr/aa/aaTiles/tile_3_4-0.png';
	      			}
	
				return 'http://fuefib.free.fr/aa/aaTiles/tile_'+zoom+'_'+normCoord.x+'-'+normCoord.y+'.png'
			},
			tileSize: new google.maps.Size(256, 256),
			maxZoom : 5,
			minZoom : 2,
			name : 'aa'
		};

		var aaMapType = new google.maps.ImageMapType(aaMapTypeOptions);

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
		aaMap.mapTypes.set('aa', aaMapType);
		aaMap.setMapTypeId('aa');

		google.maps.event.addListener(aaMap, 'click', function(event) {
			var marker = new google.maps.Marker({
				position: event.latLng,
				map: aaMap
			});
			console.log(event);
 		});

	},


	// Normalizes the coords that tiles repeat across the x axis (horizontally)
	// like the standard Google map tiles.
	getNormalizedCoord : function (coord, zoom) {
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
	}

};


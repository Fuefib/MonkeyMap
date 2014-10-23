(function () {
	var app = angular.module('aaMap', []);

    app.controller('MapController', ['$scope', function (sc) {
        this.currentMarker = {};
        aaMap.initialize ();
        aaMap.initEvents (sc);
        markerMgn.initMarkers(aaMap.map);
        
        setInterval( function () { markerMgn.updateMarkers(aaMap.map); }, 1000);

    }]);
})();
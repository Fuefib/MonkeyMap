(function () {
	var app = angular.module('aaMap', []);

    app.controller('MapController', ['$scope', function (sc) {
        this.currentMarker = {};
        aaMap.initialize ();
        aaMap.initEvents (sc);
        
        setInterval( function () { markerMgn.initMarkers(aaMap.map); }, 10000);

    }]);
})();
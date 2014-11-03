(function () {
	var app = angular.module('aaMap', []);

    app.controller('MapController', ['$scope', function (sc) {
        this.currentMarker = {};

        this.markerTypes =  {
        	"bleu": {name:"bleu", image:"fleche_bleue.png"},
        	"rouge": {name:"rouge", image:"fleche_rouge.png"},
        	"vert": {name:"vert", image:"fleche_verte.png"},
        	"rose": {name:"rose", image:"fleche_rose.png"}
    	};

        this.resetMarker = function () {
          this.currentMarker = {};
        };

        aaMap.initialize ();
        aaMap.initEvents (sc);
        markerMgn.initMarkers(aaMap.map);
        
        setInterval( function () { markerMgn.updateMarkers(aaMap.map); }, 1000);

    }]);
})();
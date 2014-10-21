(function () {
	var app = angular.module('aaMap', []);

    app.controller('MapController', ['$scope', function (sc) {
        this.currentMarker = {};
        aaMap.initialize ();
        aaMap.initEvents (sc);
    }]);
})();
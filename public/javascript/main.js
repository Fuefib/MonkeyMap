(function () {
	var app = angular.module('aaMap', []);

	app.controller('MarkerController', function () {

		this.setLatLng = function (ll) {
			this.latLng = ll;
		};

		this.setDescrition = function (desc){
			this.description = desc;
		};


		this.reset = function () {
			this.latLng = {};
			this.description = "";
		};
	});
})();
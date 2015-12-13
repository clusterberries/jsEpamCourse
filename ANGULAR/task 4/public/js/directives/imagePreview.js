'use strict';

(function () {
	angular.module('catsApp').directive('imagePreview', function() {
		return {
			restrict: 'E',
			templateUrl: '../views/imagePreview.html'
	  	}
	});
}());

'use strict';

(function () {
	angular.module('catsApp')
	.directive('enterClick', [ '$document', function($document) {
		return {
			restrict: 'A',
			link: function(scope, elm, attrs) {				
	      		$document.on('keydown', function(event) {
	      			// if click enter and the button is enabled
	      			if (event.keyCode === 13 && !attrs.disabled) {
	      				event.preventDefault();
	      				elm[0].click();
	      				// after the first click ng-disabled doesn't work (don't know why)
	      				elm[0].disabled = true;
	      			}
	      		});
	    	}
	  	}
	}]);
}());

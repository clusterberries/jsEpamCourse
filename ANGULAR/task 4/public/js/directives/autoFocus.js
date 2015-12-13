'use strict';

(function () {
	angular.module('catsApp')
	.directive('autoFocus', function() {
		return {
			restrict: 'A',
			link: function(scope, elm, attrs) {				
	      		elm[0].focus();
	    	}
	  	}
	});
}());

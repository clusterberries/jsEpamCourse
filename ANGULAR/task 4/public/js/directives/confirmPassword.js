'use strict';

(function () {
	angular.module('catsApp')
	.directive('confirmPassword', function() {
		return {
			require: 'ngModel',
			link: function(scope, elm, attrs, ctrl) {				
	      		ctrl.$validators.password = function(value) {
	      			// check if the main and confirm passwords are equal
	        		if (scope.newUser.pass !== value) {
	        			return false;
	        		}
	        		else return true;	
	      		}
	      		// if the field with main passwords changes validate confirm password
	      		scope.$watch('newUser.pass', function() {
	                ctrl.$validate();
	            });
	    	}
	  	}
	});
}());

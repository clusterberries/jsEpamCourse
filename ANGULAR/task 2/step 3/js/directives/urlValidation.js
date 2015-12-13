'use strict';

(function () {
	angular.module('catsApp')
	.directive('urlValidation', ['$q', '$http', function($q, $http) {
		return {
			require: 'ngModel',
			link: function(scope, elm, attrs, ctrl) {
	      		ctrl.$asyncValidators.username = function(value) {
	        		var def = $q.defer();

	        		$http.get(value) 
					.success(function(data, status, headers, config) {
						// resolve if can get the data from url, so the input is valid
			            def.resolve();
			        })
			        .error(function() {
			        	// if cant get data the input is infalid
			            def.reject();
				  	});

	        		return def.promise;
	      		}
	    	}
	  	}
	}]);
}());


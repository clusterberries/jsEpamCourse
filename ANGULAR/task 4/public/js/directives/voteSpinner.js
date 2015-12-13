'use strict';

(function () {
	angular.module('catsApp').directive('voteSpinner', function() {
		return {
			restrict: 'E',
			replace: true, 
			templateUrl: '../views/voteSpinner.html',
			scope: {
				voteValue: '=',
				voteDisabled: '@', 
				voteFunction: '&'
			},
			controller: ['$scope', function($scope) {
				$scope.vote = function (up) {
					if (up) $scope.voteValue++;
					else $scope.voteValue--;
					// call the custom function
					$scope.voteFunction({votes: $scope.voteValue});
				}
			}]
	  	}
	});
}());

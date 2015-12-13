'use strict';

(function () {
	angular.module('catsApp').controller('CatsController', ['$scope', function($scope) {
		$scope.cats = [];
	}]);
}());
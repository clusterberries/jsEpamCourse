'use strict';

var catsModule = angular.module('catsApp', []);

catsModule.controller('CatsController', ['$scope', function($scope) {
	$scope.cats = [
		{ name: 'Tom', index: 0, count: 0 },
		{ name: 'Bill', index: 1, count: 0 },
		{ name: 'Jack', index: 2, count: 0 },
		{ name: 'Alex', index: 3, count: 0 },
		{ name: 'Anonymous', index: 4, count: 0 }
	];

	$scope.increment = function (cat) {
		cat.count++;
	}
}]);
'use strict';

var catsModule = angular.module('catsApp', []);

catsModule.controller('CatsController', ['$scope', function($scope) {
	// need more cats!
	$scope.cats = [
		{ 
			name: 'Tom', 
			index: 0, 
			votes: 0, 
			viewed: false, 
			imgUrl: './img/cat1.jpg' 
		},
		{ 
			name: 'Bill', 
			index: 1, 
			votes: 0, 
			viewed: false, 
			imgUrl: './img/cat2.jpg' 
		},
		{ 
			name: 'Jack', 
			index: 2, 
			votes: 0, 
			viewed: false, 
			imgUrl: './img/cat3.jpg' 
		},
		{ 
			name: 'Alex', 
			index: 3, 
			votes: 0, 
			viewed: false, 
			imgUrl: './img/cat4.jpg' 
		},
		{ 
			name: 'Anonymous', 
			index: 4, 
			votes: 0, 
			viewed: false, 
			imgUrl: './img/cat5.jpg' 
		}
	];

	// dont show anything when load page
	$scope.showCatsDiv = false;

	// display chosen cat
	$scope.showCat = function(cat) {
		$scope.currentCat = cat;
		cat.viewed = true; // this sets class 'viewed'
		// display div with current cat
		if (!$scope.showCatsDiv) $scope.showCatsDiv = true; 
	}

}]);
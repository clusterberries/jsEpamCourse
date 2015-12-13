'use strict';

var catsModule = angular.module('catsApp', []);

catsModule.controller('CatsController', ['$scope', function($scope) {
	$scope.cats = [
		{ 
			name: 'Tom', 
			index: 0, 
			votes: 1, 
			imgUrl: './img/cat1.jpg' 
		},
		{ 
			name: 'Bill', 
			index: 1, 
			votes: 0, 
			imgUrl: './img/cat2.jpg' 
		},
		{ 
			name: 'Jack', 
			index: 2, 
			votes: 10, 
			imgUrl: './img/cat3.jpg' 
		},
		{ 
			name: 'Alex', 
			index: 3, 
			votes: 3, 
			imgUrl: './img/cat4.jpg' 
		},
		{ 
			name: 'Anonymous', 
			index: 4, 
			votes: 2, 
			imgUrl: './img/cat5.jpg' 
		}
	];

	$scope.displaySearch = false; // don't enable live search by name
	$scope.sortOrder = "votes"; // votes - asc order, -votes - dsc
	$scope.minVotes = ''; // default value

	// display cats and set the search parameter
	$scope.searchCats = function () {
		$scope.displaySearch = true;
		$scope.activeSearchName = $scope.searchName;
	}

	// display cats when votes >= minVotes in input
	$scope.searchFilter = function() {
		return function (cat) {
			if ($scope.minVotes === '') return true;
	    	return cat.votes >= $scope.minVotes;
		};
	};

}]);
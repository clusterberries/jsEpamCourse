'use strict';

(function () {
	angular.module('catsApp').controller('CatsFormController', ['$scope', function($scope) {
		// clean the object and classes
		$scope.cleanForm = function () {
			$scope.newCat = {};
			$scope.catsForm.$setPristine();
			$scope.catsForm.$setUntouched();
		}

		// push the new item and clean the form
		$scope.submitForm = function () {
			$scope.cats.push($scope.newCat);
			$scope.cleanForm();
		}

	}]);
}());
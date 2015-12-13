'use strict';

(function () {
	angular.module('catsApp').controller('CatsFormController', ['$scope', '$rootScope', 'CatsService', 'LocalStorageUserService',  
		function($scope, $rootScope, CatsService, LocalStorageUserService) {
			// clean the object and classes
			$scope.cleanForm = function () {
				$scope.newCat = {};
				$scope.catsForm.$setPristine();
				$scope.catsForm.$setUntouched();
				// hide the form
				$rootScope.$state.go('cats');
			}

			// push the new item and clean the form
			$scope.submitCatForm = function () {
				var cat = $scope.newCat;
				cat.votes = 0;
				cat.id = getCatsId(); // new random id

				CatsService.addNewCat(cat, $scope.file)
					.then(function (catObj) {
						// the cat is users, he can't vote
						catObj.isUsers = true;
						$scope.cats.push(catObj);
						LocalStorageUserService.addUsersCat(catObj.id);
						$scope.cleanForm();
					}, function (error) {
						console.log('Sending new data failed: ' + error);
					});
			}

			function getCatsId () {
				return Math.floor((Math.random() * 99999) + 10000);
			}

		}
	]);
}());
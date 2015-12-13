'use strict';

(function () {
	angular.module('catsApp').controller('EditCatFormController', ['$scope', '$rootScope', 'CatsService', '$stateParams',  
		function($scope, $rootScope, CatsService, $stateParams) {
			// clean the object and classes
			$scope.cleanForm = function () {
				// $scope.cat = {};
				$scope.editCatForm.$setPristine();
				$scope.editCatForm.$setUntouched();
				// hide the form
				$rootScope.$state.go('cats');
			}

			// push the new item and clean the form
			$scope.submitEditCatForm = function () {
				console.log($scope.cat);
				CatsService.editCat($scope.cat.id, $scope.newName, $scope.file)
					.then(function (catObj) {
						// the cat is users, he can't vote
						$scope.cat.name = catObj.name;
						$scope.cat.imgUrl = catObj.imgUrl;
						// catObj.isUsers = true;
						$scope.cleanForm();
					}, function (error) {
						console.log('Editing failed: ' + error);
					});
			}

		}
	]);
}());
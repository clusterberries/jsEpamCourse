'use strict';

(function () {
	angular.module('catsApp').controller('SignUpController', ['$scope', '$rootScope', 'LocalStorageUserService', 'CatsService',  
		function($scope, $rootScope, LocalStorageUserService, CatsService) {
			$scope.newUser = {};
			// if false show error under the form 
			$scope.isFormValid = true; 
			// check if there existing profile. If true show message
			$scope.isProfileExists = LocalStorageUserService.exists();

			$scope.cleanForm = function () {
				// clean the form
				$scope.newUser = {
					name: '', 
					email: '',
					pass: '',
					passConfirm: ''
				};
				$scope.isFormValid = true;
				$scope.signUpForm.$setPristine();
				$scope.signUpForm.$setUntouched();
			}

			// write the user to the locStorage and clean the form
			$scope.submitSignUpForm = function () {
				// $scope.cats.push($scope.newCat);
				if ($scope.signUpForm.$invalid) {
					$scope.isFormValid = false;
				}
				else {
					if ($scope.isProfileExists) {
						var cats = LocalStorageUserService.getUsersCats();
						// if there are more than one cat create a queue of promises
						// without that the deletitng is incorrect
						var promiseQueue = CatsService.deleteCat(cats[0]);
						for (var i = 1; i < cats.length; ++i) {
							promiseQueue = promiseQueue.then(function () {
								return CatsService.deleteCat(cats[i]);
							});
						}
					}
					LocalStorageUserService.writeNewUser($scope.newUser);
					$scope.cleanForm();
					$rootScope.$state.go('login.signin');
				}
			}
		}
	]);
}());
'use strict';

(function () {
	angular.module('catsApp').controller('SignInController', ['$scope', '$rootScope', 'LocalStorageUserService',
		function($scope, $rootScope, LocalStorageUserService) {
			$scope.currentUser = {};
			// if false show message
			$scope.isInputDataCorrect = true;

			$scope.submitSignInForm = function() {
				// if the form is valid check username and password
				// debugger;
				if ($scope.signInForm.$valid) {
					$scope.isInputDataCorrect = LocalStorageUserService.checkPassword(
							$scope.currentUser.name, $scope.currentUser.pass);
					if ($scope.isInputDataCorrect) {
						LocalStorageUserService.logIn();
						$rootScope.$state.go('cats');
					}
				}
			}
		}
	]);
}());
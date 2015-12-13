'use strict';

(function () {
	angular.module('catsApp').controller('CatsController', ['$scope', '$rootScope', 'CatsService', 'LocalStorageUserService', 
		function($scope, $rootScope, CatsService, LocalStorageUserService) {
			$scope.cats = [];

			CatsService.getCats()
				.then(function (data) {
					$scope.user = LocalStorageUserService.getCatsUser();
					// set the voting enabled for the current user		
					CatsService.setUnvotedCats(data, $scope.user.cats, $scope.user.votes);  
				  	$scope.cats = data;
				}, function(error) {
				  	console.log('Loading data failed: ' + error);
				});

			$scope.deleteCat = function (cat) {
				CatsService.deleteCat(cat.id)
					.then(function (data) {
						LocalStorageUserService.deleteUsersCat(data.id);
						$scope.cats.splice(data.index, 1);

					}, function (error) {
						console.log('Deleting failed: ' + error);
					});
			};

			$scope.editCat = function (cat) {
				$scope.editingCat = cat.id;
				$rootScope.$state.go('cats.edit', {id: cat.id});
			}


			$scope.vote = function (votes, cat) {
				cat.votes = votes;
				CatsService.voteCat(cat)
					.then(function (data) {
						LocalStorageUserService.addVote(cat.id);
						cat.isUserVoted = true;
					}, function (error) {
						console.log('Voting failed: ' + error);
					});
			};

			$scope.logout = function () {
				LocalStorageUserService.logOut();
				$rootScope.$state.go('login.signin');
			};
			
		}
	]);
}());
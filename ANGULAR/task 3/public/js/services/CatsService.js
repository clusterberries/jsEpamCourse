'use strict';

(function () {
	angular.module('catsApp').factory('CatsService', [ '$rootScope', '$q', '$http', 'Upload',
		function($rootScope, $q, $http, Upload) {
			var cats = {
				getCats: function() {
					var deff = $q.defer();
					$http.get('/api/cats.json')
						.success(function(data) {
				            deff.resolve(data);
				        })
				        .error(function(error) {
				            deff.reject(error);
					  	});
					return deff.promise;
				},

				// if the cat is users set isUsers = true
				// if the user has voted set isUserVoted = true
				setUnvotedCats: function (cats, usersCats, usersVotes) {
					for (var j = 0; j < cats.length; ++j) {
						for (var i = 0; i < usersCats.length; ++i) {
							if (cats[j].id === usersCats[i]) {
								cats[j].isUsers = true;
							}
						}
						for (var k = 0; k < usersVotes.length; ++k) {
							if (cats[j].id === usersVotes[k]) {
								cats[j].isUserVoted = true;
							}
						}
					}
				},

				addNewCat: function (cat, img) {
					var deff = $q.defer();

					Upload.upload({
	                    url: '/api/add_cat',
	                    method: 'POST',
	                    data: cat,
	                    file: img
	                }).success(function(data) {
				            deff.resolve(data);
				        })
				        .error(function(error) {
				            deff.reject(error);
					  	});

					return deff.promise;
				},

				deleteCat: function (id) {
					var deff = $q.defer();
					$http.get('/api/delete_cat/' + id)
						.success(function(data) {
				            deff.resolve(data);
				        })
				        .error(function(error) {
				            deff.reject(error);
					  	});
					return deff.promise;
				}, 

				voteCat: function (cat) {
					var deff = $q.defer();
					$http.post('/api/vote_cat', {id: cat.id, value: cat.votes})
						.success(function(data) {
				            deff.resolve(data);
				        })
				        .error(function(error) {
				            deff.reject(error);
					  	});
					return deff.promise;
				}, 

				editCat: function (catId, name, img) {
					var deff = $q.defer();

					Upload.upload({
	                    url: '/api/edit_cat',
	                    method: 'POST',
	                    data: {
	                    	id: catId,
	                    	name: name
	                    },
	                    file: img
	                }).success(function(data) {
				            deff.resolve(data);
				        })
				        .error(function(error) {
				            deff.reject(error);
					  	});

					return deff.promise;
				}

			};

			return cats;
 		}
	]);
}());
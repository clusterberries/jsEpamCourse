'use strict';

(function () {
	angular.module('catsApp').factory('LocalStorageUserService', function() {
		var user = {
			getCatsUser: function() {
				if (this.exists()) {
					return JSON.parse(localStorage.catsUser);
				}
				else return undefined;
			},

			exists: function() {
				return !!localStorage.catsUser;
			},

			isLogged: function() {
				var user = this.getCatsUser();
				if (user !== undefined && user.isLogIn) return true;
				return false;
			},

			logIn: function() {
				var user = this.getCatsUser();
				if (user !== undefined)	{
					user.isLogIn = true;
					localStorage.catsUser = JSON.stringify(user);
				}
			},

			logOut: function() {
				var user = this.getCatsUser();
				if (user !== undefined)	{
					user.isLogIn = false;
					localStorage.catsUser = JSON.stringify(user);
				}
			},

			checkPassword: function (username, password) {
				var user = this.getCatsUser();
				if (user !== undefined && user.name === username && user.pass === password)	{
					return true;
				}
				return false;

			}, 

			writeNewUser: function (newUser) {
				newUser.cats = []; 
				newUser.votes = [];
				newUser.isLogIn = false;
				localStorage.catsUser = JSON.stringify(newUser);
			},

			addUsersCat: function (id) {
				var user = this.getCatsUser();
				if (user !== undefined)	{
					user.cats.push(id);
					localStorage.catsUser = JSON.stringify(user);
				}
			},

			deleteUsersCat: function (id) {
				var user = this.getCatsUser();
				if (user !== undefined)	{
					var cats = user.cats;
					for (var i = 0; i < cats.length; ++i) {
						if (cats[i] === id) {
							cats.splice(i, 1);
							break;
						}
					}
					localStorage.catsUser = JSON.stringify(user);
				}
			}, 

			addVote: function (id) {
				var user = this.getCatsUser();
				if (user !== undefined)	{
					user.votes.push(id);
					localStorage.catsUser = JSON.stringify(user);
				}
			}, 

			getUsersCats: function () {
				var user = this.getCatsUser();
				if (user !== undefined)	{
					return user.cats;
				}
			}
		};

		return user;
    });
}());
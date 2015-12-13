'use strict';

(function () {
	angular.module('catsApp').service('SessionService', [ '$rootScope', 'LocalStorageUserService', '$location', 
		function($rootScope, LocalStorageUserService, $location) {

		    // this.checkAccess = function(event, toState, toParams, fromState, fromParams) {
		    this.checkAccess = function(event, newUrl, oldUrl) {
		        var loggedin = LocalStorageUserService.isLogged();
		        var isLoginPage = newUrl.indexOf('login') !== -1;
		        // debugger;
		        // debugger;
				// if user is not logged in redirect to the login page
				// if (!loggedin && (toState.data.withAuth)) {
				if (!loggedin && !isLoginPage) {
					event.preventDefault();
					$rootScope.$state.go('login.signin');
				}
				else {
					// if the user is logged in redirect him to the cats page
					// if (loggedin && !toState.data.withAuth) {
					if (loggedin && isLoginPage) {
						event.preventDefault();
						$rootScope.$state.go('cats');
					}
					else {

					}

				}
		    };
		}
	]);
}());
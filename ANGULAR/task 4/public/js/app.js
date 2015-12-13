'use strict';

(function () {
	var app = angular.module('catsApp', [ 'ui.router', 'ngFileUpload' ]);

	app.constant('ROUTES', {
		LOGIN: '/login',
		SIGNIN: '/signin',
		SIGNUP: '/signup',
		CATS: '/cats',
		ADD_CAT: '/add',
		EDIT_CAT: '/edit/:id'
	});

	app.config(['$stateProvider', '$urlRouterProvider', 'ROUTES',
		function($stateProvider, $urlRouterProvider, ROUTES) { 

			$urlRouterProvider.otherwise('/login/signin');

			$stateProvider
		    .state('login', {
		        url: ROUTES.LOGIN,
 				templateUrl: "views/login.html",
			    abstract: true,
			    data: {
		            'withAuth': false // this page doesn't need authentification
		        }
		    }) 
		    .state('login.signin', {
		        url: ROUTES.SIGNIN,
 				templateUrl: "views/login.signin.html",
			    controller: 'SignInController',
			    data: {
		            'withAuth': false
		        }
		    })
		    .state('login.signup', {
		    	url: ROUTES.SIGNUP,
 				templateUrl: "views/login.signup.html",
			    controller: 'SignUpController',
			    data: {
		            'withAuth': false
		        }
			})

		    .state('cats', {
		        url: ROUTES.CATS,
		        templateUrl: "views/cats.html",
		        controller: 'CatsController',
		        data: {
		            'withAuth': true 
		        }
		    })
		    .state('cats.add', {
		        url: ROUTES.ADD_CAT,
		        templateUrl: "views/cats.add.html",
		        controller: 'CatsFormController',
		        data: {
		            'withAuth': true // this page needs authentification
		        }
		    })
		    .state('cats.edit', {
		        url: ROUTES.EDIT_CAT,
		        views: {
		        	'editCat': {
		        		templateUrl: "views/cats.edit.html",
		        		controller: 'EditCatFormController',
				        data: {
				            'withAuth': true // this page needs authentification
				        }
		        	}
		        }
		        
		    });
		}
	]);

	app.run([ '$rootScope', '$state', '$stateParams', 'SessionService',
	    function ($rootScope, $state, $stateParams, SessionService) {
		    $rootScope.$state = $state;
		    $rootScope.$stateParams = $stateParams;

		    // check athentification every time the state changes
		    $rootScope.$on('$locationChangeStart', SessionService.checkAccess);
	    }
	])


}()); 
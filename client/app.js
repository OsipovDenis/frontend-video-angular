'use strict';

/* STYLES */
import 'static/css/style.scss';

/* JS */
import './login';
import './header';
import './table';
import './addItem';
import './editItem';


const video = angular.module('video',[
	'ui.router',
	'angular-storage',
	'login',
	'header',
	'table',
	'addItem',
	'editItem'
]);

video.config(function($httpProvider,$stateProvider,$urlRouterProvider,storeProvider) {

	$urlRouterProvider.otherwise('/login');

	storeProvider.setStore('sessionStorage');

});

video.run(function($rootScope,$state,LoginService) {
	
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, error) {
		
		if(toState.name !== 'login' && !LoginService.isAuthorized()) {
			event.preventDefault();
			alert('Please, login');
			$state.go('login');
		}
		else if(toState.name == 'login' && LoginService.isAuthorized()) {
			event.preventDefault();
			$state.go('table');
		}
	});

});
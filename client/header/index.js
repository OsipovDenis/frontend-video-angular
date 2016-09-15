'use strict';

const mainHeaderModule = angular.module('header', []);

mainHeaderModule.config(($stateProvider) => {
	
	$stateProvider
		.state('mainHeader', {
			abstract: true,
			url: '',
			template: '<main-header></main-header>'
		})
});

// Хэдер
import headerDirective from './headerDirective';
// Юзеринфо
import userInfo from './userInfoDirective';

// Хэдер
mainHeaderModule.directive('mainHeader', headerDirective);
// Юзеринфо
mainHeaderModule.directive('userInfo', userInfo);

export default mainHeaderModule;
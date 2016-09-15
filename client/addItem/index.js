'use strict';

const addItem = angular.module('addItem', []);

addItem.config(($stateProvider) => {
	
	$stateProvider
		.state('addItem', {
			parent: 'mainHeader',
			url: '/items/add',
			template: '<add-item></add-item>'
		})
});

import addItemDirective from './addItemDirective';

addItem.directive('addItem', addItemDirective);

export default addItem;
'use strict';

const table = angular.module('table', []);

table.config(function($stateProvider){
	
	$stateProvider
		.state('table', {
			parent: 'mainHeader',
			url: '/items',
			template: '<table-content></table-content>'
		})
});

import tableDirective from './tableDirective';
import tableController from './tableController';
import dataService from './dataService';

table.directive('tableContent', tableDirective);
table.service('dataService', dataService);
table.controller('tableController', tableController);

export default table;
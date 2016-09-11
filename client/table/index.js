'use strict';

const table = angular.module('table', []);

table.config(($stateProvider) => {
	
	$stateProvider
		.state('mainHeader', {
			abstract: true,
			url: '',
			template: '<main-header></main-header>'
		})
		.state('table', {
			parent: 'mainHeader',
			url: '/table',
			template: '<table-content></table-content>'
		})
		.state('addItem', {
			parent: 'mainHeader',
			url: '/table/add',
			template: '<add-item></add-item>'
		})
		.state('editItem', {
			parent: 'mainHeader',
			url: '/table/:video_id',
			template: '<edit-item></edit-item>'
		})
});

// Хэдер
import headerDirective from './headerDirective';

// Таблица
import tableDirective from './tableDirective';
import tableService from './tableService';
import tableController from './tableController';

// Форма добавления видео
import addItemDirective from './addItemDirective';

// Форма редактирования видео
import editItemDirective from './editItemDirective';

// Хэдер
table.directive('mainHeader', headerDirective);

// Таблица
table.directive('tableContent', tableDirective);
table.service('tableService', tableService);
table.controller('tableController', tableController);

// Форма добавления видео
table.directive('addItem', addItemDirective);

// Форма редактирования видео
table.directive('editItem', editItemDirective);

export default table;
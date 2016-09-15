'use strict';

const editItem = angular.module('editItem', []);

editItem.config(($stateProvider) => {
	
	$stateProvider
		.state('editItem', {
			parent: 'mainHeader',
			url: '/items/edit/:video_id',
			template: '<edit-item></edit-item>'
		})
});

import editItemDirective from './editItemDirective';

editItem.directive('editItem', editItemDirective);

export default editItem;
'use strict';

import editItemTmpl from './views/editItem.tpl.html';
import editItemController from './editItemController';

const editItemForm = function() {
	return {
		restrict: 'E',
		template: editItemTmpl,
		controller: editItemController,
		controllerAs: 'editItemCtrl'
	}
};

export default editItemForm;
'use strict';

import addItemTmpl from './views/addItem.tpl.html';
import addItemController from './addItemController';

const addItemForm = function() {
	return {
		restrict: 'E',
		template: addItemTmpl,
		controller: addItemController,
		controllerAs: 'addItemCtrl'
	}
};

export default addItemForm;
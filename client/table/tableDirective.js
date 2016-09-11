'use strict';

import tableTmpl from './views/table.tpl.html';
import tableController from './tableController';

const table = function() {
	return {
		restrict: 'E',
		template: tableTmpl,
		controller: tableController,
		controllerAs: 'tableCtrl'
	}
};

export default table;
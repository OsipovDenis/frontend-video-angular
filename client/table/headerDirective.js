'use strict';

import headerTmpl from './views/header.tpl.html';

const header = function() {
	return {
		restrict: 'E',
		template: headerTmpl
	}
};

export default header;
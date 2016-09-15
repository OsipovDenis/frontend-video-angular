'use strict';

import headerTmpl from './views/header.tpl.html';

const headerDirective = function() {
	return {
		restrict: 'E',
		template: headerTmpl
	}
};

export default headerDirective;
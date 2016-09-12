'use strict';

import userInfoTmpl from './views/userInfo.tpl.html';
import userInfoController from './userInfoController';

const userInfo = function(){
	return {
		restrict: 'E',
		template: userInfoTmpl,
		controller: userInfoController,
		controllerAs: 'userCtrl'
	}
};

export default userInfo;
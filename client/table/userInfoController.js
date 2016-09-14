'use strict';

const userInfoController =  function(store, LoginService){	
	this.user = store.get('user');

	this.logout = function(){
		LoginService.logout();
	}
};

export default userInfoController;
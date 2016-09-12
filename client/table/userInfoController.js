'use strict';

const userInfoController =  function(store, LoginService){	
	this.user = store.get('user');
	console.log();

	this.logout = function(){
		LoginService.logout();
	}
};

export default userInfoController;
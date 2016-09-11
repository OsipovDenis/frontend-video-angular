'use strict';

const LoginService = function(store) {

	var authStatus = false;

	this.checkCredits = (credits) => {
		if(credits && (credits.name && credits.password) && (credits.name == '1' && credits.password == '1')) {
			authStatus = true;
		} else {
			authStatus = false;
		}
		store.set('user',{ username:credits.name });
		
		return authStatus;
	}

	this.isAuthorized = () => {
		var user = store.get('user');
		if(user)
			return true;
		else
			return false;
	}

	this.logout = () => {
		store.remove('user');
	}

}

export default LoginService;
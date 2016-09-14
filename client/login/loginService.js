'use strict';

const LoginService = function(store) {

	var authStatus = false;

	this.checkCredits = (credits) => {
		if(credits && (credits.name && credits.password) && (credits.name == 'admin' && credits.password == 'password')) {
			authStatus = true;
			store.set('user',{ username:credits.name });
		} else {
			authStatus = false;
		}
		
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
		// console.log(store.get('user'));
		store.remove('user');
		// console.log(store.get('user'));
	}

}

export default LoginService;
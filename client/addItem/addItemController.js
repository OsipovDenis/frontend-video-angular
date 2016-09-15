'use strict';

const addItemController = function($state, dataService) {
	var self = this;

	this.item = null;
	this.users = [
		{ 'name' :'John' },
		{ 'name' : 'Anton' },
		{ 'name' : 'Wazgen' },
		{ 'name' : 'Boris' },
		{ 'name' : 'Jack' }
	];

	this.addItem = function(){
		self.item.archived = false;

		dataService.postVideo(this.item)
			.then((data) => {
				if (data.status === 200) {
					self.item = null;
					$state.go('table');
				} else {
					alert('ooops! Something wrong! Try again or later!');
				}
			})
	}

	this.cancel = function() {
		$state.go('table');
	}
};

export default addItemController;
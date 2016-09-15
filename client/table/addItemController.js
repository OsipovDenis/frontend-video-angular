'use strict';

const addItemController = function($state, tableService) {
	var self = this;
	// console.log('Hello from addItemController!');
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
		console.log(self.item);
		tableService.postVideo(this.item)
			.then((data) => {
				if ( data.status === 200 ) {
					self.item = null;
					$state.go('table');
				} else {
					alert('ooops! Something wrong! Try again or later!');
				}
			})
			.catch((error) => {
				console.log(error);
			});

	}

	this.cancel = function() {
		$state.go('table');
	}
};

export default addItemController;
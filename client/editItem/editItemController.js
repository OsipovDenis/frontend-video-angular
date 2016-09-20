'use strict';

const editItemController = function($state, $stateParams, dataService) {
	var self = this;

	this.id = null;
	this.item = null;
	
	this.users = [
		{ 'name' :'John' },
		{ 'name' : 'Anton' },
		{ 'name' : 'Wazgen' },
		{ 'name' : 'Boris' },
		{ 'name' : 'Jack' }
	];

	this.getItem = function(){
		self.id = $stateParams.video_id;		
		dataService.getVideo(self.id).then((item) => {
			self.item = item;
		});

	}

	this.updateItem = function(){
		dataService.updateVideo(self.id, self.item)
		.then(function() {
			self.id = null;
			self.item = null;
			$state.go('table');
		});
	}

	this.cancel = function() {
		self.id = null;
		self.item = null;
		$state.go('table');
	}

	this.getItem();
};

export default editItemController;
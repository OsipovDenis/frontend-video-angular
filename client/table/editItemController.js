'use strict';

const editItemController = function($state, $stateParams, tableService) {
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
		// console.log(this.id);
		
		tableService.getVideo(self.id).then((item)=>{
			self.item = item;
		});

	}

	this.updateItem = function(){
		tableService.updateVideo(self.id, self.item)
		.then((resp)=>{
			if(resp.status === 200) {
				self.id = null;
				self.item = null;
				$state.go('table');
			} else {
				alert('ooops! Something wrong! Try update VIDEO again or later!');
			}
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
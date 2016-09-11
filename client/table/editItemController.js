'use strict';

const editItemController = function($state, $stateParams, tableService) {
	
	this.id = null;
	this.video = null;
	// console.log('Hello from editItemController!');
	// console.log($stateParams.video_id);

	this.getUser = function(){
		this.id = $stateParams.video_id;
		
		tableService.getVideo(this.id).then((video)=>{
			this.video = video;
		});

	}

	this.updateItem = function(){
		tableService.updateVideo(this.id, this.video)
		.then((resp)=>{
			if(resp.status === 200) {
				this.id = null;
				this.video = null;
				$state.go('table');
			} else {
				alert('ooops! Something wrong! Try update VIDEO again or later!');
			}
		});
		
	}

	this.cancel = function() {
		this.id = null;
		this.video = null;
		$state.go('table');
	}

	this.getUser();
};

export default editItemController;
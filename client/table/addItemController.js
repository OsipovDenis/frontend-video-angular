'use strict';

const addItemController = function($state, tableService) {
	
	console.log('Hello from addItemController!');
	this.item = null;

	this.addItem = function(){
		this.item.archived = false;
		
		tableService.postVideo(this.item)
			.then((data) => {
				if ( data.status === 200 ) {
					this.item = null;
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
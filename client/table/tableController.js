'use strict';

const tableController = function($state, $window, tableService) {
	var self = this;

	var promiseObj = tableService.getAllVideos();

	promiseObj.then((resp) => {
		this.items = resp.data;
	});

	this.updateTable = function(){
		var promiseObj = tableService.getAllVideos();

		promiseObj.then((resp) => {
			this.items = resp.data;
			// console.log(this.items);
		});		
	} 
	
	this.addNew = function() {
		console.log('add new');
		$state.go('addItem');
	}

	this.edit = function(item, id) {
		$state.go('editItem',{ video_id: id });
	}

	this.delete = function(item, id) {

		if( $window.confirm('Удалить?') ){

			tableService.deleteVideo(id)
				.then( (data) => {
					if(data.status === 200) {
						console.log('Удалено');
						self.updateTable();
					} else {
						alert('ooops! Something wrong! Try again or later!');
					}
				})
				.catch((error) => {
					console.log(error);
				});
			
		}
	}
};

export default tableController;
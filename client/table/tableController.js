'use strict';

const tableController = function($state, $window, tableService) {
	var self = this;

	this.sortType     = 'id'; // default sort type
  this.sortReverse  = false; // default sort order
  this.searchTitle   = ''; // default search filter

	this.updateTable = function(){
		var promiseObj = tableService.getAllVideos();

		promiseObj.then((data) => {
			this.items = data;
			console.log(this.items);
		});		
	} 
	
	this.addNew = function() {
		console.log('add new');
		$state.go('addItem');
	}

	this.edit = function(item) {
		$state.go('editItem',{ video_id: item.id });
	}

	this.delete = function(item) {

		if( $window.confirm('Удалить?') ){

			tableService.deleteVideo(item.id)
				.then( (data) => {
					if(data.status === 200) {
						console.log('Удалено');
						self.updateTable();
					} else {
						alert('ooops! Something wrong! Try again or later!');
					}
				});
		}
	}

	this.sortBy = function(rule) {
		angular.sort
	}

	this.updateTable();
};

export default tableController;
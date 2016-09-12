'use strict';

const tableController = function($state, $window, tableService) {
	var self = this;

	this.sortType     = 'id'; // default sort type
  this.sortReverse  = false; // default sort order
  this.searchTitle   = ''; // default search filter

  this.disableSelectAllVideos = false; // helper for ng-if input 'select all videos'

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

	this.selectAllVideoForArchive = function() {
		this.items.map(function(item){
			if( !item.archived ){
				item.selectedToArchive = self.archiveAllVideo;
			}
		})
	}

	this.archiveAllSelected = function(){
		var arrToPushItems = [];
		self.items.map(function(item){
			if(item.selectedToArchive){
				if(!item.archived){
					item.archived = true;
					arrToPushItems.push(item);
				}
			}
		});

		helperForSelectVideos();
		tableService.toUpdateSomeVideos(arrToPushItems)
		.then((response) => {
			 console.log('some videos update!');
		})
		.catch( (error) => {
			alert('ooops! Something wrong! Try again or later!' + error);
		});
	}

	this.unarchiveVideo = function(item){
		item.archived = false;
		item.selectedToArchive = false;
		helperForSelectVideos();
		tableService.updateVideo(item.id, item)
		.then((response) => {
			 console.log('video unarchived!');
		})
		.catch( (error) => {
			alert('ooops! Something wrong! Try again or later!' + error);
		});
	}

	// хэлпер для input'a, который выбирает всу input'ы
	function helperForSelectVideos(counter){
		var counter = 0,
				itemslength = self.items.length;

		self.items.forEach(function(item){
			if(item.archived){
				counter++;
			}
		});

		if ( counter === itemslength ){
			self.disableSelectAllVideos = true;
		} else {
			self.disableSelectAllVideos = false;
			self.archiveAllVideo = false;
		}
	}


	this.updateTable();
};

export default tableController;
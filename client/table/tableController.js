'use strict';

const tableController = function($state, $window, dataService) {
	var self = this;

	this.sortType     = 'id'; // default sort type
  this.sortReverse  = false; // default sort order
  this.searchTitle   = ''; // default search filter

  this.disableSelectAllVideos = false; // helper for ng-if input 'select all videos'
  this.disablBtnArchiveSelected = false; // helper for button 'Archive Selected'

	this.updateTable = function() {
		var promiseObj = dataService.getAllVideos();

		promiseObj.then((data) => {
			self.items = data;
			helperForSelectVideos();
			self.helperForBtnArchiveSelected();		
		});
	} 
	
	this.addNew = function() {
		$state.go('addItem');
	}

	this.edit = function(item) {
		$state.go('editItem', { video_id: item.id });
	}

	this.delete = function(item) {
		if( $window.confirm('Удалить?') ){
			dataService.deleteVideo(item.id)
				.then((data) => {
					if( data.status === 200 ) {
						self.updateTable();
					} else {
						$window.alert('ooops! Something wrong! Try again or later!');
					}
				});
		}
	}

	// Function for select all unarchive videos
	this.selectAllVideoForArchive = function() {
		this.items.forEach(function(item){
			if( !item.archived ){
				item.selectedToArchive = self.archiveAllVideo;
			}
		});
		self.helperForBtnArchiveSelected();
	}

	// Function for archive all selected videos
	this.archiveAllSelected = function(){
		var arrToPushItems = [];
		self.items.forEach(function(item){
			if( item.selectedToArchive && !item.archived){
					item.archived = true;
					arrToPushItems.push(item);
			}
		});

		if ( !!arrToPushItems.length ){
			dataService.toUpdateSomeVideos(arrToPushItems)
			.then((response) => {
				helperForSelectVideos();
				self.helperForBtnArchiveSelected();
			})
			.catch((error) => {
				$window.alert('ooops! Something wrong! Try again or later!' + error);
			});
		}
	}
	
	// Function for unarchive video
	this.unarchiveVideo = function(item){
		item.archived = false;
		item.selectedToArchive = false;

		dataService.updateVideo(item.id, item)
		.then((response) => {
			 helperForSelectVideos();
			 self.helperForBtnArchiveSelected();
		})
		.catch((error) => {
			item.archived = true;
			item.selectedToArchive = true;
			$window.alert('ooops! Something wrong! Try again or later!' + error);
		});
	}

	// Helper for view button 'Archive Selected' 
	this.helperForBtnArchiveSelected = function(){
		// counter for selected for archiving video
		// secondCounter of archived video
		var counter = 0,
				secondCounter = 0,
				itemslength = self.items.length;

				self.items.forEach(function(item){
					if( item.archived ){
						secondCounter++;
						counter++;
					}else if( item.selectedToArchive ) {
						counter++;
					}
				});

				if(counter > secondCounter){
					self.disablBtnArchiveSelected= false;
				} else {
					self.disablBtnArchiveSelected= true;
				}
	}

	// Helper for input, which select all videos
	function helperForSelectVideos(){
		// counter of archived video
		var counter = 0,
				itemslength = self.items.length;

		self.items.forEach(function(item){
			if( item.archived ){
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
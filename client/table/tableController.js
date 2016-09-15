'use strict';

const tableController = function($state, $window, tableService) {
	var self = this;

	this.sortType     = 'id'; // default sort type
  this.sortReverse  = false; // default sort order
  this.searchTitle   = ''; // default search filter

  this.disableSelectAllVideos = false; // helper for ng-if input 'select all videos'
  this.disablBtnArchiveSelected = false; // helper for button 'Archive Selected'

	this.updateTable = function(){
		var promiseObj = tableService.getAllVideos();

		promiseObj.then((data) => {
			self.items = data;
			helperForSelectVideos();
			self.helperForBtnArchiveSelected();		
		});
	} 
	
	this.addNew = function() {
		console.log('add new');
		$state.go('addItem');
	}

	this.edit = function(item) {
		// console.log(item);
		$state.go('editItem',{ video_id: item.id });
	}

	this.delete = function(item) {
		if( $window.confirm('Удалить?') ){
			tableService.deleteVideo(item.id)
				.then( (data) => {
					if(data.status === 200) {
						self.updateTable();
					} else {
						alert('ooops! Something wrong! Try again or later!');
					}
				});
		}
	}

	// Функция для выбора всех незаархивированных видео
	this.selectAllVideoForArchive = function() {
		this.items.map(function(item){
			if( !item.archived ){
				item.selectedToArchive = self.archiveAllVideo;
			}
		});
		self.helperForBtnArchiveSelected();
	}

	// Функция для архивации всех выбранных видео
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

		if ( !!arrToPushItems.length ){
			tableService.toUpdateSomeVideos(arrToPushItems)
			.then((response) => {

				helperForSelectVideos();
				self.helperForBtnArchiveSelected();
			})
			.catch( (error) => {
				alert('ooops! Something wrong! Try again or later!' + error);
			});
		}
	}
	
	// Функция для разархивации видео 
	this.unarchiveVideo = function(item){
		item.archived = false;
		item.selectedToArchive = false;

		tableService.updateVideo(item.id, item)
		.then((response) => {
			 console.log('video unarchived!');
			 helperForSelectVideos();
			 self.helperForBtnArchiveSelected();
		})
		.catch( (error) => {
			item.archived = true;
			item.selectedToArchive = true;
			alert('ooops! Something wrong! Try again or later!' + error);
		});
	}

	// Хэлпер для отображения кнопки 'Archive Selected' 
	this.helperForBtnArchiveSelected = function(){
		// 1 счётчик для подсчета выбранных для архивации видео.
		// 2 счётчик для подсчёта архивированных видео.
		var counter = 0,
				secondCounter = 0,
				itemslength = self.items.length;

				self.items.forEach(function(item){
					if(item.archived){
						secondCounter++;
						counter++;
					}else if(item.selectedToArchive) {
						counter++;
					}
				});

				if(counter > secondCounter){
					self.disablBtnArchiveSelected= false;
				} else {
					self.disablBtnArchiveSelected= true;
				}
	}

	// Хэлпер для input'a, который выбирает все input'ы
	function helperForSelectVideos(){
		// счётчик для подсчёта заархивированных видео.
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
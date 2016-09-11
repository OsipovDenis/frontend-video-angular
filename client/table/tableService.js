'use strict';

const tableService = function($http, $q) {

  var service = {
    getAllVideos: function() {
      return $http.get('https://angular-video-service.firebaseio.com/videos.json').then(function(data) {
        return data;
      });
    },
    
    getVideo: function(id) {
      return service.getAllVideos()
              .then( (resp) => {
                return resp;
              })
              .then( (resp) => {
                return resp.data[id];
              });
    },

    postVideo: function(item) {
      return  $http.post('https://angular-video-service.firebaseio.com/videos.json', item)
              .then( (data) => {
                return $q.when(data);
              })
              .catch( (status) => {
                console.warn('Потеря связи с сервером!', status);
              })
    },

    deleteVideo: function(id) {
      return $http.delete('https://angular-video-service.firebaseio.com/videos/' + id + '.json')
              .then( (data) => {
                return $q.when(data);
              })
              .catch( (status) => {
                console.warn('Потеря связи с сервером!', status);
              })
    },

    updateVideo: function(id, item){
      return $http.patch('https://angular-video-service.firebaseio.com/videos/' + id + '.json', item)
              .then( (data) => {
                return $q.when(data);
              })
              .catch( (status) => {
                console.warn('Потеря связи с сервером!', status);
              })
    }

  }
  
  return service;
};

export default tableService;
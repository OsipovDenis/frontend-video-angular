'use strict';

const dataService = function($http, $q, $window) {
  var urlConst = 'https://angular-video-service.firebaseio.com/videos',
      service = {
        getAllVideos: function() {
          return $http.get(urlConst + '.json')
                  .then(function(response) {
                    var data = response.data;
                    // transform response to array
                    var reformattedArray = Object.keys(data).map(function(key) {
                      return angular.merge(data[key], {id: key});
                    });
                    return $q.when(reformattedArray)
                  })
                  .catch(function(error) {
                    $window.alert('OOps something wrong! Try to add new course later.')
                    console.warn('Потеря связи с сервером!', error);
                  });
        },
        getVideo: function(id) {
          return  $http.get(urlConst + '.json')
                  .then(function(response) {
                    return response.data[id];
                  })
                  .catch(function(error) {
                    $window.alert('OOps something wrong! Try to add new course later.')
                    console.warn('Потеря связи с сервером!', error);
                  });
        },
        postVideo: function(item) {
          return  $http.post(urlConst + '.json', item)
                  .catch(function(error) {
                    $window.alert('OOps something wrong! Try to add new course later.')
                    console.warn('Потеря связи с сервером!', error);
                  });
        },
        deleteVideo: function(id) {
          return $http.delete(urlConst + '/' + id + '.json')
                  .catch(function(error) {
                    $window.alert('OOps something wrong! Try to add new course later.')
                    console.warn('Потеря связи с сервером!', error);
                  })
        },
        updateVideo: function(id, item){
          return $http.patch(urlConst + '/' + id + '.json', item)
                  .catch(function(error) {
                    $window.alert('OOps something wrong! Try to add new course later.')
                    console.warn('Потеря связи с сервером!', error);
                  })
        },
        toUpdateSomeVideos: function(arrToPushItems){
          var arrForUpdate = [];
          arrToPushItems.forEach((item) => {
            arrForUpdate.push(service.updateVideo(item.id, item));
          });
          return $q.all(arrForUpdate)
                  .catch(function(error) {
                    $window.alert('OOps something wrong! Try to add new course later.')
                    console.warn('Потеря связи с сервером!', error);
                  });
        }
      }
  
  return service;
};

export default dataService;
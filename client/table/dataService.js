'use strict';

const dataService = function($http, $q) {
  var urlConst = 'https://angular-video-service.firebaseio.com/videos',
      service = {
        getAllVideos: function() {
          return $http.get(urlConst + '.json')
                  .then((response) => {
                    return response;
                  })
                  .then((response) => {
                    var data = response.data;
                    // transform response to array
                    var reformattedArray = Object.keys(data).map(function(key) {
                      var tempObj = data[key];
                          tempObj.id = key;
                      return tempObj;
                    });
                    return $q.when(reformattedArray)
                  })
                  .catch((status) => {
                    console.warn('Потеря связи с сервером!', status);
                  });
        },
        getVideo: function(id) {
          return  $http.get(urlConst + '.json')
                  .then((response) => {
                    return response;
                  })
                  .then((resp) => {
                    return resp.data[id];
                  });
        },
        postVideo: function(item) {
          return  $http.post(urlConst + '.json', item)
                  .then((data) => {
                    return $q.when(data);
                  })
                  .catch((status) => {
                    console.warn('Потеря связи с сервером!', status);
                  })
        },
        deleteVideo: function(id) {
          return $http.delete(urlConst + '/' + id + '.json')
                  .then((data) => {
                    return $q.when(data);
                  })
                  .catch((status) => {
                    console.warn('Потеря связи с сервером!', status);
                  })
        },
        updateVideo: function(id, item){
          return $http.patch(urlConst + '/' + id + '.json', item)
                  .then((data) => {
                    return $q.when(data);
                  })
                  .catch((status) => {
                    console.warn('Потеря связи с сервером!', status);
                  })
        },
        toUpdateSomeVideos: function(arrToPushItems){
          var arrForUpdate = [];
          arrToPushItems.forEach((item) => {
            arrForUpdate.push(service.updateVideo(item.id, item));
          });
          return $q.all(arrForUpdate)
                  .then((response) => {
                    return $q.when(response)
                  })
                  .catch((status) => {
                    console.warn('Потеря связи с сервером!', status);
                  });
        }

      }
  
  return service;
};

export default dataService;
angular.module('mobile-chat-factories', [])

.factory('Camera', ['$q', function($q) {
  return {
    takePhoto: function() {
      var options = {
        destinationType: navigator.camera.DestinationType.DATA_URL,
        quality: 75,
        targetWidth: 320,
        targetHeight: 320,
        saveToPhotoAlbum: false
      };

      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  };
}]);

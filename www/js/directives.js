angular.module('mobile-chat-directives', [])

.directive('camera', ['$rootScope', 'USER', 'Camera', function($rootScope, USER, Camera) {
  return {
    scope: {
    },
    replace: true,
    restrict: 'AE',
    link: function(scope, element, attributes) {
      scope.takePhoto = function() {
        Camera.takePhoto().then(function(imageData) {
          var dataUrl = 'data:image/jpeg;base64,' + imageData;
          var data = {
            image: dataUrl,
            sender: USER.name
          };

          $rootScope.$broadcast('event:photo:taken', data);
        });
      };
    },
    templateUrl: 'views/camera.html'
  }
}]);

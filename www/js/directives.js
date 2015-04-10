angular.module('mobile-chat-directives', [])

.directive('camera', ['$rootScope', 'USER', 'Camera', function($rootScope, USER, Camera) {
  return {
    scope: {
    },
    replace: true,
    restrict: 'AE',
    link: function(scope, element, attributes) {
      scope.takePhoto = function() {
        Camera.takePhoto().then(function(file) {
          var fileReader = new FileReader();

          fileReader.onload = function(event) {
            var data = {
              image: event.target.result,
              sender: USER.name
            };

            $rootScope.$broadcast('event:photo:taken', data);
          };

          fileReader.readAsDataURL(file);
        });
      };
    },
    templateUrl: 'views/camera.html'
  }
}]);

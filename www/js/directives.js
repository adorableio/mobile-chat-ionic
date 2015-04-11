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
}])

.directive('chatList', ['$rootScope', 'SOCKET_URL', function($rootScope, SOCKET_URL) {
  return {
    replace: true,
    restrict: 'AE',
    scope:{
    },
    link: function(scope, element, attributes) {
      var socket = io(SOCKET_URL);

      scope.messages = [];

      socket.on('event:incoming:image', function(data) {
        scope.$apply(function() {
          scope.messages.unshift(data);
        });
      });

      $rootScope.$on('event:photo:taken', function(event, data) {
        socket.emit('event:new:image', data);

        scope.messages.unshift(data);
      });
    },
    templateUrl:'views/chat-list.html'
  }
}]);

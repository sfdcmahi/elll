angular.module('projectElll.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('SignupCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('VerificationCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})


.controller('EmergencyContactsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})


.controller('inviteCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

//for Home and SOS controller
.controller('SOSCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('GrievanceCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})



.controller('HeatmapCtrl', function($scope) {
 
})

.controller('SavevictimCtrl', function($scope) {
 
})

.controller('ProfileCtrl', function($scope) {
 
})
.controller('SettingsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('NotificationCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

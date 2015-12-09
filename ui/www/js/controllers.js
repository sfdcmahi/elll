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

.controller('SignupCtrl', function($scope, $stateParams, $state, Chats, $localstorage, $ionicPopup) {
    //$scope.chat = Chats.get($stateParams.chatId);
    val = $localstorage.get("registration");
    if(val != undefined){
        val = $localstorage.get("verification");
        if(val != undefined){
            $state.go('elll.dashbord');
        }else{
            $state.go('elll.verification');
        }
    }
    
    $scope.reg = {};
    $scope.reg.name = $localstorage.get('name');
    $scope.reg.mobileno = $localstorage.get('mobileno');
    $scope.reg.email = $localstorage.get('email');
    
    $scope.register = function(){
           if($scope.reg.name == undefined || $scope.reg.mobileno == undefined){
               $ionicPopup.alert({
                title: 'Registration failed',
                template: 'Please fill all mandatory fields !'
               });
               
               return;            
           }
           
          $localstorage.set('name', $scope.reg.name);
          $localstorage.set('mobileno', $scope.reg.mobileno);
          if($scope.reg.email != undefined){
            $localstorage.set('email', $scope.reg.email);
          }
          //TODO: call rest API for registration
          $ionicPopup.alert({
                title: 'Registration Successful',
                template: 'Please use OTP receieved as SMS to verify your account!'
               });
          $localstorage.set('registration', 'done');
          $state.go('elll.verification');
    };
})

.controller('VerificationCtrl', function($scope, $ionicPopup, $localstorage, $state) {
    $scope.verification = {};
    $scope.verify = function(){
        if($scope.verification.otp == undefined){
            $ionicPopup.alert({
                title: 'Verification failed',
                template: 'Please enter OTP and retry!'
               });
               return;
        }
        //TODO: calls rest API for verification
        $localstorage.set('verification', 'done');
        $state.go('elll.dashboard');
    }
    
    $scope.resend = function(){
        $ionicPopup.alert({
                title: 'Resend OTP',
                template: 'You will receive new OTP as SMS !'
               });
    }
})


.controller('EmergencyContactsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})


.controller('inviteCtrl', function($scope) {
  $scope.getMobileContacts = function() {
	$scope.phoneContacts = [];

    function SuccessCallBack(contacts) {
      for (var i = 0; i < contacts.length; i++) {
        var contact = contacts[i];
        $scope.phoneContacts.push(contact);
      }
    };
	function ErrorCallBack(exception) {
		alert(exception);
    };
	var options = {'multiple':true};
	$cordovaContacts.find(options).then(SuccessCallBack, ErrorCallBack);
	
  };
})

//for Home and SOS controller
.controller('SOSCtrl', function($scope, $ionicHistory) {
    $ionicHistory.clearHistory();
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

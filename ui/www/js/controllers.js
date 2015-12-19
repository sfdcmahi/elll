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
    reg = $localstorage.get("registration");
    ver = $localstorage.get("verification");
    ec = $localstorage.get("emergencycontacts");
    invf = $localstorage.get("invite");
    
    if(invf != undefined){
        $state.go('elll.dashboard');
    }else if(ec != undefined){
        $state.go('elll.invite');
    }else if(ver != undefined){
        $state.go('elll.emergencycontacts');
    }else if(reg != undefined){
        $state.go('elll.verification');
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
        $state.go('elll.emergencycontacts');
    }
    
    $scope.resend = function(){
        $ionicPopup.alert({
                title: 'Resend OTP',
                template: 'You will receive new OTP as SMS !'
               });
    }
})


.controller('EmergencyContactsCtrl', function($scope,ContactsService,$ionicPlatform, $localstorage, $state,$filter,$ionicPopup,$rootScope) {
  $scope.phoneContacts = [{"displayName"   : "Mahesh",
			"emails"        : [],
			"phones"        :  [],
			"photos"        : [],
			"checked"		:false}];
			
  $scope.getMobileContacts = function() {
	if(window.cordova){
		$rootScope.show();
	ContactsService.AllContacts().then(
                function(contact) {
                    $scope.phoneContacts=contact;                 
					$rootScope.hide();
                },
                function(failure) {
                    console.log(" Failed to fetch a Contacts");
					$rootScope.hide();
                }
            );
	}
  
  
	
  };
   ///if(window.cordova) 
		//$scope.getMobileContacts();
  
   $scope.addEmergencyContacts = function(){
	  var selectedContacts=$filter('filter')($scope.phoneContacts,{checked:true})
	  if(selectedContacts.length>0){
		   $state.go("elll.invite");
		   
	  }
	  else{
		  $ionicPopup.alert({
                template: 'Please select minimum 1 contact'
            });
	  }
     // $localstorage.set("emergencycontacts", "Done")
      
  };
})



.controller('inviteCtrl', function($scope, $state, $localstorage,$ionicPlatform,ContactsService,$rootScope) {
  
  $scope.phoneContacts = [];
  $scope.getMobileContacts = function() {
	if(window.cordova){
		$rootScope.show();
	ContactsService.AllContacts().then(
                function(contact) {
                    $scope.phoneContacts=contact;                 
					$rootScope.hide();
                },
                function(failure) {
                    console.log(" Failed to fetch a contacts");
					$rootScope.hide();
                }
            );
	}
  
	
  };
 //if(window.cordova) 
	//$scope.getMobileContacts();
  $scope.skip = function(){
      $localstorage.set("invite", "Done")
        $state.go("elll.dashboard");
  };
   $scope.continue = function(){
      $localstorage.set("invite", "Done")
        $state.go("elll.dashboard");
  };
    
})

//for Home and SOS controller
.controller('SOSCtrl', function($scope, $ionicHistory, $cordovaGeolocation, $ionicPopover, $timeout) {
    $ionicHistory.clearHistory();
    $scope.onHold = function($event){
         var posOptions = {timeout: 20000, enableHighAccuracy: true};
         $cordovaGeolocation.getCurrentPosition(posOptions)
            .then(function (position) {
                var lat  = position.coords.latitude
                var long = position.coords.longitude
                console.log('Got location (lat,long) : (' + lat + ',' + long + ')');
                var template = '<ion-popover-view><ion-header-bar> <h1 class="title">SOS Generated</h1> </ion-header-bar> <ion-content> (lat - long)  = (' + lat + ' - ' + long + ')</ion-content></ion-popover-view>';
                $scope.popover = $ionicPopover.fromTemplate(template, {
                    scope: $scope
                });
                
               $scope.popover.show($event);
                
               $timeout(function(){$scope.popover.hide()}, 3000);
                
             }, function(err) {
                   // error
                   console.log("Failed to get geo location");
             });
         };
})
 
.controller('GrievanceCtrl', function($scope) {
  $scope.destination = [12.971352, 77.604855];
  $scope.source = [12.967796, 77.606870]
  $scope.settings = {
    enableFriends: true
  };
}) 


.controller('HeatmapCtrl', function($scope, $state, $cordovaGeolocation, NgMap) {
   
   var heatmap, vm = this;
    NgMap.getMap().then(function(map) {
      vm.map = map;
      heatmap = vm.map.heatmapLayers.foo;
    });

  vm.toggleHeatmap= function(event) {
      heatmap.setMap(heatmap.getMap() ? null : vm.map);
    };

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

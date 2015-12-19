angular.module('projectElll.controllers', [])

.controller('DashCtrl', function($scope) {})



.controller('SignupCtrl', function($scope, $stateParams, $state, $localstorage, $ionicPopup,RESTServices) {

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
    $scope.reg.mobile = $localstorage.get('mobile');
    $scope.reg.email = $localstorage.get('email');

    $scope.register = function(){
          console.log(angular.toJson($scope.reg));
        if($scope.reg.name == undefined || $scope.reg.mobile == undefined ){
               $ionicPopup.alert({
                title: 'Registration failed',
                template: 'Please fill all mandatory fields !'
			});

               return;
		}
		else{

			RESTServices.signup($scope.reg).then(
			  function (d) {
				  $localstorage.set('name', $scope.reg.name);
				  $localstorage.set('mobile', $scope.reg.mobile);
				  if($scope.reg.email != undefined){
						$localstorage.set('email', $scope.reg.email);
				  }
				   $localstorage.set('authtoken', d.authtoken);
					$state.go('elll.verification');

				//TODO: call rest API for registration
				  $ionicPopup.alert({
						title: 'Registration Successful',
						template: 'Please use OTP receieved as SMS to verify your account!'
					   });
				  $localstorage.set('registration', 'done');
			  },
			  function(error) {
				alert("not able to call REST");

			  });
		}
    };
})

.controller('VerificationCtrl', function($scope, $ionicPopup, $localstorage, $state,RESTServices) {
    $scope.verification = {};
    $scope.verify = function(){
        if($scope.verification.otp == undefined){
            $ionicPopup.alert({
                title: 'Verification failed',
                template: 'Please enter OTP and retry!'
               });
               return;
        }
		else{
			var data={
				mobile:$localstorage.get('email'),
				otp:$scope.verification.otp
			}
			$state.go('elll.emergencycontacts');
			$localstorage.set('verification', 'done');
			/*RESTServices.verify(data).then(
				  function (d) {
						//TODO: calls rest API for verification
						$localstorage.set('verification', 'done');
						$state.go('elll.emergencycontacts');
				  },
				  function(error) {
					alert(error);

				  });*/
		}

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
.controller('SOSCtrl', function($scope, $ionicHistory, $cordovaGeolocation, $ionicPopover, $timeout,$ionicPlatform,$cordovaPush,  $timeout,backgroundTasks) {
    $ionicHistory.clearHistory();
    $scope.register = function () {
	    var config = {
	        "senderID": "<REPLACE THIS WITH YOURS FROM GCM CONSOLE PROJECT ID>" //Config object for iOS will be different.
	    };

	    $cordovaPush.register(config).then(function (result) {
	       console.log("Register success " + result);
	    }, function (err) {
	       console.log("Register error " + err)
	    });
	    }

	    $scope.$on('$cordovaPush:notificationReceived', function (event, notification) {
	        //CALL BACK EVENT AFTER REGISTRATION
	        //call back will come here. This event could be of type 'registered', 'message' or 'error'
	        //Ideally for 'registered' event type, we need to call a back-end API to store the registration Id.
    });

    $ionicPlatform.ready(function () {
            $scope.register();
          	backgroundTasks.run();
    });
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



.controller('HeatmapCtrl', function($scope, $state, $cordovaGeolocation) {
   var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var latLng1 = new google.maps.LatLng(12.969522, 77.610055);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    google.maps.event.addListenerOnce($scope.map, 'idle', function(){

  var marker = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: latLng
  });

  google.maps.event.addListenerOnce($scope.map, 'idle', function(){

    var marker = new google.maps.Marker({
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        position: latLng1
    });
}) 


.controller('HeatmapCtrl', function($scope, $state, $cordovaGeolocation, NgMap) {
   
   var heatmap, vm = this;
    NgMap.getMap().then(function(map) {
      vm.map = map;
      heatmap = vm.map.heatmapLayers.foo;
    });
  });

  }, function(error){
    console.log("Could not get location");
  });



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

.controller('NotificationCtrl', function($scope,$ionicPopup,$ionicHistory) {

  $scope.notificationslist = [];
  $scope.notificationslist.push({id:'sos-123',title:'Mahesh need help',picurl:'http://ionicframework.com/img/docs/venkman.jpg',desc:'sadfad',isnew:true});
  $scope.notificationslist.push({id:'sos-321',title:'Mahesh need help',picurl:'http://ionicframework.com/img/docs/venkman.jpg',desc:'test',isnew:false});


  $scope.MissionAccepted=function(){
	alert('accepted');
  }
  $scope.startJob=function(n){
       $ionicPopup.show({
              title: 'New Misson',
              subTitle: 'Are you ready to save the victim?',
              scope: $scope,
              buttons: [
                {
                  text: '<b>Accept</b>',
                  type: 'button-positive',
                  onTap: function(e) {
                    return $scope.MissionAccepted();
                  }
                },
                { text: 'Deny', onTap: function(e) { return true; } },
              ]
              }).then(function(res) {
                console.log('Tapped!', res);
              }, function(err) {
                console.log('Err:', err);
              }, function(msg) {
                console.log('message:', msg);
       });

  }
});

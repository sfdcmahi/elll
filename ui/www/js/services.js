angular.module('projectElll.services', [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])
.factory('appstore',['$q',function($q){
		var Metadata = {};
		Metadata['locationfrequency']=10000;
		Metadata['authToken']='Maheswara';
		return{
			set: function(key, value) {
				Metadata[key] = value;
			},
			get: function(key) {
				if(key)
					return Metadata[key];
			}
			
		}
}])
.factory('backgroundTasks', function($interval,RESTServices,appstore, $cordovaGeolocation,$localstorage){
	var locationservice=function(){
		var posOptions = {timeout: 10000, enableHighAccuracy:true};
		 $cordovaGeolocation.getCurrentPosition(posOptions)
		 .then(function (position) {
				var body={
						authtoken:$localstorage.get('authtoken'),
						latlong:position.coords.latitude+" , "+position.coords.longitude
						}
			 
				RESTServices.locationstore(body);
			}, function(err) {
			  // error
		});
	
	}
	var runTasks=function(){
		runloacationservices= $interval(locationservice, appstore.get('locationfrequency'));
	}
	var stopTasks=function(){
		runloacationservices.stop();
	}
	return{
		run:runTasks,
		stopTasks:stopTasks
	}
})
.factory('RESTServices', function($q,$http){
	
	function request(obj) {

      var method = obj.method || 'GET';
	  var data= obj.data || {};
        headers = {};
        url = ' http://clm-pun-015875.bmc.com:8090';
        deferred = $q.defer();
	    url = url + obj.path;
	console.log(angular.toJson(data));
	headers['Content-Type']='Application/json'
   $http({
        headers: headers,
        method: method,
        url: url,
        params: obj.params,
        data: angular.toJson(data)
      })
        .success(function (data, status, headers, config) {
          deferred.resolve(data);
        })
        .error(function (data, status, headers, config) {
             console.error(data);
            deferred.reject(data);

        });

      return deferred.promise;
    }
	
	var signup=function(data){
		var obj={};
		obj.method='POST';
		obj.data=data;
		obj.path='/elll/rest/v1/signup';
		console.log(data);
		return request(obj);
	}
	
	var verify=function(data){
		var obj={};
		obj.method='POST';
		obj.data=data;
		obj.path='/elll/rest/v1/singup/verify';
		
		return request(obj);
	}
	var storeEmergency=function(data){
		var obj={};
		obj.method='POST';
		obj.data=data;
		obj.path='/elll/rest/v1/emergencycontacts';
		
		return request(obj);
	}
	var sendInvite=function(data){
		var obj={};
		obj.method='POST';
		obj.data=data;
		obj.path='/elll/rest/v1/invite';
		
		return request(obj);
	}
	var SOS=function(data){
		var obj={};
		obj.method='POST';
		obj.data=data;
		obj.path='/elll/rest/v1/sos';
		
		return request(obj);
	}
	var locationstore=function(data){
		var obj={};
		obj.method='POST';
		obj.data=data;
		obj.path='/elll/rest/v1/location';
		console.log(data);
		return request(obj);
	}
	return{
		signup:signup,
		verify:verify,
		storeEmergency:storeEmergency,
		sendInvite:sendInvite,
		SOS:SOS,
		locationstore:locationstore
	}
})



.service("ContactsService", ['$q','$cordovaContacts', function($q,$cordovaContacts) {

	var formatContactlist = function(contacts) {
		var phoneContacts = []
		angular.forEach(contacts, function(contact, key){
			if(contact.phoneNumbers)
			 phoneContacts.push(formatContact(contact));
		});
		console.log(phoneContacts);
		return phoneContacts
	};
	
	var formatContact = function(contact) {
		
		return {
			"displayName"   : contact.name.formatted || contact.name.givenName + " " + contact.name.familyName || "Mystery Person",
			"emails"        : contact.emails || [],
			"phones"        : contact.phoneNumbers || [],
			"photos"        : contact.photos || [],
			"checked"		:false
		};

	};
	var options = {'multiple':true};
		options.filter= '';
		options.fields = ["displayName",'phoneNumbers','photos','givenName','familyName'];
	var AllContacts = function() {
		
		var deferred = $q.defer();
		
		 $cordovaContacts.find({filter: ''}).then(function(result) {
			
			deferred.resolve( formatContactlist(result) );
			
		}, function(error) {

			console.log("ERROR: " + error);
		});
		

		return deferred.promise;
	};

	return {
		AllContacts : AllContacts
	};
}])
	;

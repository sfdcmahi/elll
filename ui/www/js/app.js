// Ionic projectElll App

// 'projectElll.services' is found in services.js
// 'projectElll.controllers' is found in controllers.js
angular.module('projectElll', ['ionic', 'projectElll.controllers', 'projectElll.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('elll', {
    url: '/elll',
    abstract: true,
    templateUrl: 'templates/sidemenu.html'
  })

  // Each tab has its own nav history stack:
  
  .state('elll.signup', {
    url: '/signup',
    views: {
      'ellContent': {
        templateUrl: 'templates/registration-page.html',
        controller: 'SignupCtrl'
      }
    }
  })
  
  .state('elll.verification', {
    url: '/verification',
    views: {
      'ellContent': {
        templateUrl: 'templates/verification-page.html',
        controller: 'VerificationCtrl'
      }
    }
  })
  
  .state('elll.emergencycontacts', {
    url: '/emergencycontacts',
    views: {
      'ellContent': {
        templateUrl: 'templates/emergencycontacts-page.html',
        controller: 'EmergencyContactsCtrl'
      }
    }
  })
  
  .state('elll.invite', {
    url: '/invite',
    views: {
      'ellContent': {
        templateUrl: 'templates/invitefriends-page.html',
        controller: 'inviteCtrl'
      }
    }
  })
  
  
  .state('elll.dashbord', {
    url: '/dashbord',
    views: {
      'ellContent': {
        templateUrl: 'templates/elll-home.html',
        controller: 'SOSCtrl'
      }
    }
  })
  .state('elll.grievance', {
    url: '/grievance',
    views: {
      'ellContent': {
        templateUrl: 'templates/grievance-page.html',
        controller: 'GrievanceCtrl'
      }
    }
  })
  
  .state('elll.heatmap', {
    url: '/heatmap',
    views: {
      'ellContent': {
        templateUrl: 'templates/heatmap-page.html',
        controller: 'HeatmapCtrl'
      }
    }
  })
  
  .state('elll.savevictim', {
    url: '/savevictim',
    views: {
      'ellContent': {
        templateUrl: 'templates/savevictim-page.html',
        controller: 'SavevictimCtrl'
      }
    }
  })
  
   .state('elll.profile', {
    url: '/profile',
    views: {
      'ellContent': {
        templateUrl: 'templates/profile-page.html',
        controller: 'ProfileCtrl'
      }
    }
  })

   .state('elll.settings', {
    url: '/settings',
    views: {
      'ellContent': {
        templateUrl: 'templates/settings-page.html',
        controller: 'SettingsCtrl'
      }
    }
  })
  .state('elll.notification', {
    url: '/notification',
    views: {
      'ellContent': {
        templateUrl: 'templates/notification-page.html',
        controller: 'NotificationCtrl'
      }
    }
  })




  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/elll/dashbord');

});

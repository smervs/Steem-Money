angular.module('App', ['ionic'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('profile', {
                url: '/profile/:accountname',
                controller: 'ProfileController as profileController',
                templateUrl: 'views/profile/profile.html'
            })
            .state('home', {
                url: '/home',
                controller: 'HomeController as homeController',
                templateUrl: 'views/home/home.html'
            })
            .state('conversion', {
                url: '/conversion',
                controller: 'ConversionController as conversionController',
                templateUrl: 'views/conversion/conversion.html'
            });
        $urlRouterProvider.otherwise('/home');
    })

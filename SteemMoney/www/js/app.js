angular.module('App', ['ionic'])
    .constant('currencies', [
        { id: 'BTC', name: 'Bitcoin' },
        { id: 'USD', name: 'US Dollar' },
        { id: 'AUD', name: 'Australian Dollar' },
        { id: 'BGN', name: 'Bulgarian Lev' },
        { id: 'BRL', name: 'Brazilian Real' },
        { id: 'CAD', name: 'Canadian Dollar' },
        { id: 'CHF', name: 'Swiss Franc' },
        { id: 'CNY', name: 'Chinese Yuan' },
        { id: 'CZK', name: 'Czech Koruna' },
        { id: 'DKK', name: 'Danish Krone' },
        { id: 'EUR', name: 'Euro' },
        { id: 'GBP', name: 'British Pound' },
        { id: 'HKD', name: 'Hong Kong Dollar' },
        { id: 'HRK', name: 'Croatian Kuna' },
        { id: 'HUF', name: 'Hungarian Forint' },
        { id: 'IDR', name: 'Indonesian Rupiah' },
        { id: 'ILS', name: 'Israeli New Shekel' },
        { id: 'INR', name: 'Indian Rupee' },
        { id: 'ISK', name: 'Icelandic Krona' },
        { id: 'JPY', name: 'Japanese Yen' },
        { id: 'KRW', name: 'South Korean Won' },
        { id: 'MXN', name: 'Mexican Peso' },
        { id: 'MYR', name: 'Malaysian Ringgit' },
        { id: 'NOK', name: 'Norwegian Krone' },
        { id: 'NZD', name: 'New Zealand Dollar' },
        { id: 'PHP', name: 'Philippine Peso' },
        { id: 'PLN', name: 'Polish Zloty' },
        { id: 'RON', name: 'Romanian Leu' },
        { id: 'RUB', name: 'Russian Ruble' },
        { id: 'SEK', name: 'Swedish Krona' },
        { id: 'SGD', name: 'Singapore Dollar' },
        { id: 'THB', name: 'Thai Baht' },
        { id: 'TRY', name: 'Turkish Lira' },
        { id: 'ZAR', name: 'South African Rand' }
    ])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                window.cordova.plugins.Keyboard.disableScroll(true);
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
            })
            .state('walletConversion', {
                url: '/walletConversion/:steem/:sbd',
                controller: 'WalletConversionController as walletConversionController',
                templateUrl: 'views/conversion/wallet_conversion.html'
            });
        $urlRouterProvider.otherwise('/home');
    })

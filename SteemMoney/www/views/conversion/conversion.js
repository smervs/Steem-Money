angular.module('App')
    .controller('ConversionController', function ($http, $scope, $ionicPopup) {
        var vm = $scope;
        vm.isOnline = navigator.onLine;

        vm.currency_value = 0;
        vm.result = 0;
        vm.currency_from = 'STEEM';
        vm.currency_to = {id:'BTC', name:'Bitcoin'};
        vm.currencies = [
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
            { id: 'ZAR', name: 'South African Rand' },
        ];

        vm.SBD = {};
        vm.STEEM = {};

        getRates();

        function getRates() {
            $http.get('https://api.fixer.io/latest?base=USD')
                .then(function (response) {
                    var rates = response.data.rates;
                    console.log(rates);
                });

            $http.get('https://api.coinmarketcap.com/v1/ticker/steem-dollars/')
                .then(function (response) {
                    vm.SBD = response.data[0];
                });

            $http.get('https://api.coinmarketcap.com/v1/ticker/steem/')
                .then(function (response) {
                    vm.STEEM = response.data[0];
                });
        }

        vm.calculate = function () {
            if (vm.currency_from == 'STEEM') {
                console.log(vm.currency_to);
                console.log(vm.currency_value);
                console.log(vm.STEEM);
                if (vm.currency_to.id == 'BTC') {
                    vm.result = parseFloat(vm.currency_value) * parseFloat(vm.STEEM.price_btc); 
                }
                else if (vm.currency_to.id == 'USD') {
                    vm.result = parseFloat(vm.currency_value) * parseFloat(vm.STEEM.price_usd); 
                }
                else {

                }
            }
            else {

            }
        }
    });
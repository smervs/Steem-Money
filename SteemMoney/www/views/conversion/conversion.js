angular.module('App')
    .controller('ConversionController', function ($http, $scope, $ionicPopup, currencies) {
        var vm = $scope;
        vm.isOnline = navigator.onLine;

        vm.currency_value = 0;
        vm.result = 0;
        vm.currency_from = 'STEEM';
        vm.currency_to = {id:'BTC', name:'Bitcoin'};
        vm.currencies = currencies;

        vm.SBD = {};
        vm.STEEM = {};
        vm.rates = {};

        getRates();

        function getRates() {
            $http.get('https://api.fixer.io/latest?base=USD')
                .then(function (response) {
                    vm.rates = response.data.rates;
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
                if (vm.currency_to.id == 'BTC') {
                    vm.result = getBTCValue(vm.STEEM.price_btc); 
                }
                else if (vm.currency_to.id == 'USD') {
                    vm.result = getUSDValue(vm.STEEM.price_usd); 
                }
                else {
                    vm.result = getUSDValue(vm.STEEM.price_usd) * parseFloat(vm.rates[vm.currency_to.id]); 
                }
            }
            else {
                if (vm.currency_to.id == 'BTC') {
                    vm.result = getBTCValue(vm.SBD.price_btc);
                }
                else if (vm.currency_to.id == 'USD') {
                    vm.result = getUSDValue(vm.SBD.price_usd);
                }
                else {
                    vm.result = getUSDValue(vm.SBD.price_usd) * parseFloat(vm.rates[vm.currency_to.id]); 
                }
            }

            if (isNaN(vm.result)) {
                vm.result = '0.000';
            }
            else {
                vm.result = vm.result.toFixed(3);
            }

            vm.result = vm.result + ' ' + vm.currency_to.id;
        }

        function getUSDValue(usd) {
            return vm.result = parseFloat(vm.currency_value) * parseFloat(usd); 
        }

        function getBTCValue(btc) {
            return vm.result = parseFloat(vm.currency_value) * parseFloat(btc);
        }
    });
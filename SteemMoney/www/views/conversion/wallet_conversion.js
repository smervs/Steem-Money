angular.module('App')
    .controller('WalletConversionController', function ($http, $scope, $ionicPopup, currencies, $stateParams) {
        var vm = $scope;
        vm.isOnline = navigator.onLine;

        vm.steem_value = $stateParams.steem;
        vm.steem_btc_result = 0;
        vm.steem_usd_result = 0;

        vm.sbd_value = $stateParams.sbd;
        vm.sbd_btc_result = 0;
        vm.sbd_usd_result = 0;

        vm.currencies = currencies.slice(1).slice(1);

        vm.steem_to = { id: 'AUD', name: 'Australian Dollar' };
        vm.sbd_to = { id: 'AUD', name: 'Australian Dollar' };

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
                    calculate();
                });
        }

        function calculate() {
            vm.steem_btc_result = format_btc(getBTCValue(vm.steem_value, vm.STEEM.price_btc));
            vm.steem_usd_result = format_usd(getUSDValue(vm.steem_value, vm.STEEM.price_usd));            

            vm.sbd_btc_result = format_btc(getBTCValue(vm.sbd_value, vm.SBD.price_btc));
            vm.sbd_usd_result = format_usd(getUSDValue(vm.sbd_value, vm.SBD.price_usd));

            vm.calculate_steem_currency();
            vm.calculate_sbd_currency();
            $scope.$apply();
        }

        vm.calculate_steem_currency = function () {
            vm.steem_cur_result = format_cur(getUSDValue(vm.steem_value, vm.STEEM.price_usd) * parseFloat(vm.rates[vm.steem_to.id]), vm.steem_to);
        }

        vm.calculate_sbd_currency = function () {
            vm.sbd_cur_result = format_cur(getUSDValue(vm.sbd_value, vm.SBD.price_usd) * parseFloat(vm.rates[vm.sbd_to.id]), vm.sbd_to);
        }

        function getUSDValue(value, usd) {
            return parseFloat(value) * parseFloat(usd);
        }

        function getBTCValue(value, btc) {
            return parseFloat(value) * parseFloat(btc);
        }

        function format_btc(val) {
            var btc = '';
            if (isNaN(val)) {
                btc = '0.000';
            }
            else {
                btc = val.toFixed(3);
            }

            return (btc + ' BTC');
        }

        function format_usd(val) {
            var usd = '';
            if (isNaN(val)) {
                usd = '0.000';
            }
            else {
                usd = val.toFixed(3);
            }

            return (usd + ' USD');
        }

        function format_cur(val, cur) {
            var temp = '';
            if (isNaN(val)) {
                temp = '0.000';
            }
            else {
                temp = val.toFixed(3);
            }

            return (temp + ' ' + cur.id);
        }
    });
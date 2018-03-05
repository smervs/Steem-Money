angular.module('App')
    .controller('HomeController', function ($http, $scope, $ionicPopup) {
        var vm = $scope;

        vm.SBD = '';
        vm.STEEM = '';
        vm.isOnline = navigator.onLine;

        window.addEventListener('native.keyboardshow', function () {
            document.body.classList.add('keyboard-open');
        });

        if (vm.isOnline) {
            $http.get('https://api.coinmarketcap.com/v1/ticker/steem-dollars/')
                .then(function (response) {
                    var temp = response.data[0];
                    vm.SBD = Number(temp.price_usd).toFixed(2);
                });

            $http.get('https://api.coinmarketcap.com/v1/ticker/steem/')
                .then(function (response) {
                    var temp = response.data[0];
                    vm.STEEM = Number(temp.price_usd).toFixed(2);
                });
        }
        steem.api.getAccountHistory('gameon', -1, 100, function (err, result) {
            console.log(err);
            console.log(result);
        });
        steem.api.getOwnerHistory('gameon', function (err, result) {
            console.log(err);
            console.log(result);
        });
    });

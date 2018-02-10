angular.module('App')
    .controller('ProfileController', function ($http, $scope, $ionicLoading, $ionicPopup, $sce, $stateParams, $ionicHistory) {
        var vm = $scope;

        vm.globals = {};
        vm.account = {};
        vm.profile = {};
        vm.hasAccount = false;
        vm.reputation = '';
        vm.steemPower = '';
        vm.accountName = $stateParams.accountname.toLowerCase();
        vm.accountValue = '';
        vm.lastPayoutDate = '';

        loadData();

        function loadData() {

            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

            //Steem globals
            steem.api.getDynamicGlobalProperties(function (err, result) {
                vm.globals = result;

                getAccount();
                getPendingPosts();
            });
        }

        function getAccount() {

            steem.api.getAccounts([vm.accountName], function (err, result) {
                $ionicLoading.hide();

                if (result.length == 0) {
                    $ionicPopup.alert({
                        title: 'Error',
                        template: 'Account name is not found!'
                    }).then(function (res) {
                        popup = false;
                        $ionicHistory.goBack();
                    });

                    vm.hasAccount = false;
                }
                
                vm.account = result[0];
                vm.profile = JSON.parse(result[0].json_metadata).profile;
                //Reputation
                vm.reputation = steem.formatter.reputation(vm.account.reputation);
                //Steem Power
                var totalSteem = Number(vm.globals.total_vesting_fund_steem.split(' ')[0]);
                var totalVests = Number(vm.globals.total_vesting_shares.split(' ')[0]);
                var userVests = Number(vm.account.vesting_shares.split(' ')[0]);
                vm.steemPower = totalSteem * (userVests / totalVests);

                vm.hasAccount = true;

                steem.formatter.estimateAccountValue(vm.account).then(function (response) {
                    vm.accountValue = response;
                });

                calculateTotalWallet();
            });
        }; 

        function calculateTotalWallet() {
            var wallet_steem = parseFloat(vm.account.balance.replace(" STEEM", ""));
            var wallet_steem_power = vm.steemPower;
            var wallet_sbd = parseFloat(vm.account.sbd_balance.replace(" SBD", ""));

            var savings_steem = parseFloat(vm.account.savings_balance.replace(" STEEM", ""));
            var savings_sbd = parseFloat(vm.account.savings_sbd_balance.replace(" SBD", ""));

            var uc_steem = parseFloat(vm.account.reward_steem_balance.replace(" STEEM", ""));
            var uc_steem_power = parseFloat(vm.account.reward_vesting_steem.replace(" STEEM", ""));
            var uc_sbd = parseFloat(vm.account.reward_sbd_balance.replace(" SBD", ""));

            vm.total_steem_wallet = wallet_steem + savings_steem + uc_steem;
            vm.total_sp_wallet = wallet_steem_power + uc_steem_power;
            vm.total_sbd_wallet = wallet_sbd + savings_sbd + uc_sbd;
        }

        function getPendingPosts() {
            steem.api.getDiscussionsByBlog({ tag: vm.accountName, limit: 100 }, function (err, result) {
                var total_posts = 0;
                var total_posts_value = 0;
                var curation_rewards = 0;
                var author_rewards = 0;
                var total_votes = 0;

                result.forEach(function (post) {
                    var now = new Date();
                    var cashout_time = new Date(post.cashout_time);

                    if(cashout_time > now){
                        var payout = parseFloat(post.pending_payout_value.replace(" SBD", ""));

                        total_posts_value += payout;
                        curation_rewards += payout * 0.25;
                        author_rewards += payout * 0.75;
                        total_votes += post.active_votes.length;

                        total_posts++;

                        if (vm.lastPayoutDate == '') {
                            vm.lastPayoutDate = vm.formatDate(post.cashout_time);
                        }
                    }
                    else {
                        return false;
                    }
                });

                var sbd_value = author_rewards / 2;

                vm.total_sbd_value = sbd_value.toFixed(3);
                vm.total_post_count = total_posts;
                vm.total_pending_payout = total_posts_value.toFixed(3);
                vm.total_curation_rewards = curation_rewards.toFixed(3);
                vm.total_author_rewards = author_rewards.toFixed(3);
                vm.total_votes_count = total_votes;

                getTotalWalletWithPP();
            });
        }

        function getTotalWalletWithPP() {
            var total = parseFloat(vm.total_sbd_wallet) + parseFloat(vm.total_sbd_value);
            vm.total_sbd_wallet_payout = total.toFixed(3);
        }

        vm.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
        }

        vm.formatDate = function (str) {
            var date = new Date(str);
            var monthNames = [
                "January", "February", "March",
                "April", "May", "June", "July",
                "August", "September", "October",
                "November", "December"
            ];

            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();

            return monthNames[monthIndex] + ' ' + day + ', ' + year;
        }

        vm.refresh = function () {
            loadData();
        }
    });

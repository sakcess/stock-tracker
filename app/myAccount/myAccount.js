'use strict';

angular.module('stockTracker.myAccount', ['ngRoute']).

    constant('APP_PROPS', {
        'BALANCE' : 1000.00
    })

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/myAccount', {
            templateUrl: 'myAccount/myAccount.html',
            controller: 'MyAccountCtrl',
            controllerAs: 'vm'
        });
    }])

    .controller('MyAccountCtrl', ['$scope', 'MyBalanceService', 'MyStocksService', function($scope, MyBalanceService, MyStocksService) {
        var vm = this;

        vm.balance = parseFloat(MyBalanceService.getStartingBalance());
        vm.stocksList = MyStocksService.getMyStockList();

        vm.deposit = function(amount) {
            MyBalanceService.deposit(amount);
            vm.balance = parseFloat(MyBalanceService.getStartingBalance());
        };

        vm.withdraw = function(amount) {
            MyBalanceService.withdraw(amount);
            vm.balance = parseFloat(MyBalanceService.getStartingBalance());
        };


        vm.buyStocks = function(quantity, stock) {
            MyStocksService.buy(quantity, stock);
            vm.stocksList = MyStocksService.getMyStockList();
            vm.balance = parseFloat(MyBalanceService.getStartingBalance());
        };

        vm.sellStocks = function(quantity, stock) {
            MyStocksService.sell(quantity, stock);
            vm.stocksList = MyStocksService.getMyStockList();
            vm.balance = parseFloat(MyBalanceService.getStartingBalance());
        };


    }])

    .factory('MyStocksService', ['MyBalanceService', function(MyBalanceService) {
        var vm = this;
        //vm.myStockList = {};
        vm.myStockList = {"YHOO":{"change":"-0.450001","chg_percent":"-1.203532","day_high":"37.439899","day_low":"36.810001","issuer_name":"Yahoo! Inc.","issuer_name_lang":"Yahoo! Inc.","name":"Yahoo! Inc.","price":"36.939999","symbol":"YHOO","ts":"1466193600","type":"equity","utctime":"2016-06-17T20:00:00+0000","volume":"12593900","year_high":"41.390000","year_low":"26.150000","quantity":0},"GOOG":{"change":"-18.640015","chg_percent":"-2.624024","day_high":"708.820007","day_low":"688.451477","issuer_name":"Alphabet Inc.","issuer_name_lang":"Alphabet Inc.","name":"Alphabet Inc.","price":"691.719971","symbol":"GOOG","ts":"1466193600","type":"equity","utctime":"2016-06-17T20:00:00+0000","volume":"3402357","year_high":"789.870000","year_low":"515.180000","quantity":0}};

        return {
            add: function(stock) {
                stock.quantity = 0;
                vm.myStockList[stock.symbol] = stock;
                //console.log(JSON.stringify(vm.myStockList));
                console.log(stock.symbol +' added.')
            },

            remove: function(stock) {
                delete vm.myStockList[stock.symbol];
                console.log(stock.symbol +' removed.')
            },

            getMyStockList: function() {
              return Object.keys(vm.myStockList).map(function (key) {return vm.myStockList[key]});;
            },

            buy: function(quantity, stock) {
                if(parseInt(quantity) >= 1 ) {
                    var total_amount = parseFloat(stock.price) * parseFloat(quantity);
                    var new_balance = MyBalanceService.withdraw(total_amount.toFixed(2));

                    if(parseFloat(new_balance) >= 0) {
                        stock.quantity = parseInt(vm.myStockList[stock.symbol].quantity) + parseInt(quantity);

                        console.log('MyStocksCtrl: bought - '+ quantity+' stocks at: $'+total_amount);
                    }

                }//1 stock quantity
            },
            sell: function(quantity, stock) {
                if(parseInt(quantity) >= 1) {
                    if(parseInt(vm.myStockList[stock.symbol].quantity) - quantity >= 0) {
                        var total_amount = parseFloat(stock.price) * parseFloat(quantity);
                        MyBalanceService.deposit(total_amount.toFixed(2));
                        stock.quantity =
                            parseInt(vm.myStockList[stock.symbol].quantity) - parseInt(quantity);
                            console.log('MyStocksCtrl: sold - '+ quantity +' stocks at : $'+total_amount);
                    } else {
                        alert('You do not have enough stock to sell');
                    }

                }
                //vm.myStocks.splice(stock);

            }
        }
    }])
    .factory('MyBalanceService', ['APP_PROPS', function(APP_PROPS) {
        var vm = this;
        vm.myStocks = {};
        vm.balance = parseFloat(APP_PROPS.BALANCE);

        return {
            getStartingBalance: function() {
                return vm.balance;
            },

            setBalance: function(amount) {
                vm.balance = amount;
            },

            deposit: function(amount) {
                if(parseFloat(amount) >= 1) {
                    vm.balance = parseFloat(vm.balance) + parseFloat(amount);
                    console.log(amount);
                } else {
                    alert('Minimum deposit amount is $1');
                }
            },
            withdraw: function(amount) {
                if(parseFloat(amount) >= 1) {
                    var newBalance = parseFloat(vm.balance) - parseFloat(amount);

                    if(parseFloat(newBalance) >= 0) {
                        vm.balance = newBalance.toFixed(2);
                        return vm.balance;
                    } else {
                        alert('Not have enough funds in your account');
                        return -1;
                    }
                } else {
                    alert('Minimum withdraw amount is $1');
                }

                console.log(amount);
            }

        }
    }]);

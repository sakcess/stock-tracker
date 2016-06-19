'use strict';

angular.module('stockTracker.stocks', ['ngRoute', 'ngResource'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/stocks', {
            templateUrl: 'stocks/stocks.html',
            controller: 'StocksCtrl',
            controllerAs: 'vm'
        });
    }])

    .controller('StocksCtrl', ['$http', 'MyStocksService', function ($http, MyStocksService) {

        /*var stockData = StockService.get({ tickers: 'YHOO,AAPL' }, function() {
         console.log(JSON.stringify(stockData));
         }); // get() returns a single entry*/

        var vm = this;

        vm.searchStockTxt = 'YHOO, GOOG';

        vm.searchStock = function (stockTickers) {
            var url = 'http://finance.yahoo.com/webservice/v1/symbols/' + stockTickers + '/quote?format=json&view=detail&callback=JSON_CALLBACK';

            $http.jsonp(url)
                .success(function (data) {
                    vm.stockData = data.list.resources;
                    console.log(JSON.stringify(vm.stockData.length));
                });
        };


        vm.addStockToMyAccount = function (stockData) {
            MyStocksService.add(stockData);
            console.log(stockData.symbol);
        };

        vm.removeStockFromMyAccount = function (stockData) {
            MyStocksService.remove(stockData);
            console.log(stockData.symbol);
        };

    }])

    .factory('StockService', function ($resource) {
        return $resource('http://finance.yahoo.com/webservice/v1/symbols/:tickers/quote?format=json&view=detail', {tickers: "@tickers"});
    });

'use strict';

angular.module('stockTracker.stocks', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/stocks', {
    templateUrl: 'stocks/stocks.html',
    controller: 'StocksCtrl'
  });
}])

.controller('StocksCtrl', [function() {

}]);

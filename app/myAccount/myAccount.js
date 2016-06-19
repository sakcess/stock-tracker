'use strict';

angular.module('stockTracker.myAccount', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/myAccount', {
    templateUrl: 'myAccount/myAccount.html',
    controller: 'MyAccountCtrl'
  });
}])

.controller('MyAccountCtrl', [function() {

}]);

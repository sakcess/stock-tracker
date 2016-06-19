'use strict';

angular.module('stockTracker.myAccount', ['ngRoute']).

constant('APP_PROPS', {
  'BALANCE' : 1000
})

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/myAccount', {
    templateUrl: 'myAccount/myAccount.html',
    controller: 'MyAccountCtrl',
    controllerAs: 'vm'
  });
}])

.controller('MyAccountCtrl', ['APP_PROPS', function(APP_PROPS) {
    var vm = this;

    vm.balance = APP_PROPS.BALANCE;
}]);

'use strict';

angular.module('angDemo', ['demo.directives'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .factory('User', function() {
    var user  = {};
    user.checkAmount = '13.00';
    user.checkDate = '07/30/1983';
    return  user;
  });


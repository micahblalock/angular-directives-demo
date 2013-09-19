'use strict';

angular.module('angDemo', ['ngRoute','demo.directives','ngAnimate'])
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
    var getUser = function() {
      return user;
    }
    var saveUser = function() {
      console.log("User saved");
    }

    return {
      get: getUser,
      save: saveUser
    }
  })
  .factory('Payer', function() {
    var payer = {};
    payer.companyName = '';
    payer.phoneNumber = '';
    payer.email = '';
    payer.npiNumber = '';
    payer.taxId = '';
    var getpayer = function() {
      return payer;
    }
    var updatePayer = function(_payer) {
      console.log('payer: ' + _payer);
      payer = _payer
    }
    return {
      get: getpayer,
      save: updatePayer
    };
  });


  

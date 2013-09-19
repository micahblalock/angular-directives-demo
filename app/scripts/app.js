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
  .factory('Ticket', function() {
    var ticket = {};
    ticket.companyName = '';
    ticket.phoneNumber = '';
    ticket.email = '';
    ticket.npiNumber = '';
    ticket.taxId = '';
    var getticket = function() {
      return ticket;
    }
    var updateTicket = function(_ticket) {
      console.log('ticket: ' + _ticket);
      ticket = _ticket
    }
    return {
      get: getticket,
      save: updateTicket
    };
  })
  .factory('PageWizard', function(){
      var pageWiz = {};
      var pageIndex = 0;
      var pages = [];
      pageWiz.currentStep = "";

      var setNextPage = function() {
        var nextPage = pages[pageIndex];
        if(nextPage.selectGroup) {
          for(var grpIndex in nextPage.selectGroup){
            var page = nextPage.selectGroup[grpIndex];
            var expression = page.routeWhen;
            // console.log(eval(expression));
            if(expression) {
              pageWiz.currentStep = page;
              break;
            }
          }
        } else {
          pageWiz.currentStep = nextPage;
        }        
      }
      pageWiz.getNextPage = function(){
        pageIndex++;
        setNextPage();
      }
      pageWiz.getPreviousPage = function(){
        pageIndex--;
        setNextPage();
      }
      pageWiz.hasNextPage = function() {
        var hasNext = pageIndex < pages.length - 1;
        return hasNext;
      }
      pageWiz.hasPreviousPage = function() {
        var hasPrev = pageIndex > 0;
        return hasPrev;
      }

      pageWiz.addPages = function(pagesArray){
        pages = pagesArray;
        pageWiz.currentStep = pages[pageIndex];

      }
      var getWiz = function(){
        return pageWiz;
      }
      return {
        get: getWiz
      }
  });


  

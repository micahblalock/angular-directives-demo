'use strict';

angular.module('angDemo')
  .controller('MainCtrl', function ($scope, User) {
  		$scope.expanders = [
  			{
  				title: 'First expander',
  				text: 'The first thing is revealed'
  			},
  			{
  				title: 'Second expander',
  				text: 'The second thing revealed'
  			}
  		];

  		$scope.user = User.get();

  })
  .controller('RegistrationCtrl', function($scope, Ticket, PageWizard) {
      $scope.ticket = Ticket.get();
      $scope.pageWiz = PageWizard.get();
      var pages = [{templateUrl: 'views/p1.html'}, 
                {selectGroup: [ {templateUrl: 'views/p2.html',
                                 routeWhen: function(){$scope.ticket.type==="A";}},
                                {templateUrl: 'views/p2b.html',
                                 routeWhen: function(){$scope.ticket.type==="B";}} ] 
                }, 
                {templateUrl: 'views/p3.html'}];
      $scope.pageWiz.addPages(pages);
  })

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
  .controller('RegistrationCtrl', function($scope, Ticket, PageWizard, $http) {
      $scope.ticketTypes = [{name: 'Claim', value: 'A'}, {name: 'ERA', value: 'B'}];
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



      $scope.$watch('pageWiz.currentStep', function(params) {
        if(! $scope.providers && $scope.ticket.type==='A'){
          $http.get("providers.json").success(function(data){
              $scope.providers = data;
          });
        }
      }, true);
   
  });

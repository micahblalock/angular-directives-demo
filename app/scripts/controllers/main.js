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
  .controller('RegistrationCtrl', function($scope, Payer) {
      $scope.payer = Payer.get();
      $scope.pageWiz = {};
      $scope.pages = [{templateUrl: 'views/p1.html'}, 
                      {selectGroup: [ {templateUrl: 'views/p2.html',
                                       routeWhen: 'payer.type==="A"'},
                                      {templateUrl: 'views/p2b.html',
                                       routeWhen: 'payer.type==="B"'} ] 
                      }, 
                      {templateUrl: 'views/p3.html'}];
      $scope.pageIndex = 0;
      $scope.pageWiz.currentStep = $scope.pages[$scope.pageIndex];
      $scope.setNextPage = function() {
        var nextPage = $scope.pages[$scope.pageIndex];
        if(nextPage.selectGroup) {
          for(var grpIndex in nextPage.selectGroup){
            var page = nextPage.selectGroup[grpIndex];
            var expression = '$scope.' + page.routeWhen;
            console.log(eval(expression));
            if(eval(expression)) {
              $scope.pageWiz.currentStep = page;
              break;
            }
          }
        } else {
          $scope.pageWiz.currentStep = nextPage;
        }        
      }
      $scope.pageWiz.getNextPage = function(){
        $scope.pageIndex++;
        $scope.setNextPage();
      }
      $scope.pageWiz.getPreviousPage = function(){
        $scope.pageIndex--;
        $scope.setNextPage();
      }
      $scope.pageWiz.hasNextPage = function() {
        var hasNext = $scope.pageIndex < $scope.pages.length - 1;
        return hasNext;
      }
      $scope.pageWiz.hasPreviousPage = function() {
        var hasPrev = $scope.pageIndex > 0;
        return hasPrev;
      }
  })

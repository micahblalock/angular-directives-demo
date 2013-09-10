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

  		$scope.user = User;

  });

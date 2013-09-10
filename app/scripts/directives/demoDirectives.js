'use strict';
var FLOAT_REGEXP = /^\-?\d+((\.|\,)\d+)?$/;

angular.module('demo.directives',[])
	.directive('smartFloat', function() {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, elm, attrs, ctrl) {
				ctrl.$parsers.unshift(function(viewValue) {
					if (FLOAT_REGEXP.test(viewValue)) {
						// it is valid
						ctrl.$setValidity('float', true);
						return viewValue;
					} else {
						// it is invalid, return undefined (no model update)
						ctrl.$setValidity('float', false);
						return undefined;
					}
				});
			}
		}
	})
	.directive('pageTitle', function() {
		return {
			restrict: 'E',
			template: '<div class="span12"><h3><span ng-transclude></span></h3></div>',
			replace: true,
			transclude: true
		};
	})
	.directive('expander', function() {
		return {
			restrict: 'E',
			replace: true,
			transclude: true, 
			require: '^?expanderGroup',
			scope: { mytitle: '=expanderTitle' },
			template: '<div><div class="title" ng-click="toggle()">{{mytitle}}</div>' +
				'<div class="body" ng-show="showMe" ng-transclude></div></div>',
			link: function(scope, element, attrs, groupController) {
				scope.showMe = false;
				if(groupController){
					groupController.addExpander(scope);
				}
				scope.toggle = function toggle() {
					scope.showMe = !scope.showMe;
					if(groupController) groupController.gotOpened(scope);
				}
			}
		}
	})
	.directive('expanderGroup', function() {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			template: '<div ng-transclude></div>',
			controller: function() {
			    var expanders = [];

			    this.gotOpened = function(selectedExpander) {
			        angular.forEach(expanders, function(expander) {
				        if (selectedExpander != expander) {
				            expander.showMe = false;
				        }
				    });
				}

				this.addExpander = function(expander) {
				    expanders.push(expander);
				}
			}
		}
	})
	.directive('datepicker', function() {
	    return {
    		restrict: 'A',
			require: '?ngModel',
			scope: {
	        // This method needs to be defined and
	        // passed in to the directive from the view controller
		        select: '&'        // Bind the select function we refer to the
		                           // right scope
			},
			link: function(scope, element, attrs, ngModel) {
				if (!ngModel) return;

				var optionsObj = {};

		        optionsObj.dateFormat = 'mm/dd/yy';
		        var updateModel = function(dateTxt) {
					scope.$apply(function () {
	            // Call the internal AngularJS helper to
	            // update the two-way binding
	            		ngModel.$setViewValue(dateTxt);
	          		});
	        	};

	        	optionsObj.onSelect = function(dateTxt, picker) {
					updateModel(dateTxt);
					if (scope.select) {
	            		scope.$apply(function() {
							scope.select({date: dateTxt});
	            		});
	          		}
	        	};

	        	ngModel.$render = function() {
				// Use the AngularJS internal 'binding-specific' variable
					element.datepicker('setDate', ngModel.$viewValue || '');
	        	};
	        	element.datepicker(optionsObj);
	      	}
	    }
	})
    .directive('tabs', function() {
    	return {
    		restrict: 'E',
    		transclude: true,
    		scope: {},
    		controller: function($scope, $element) {
    			var panes = $scope.panes = [];
     
			    $scope.select = function(pane) {
				    angular.forEach(panes, function(pane) {
					    pane.selected = false;
			    	});
		    		pane.selected = true;
    			}
     
    			this.addPane = function(pane) {
    				if (panes.length == 0) $scope.select(pane);
    				panes.push(pane);
    			}
    		},
    		template: '<div class="tabbable">' +
    					'<ul class="nav nav-tabs">' +
    						'<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">' +
    							'<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
    						'</li>' +
    					'</ul>' +
    					'<div class="tab-content" ng-transclude></div>' +
    				'</div>',
    		replace: true
    	};
    })
    .directive('pane', function() {
    	return {
		    require: '^tabs',
		    restrict: 'E',
		    transclude: true,
		    scope: { title: '@' },
		    link: function(scope, element, attrs, tabsCtrl) {
			    tabsCtrl.addPane(scope);
	    	},
    		template:
    			'<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
    			'</div>',
    		replace: true
    	};
    });
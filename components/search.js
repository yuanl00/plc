;(function (angular) {
	angular.module('moviecat.directive.search',[])
	.directive('search', ['$route',function($route){
		// Runs during compile

		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			scope: {}, // {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'AEC', // E = Element, A = Attribute, C = Class, M = Comment
			template: '<form class="navbar-form navbar-right" ng-submit="search()"><input type="text" class="form-control" placeholder="Search..." ng-model="text"></form>',
			// templateUrl: '',
			replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {
				$scope.text  = ''; //取文本中的输入
				$scope.search = function () {
					$route.updateParams({
						q : $scope.text,
						category : 'search'
					});

				};
			}
		};
	}]);
})(angular);

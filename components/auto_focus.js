(function (angular) {
	'use strict';
	angular.module('moviecat.directive.auto_focus',[])
	.directive('autoFocus', ['$location', function($location){
		// Runs during compile
		var path = $location.path();
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			// scope: {}, // {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			// templateUrl: '',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {
				$scope.$location = $location;
				$scope.$watch('$location.path()',function(now,old) {
					// 当path发生变化时执行
					var aLink = iElm.children().attr('href');
					var type = aLink.replace(/#(\/.+?)\/\d+/,'$1');
					// console.log(type)
					if(now.startsWith(type)) {
						iElm.parent().children().removeClass('active');
						iElm.addClass('active');
					};
				});

			}
		};
	}]);

})(angular);

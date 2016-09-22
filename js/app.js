'use strict';

// Declare app level module which depends on views, and components
angular.module('moviecat', [
  'ngRoute',
  'moviecat.movie_detail',
  'moviecat.movie_list',
  'moviecat.directive.auto_focus',
  'moviecat.directive.search',
])
// 定义常量
.constant('Appconfig', {
	pageSize : 10,
	listApiAdd : '//api.douban.com/v2/movie/',
	detailApiAdd : '//api.douban.com/v2/movie/subject/'
})
// 定义路由配置
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/in_theaters/1'});
}]);
/*
 //设置active方式
.controller('NavController',['$scope',
	'$location',
	function($scope,$location) {
		$scope.$location = $location;
		$scope.$watch('$location.path()',function(now,old){
			// var path = $location.path();
			if(now.startsWith('/top250')) {
				$scope.type  = 'top250';
			}else if(now.startsWith('/coming_soon')) {
				$scope.type  = 'coming_soon';
			}else if(now.startsWith('/in_theaters')) {
				$scope.type  = 'in_theaters';
			};

		});


	}]);*/
	/*
.controller('SearchController',['$scope','$route',function ($scope,$route) {
	$scope.text  = ''; //取文本中的输入
	$scope.search = function () {
		$route.updateParams({
			q : $scope.text,
			category : 'search'
		});

	};

}]);

*/

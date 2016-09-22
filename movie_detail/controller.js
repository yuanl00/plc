(function (angular) {
	'use strict';

	var module = angular.module('moviecat.movie_detail', ['ngRoute','moviecat.services.http']);
	module.config(['$routeProvider', function($routeProvider) {

	  $routeProvider.when('/detail/:id', {
	    templateUrl: 'movie_detail/view.html',
	    controller: 'MoviceDetailController'
	  });
	}]);

	module.controller('MoviceDetailController', ['$scope','$route','$routeParams','HttpService','Appconfig',
		function($scope,$route,$routeParams,HttpService,Appconfig) {
			$scope.loading = true;
			$scope.movie = {};
			var id = $routeParams.id;
			var apiAdd = Appconfig.detailApiAdd + id;

			HttpService.jsonp(apiAdd,function (data) {
					$scope.movie = data;
					$scope.loading = false;
					$scope.$apply();

				}
			)
	}]);
})(angular);

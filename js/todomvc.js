(function (window,angular) {
	'use strict';

	// Your starting point. Enjoy the ride!
	var myApp = angular.module('myModule',['ngRoute','app.controller']);
	//location方式切换
	// .controller('myController',['$scope','$location',function($scope,$location) {

	myApp.config(['$routeProvider',function($routeProvider) {
	  $routeProvider
	    .when('/:status?', {
	      controller: 'myController',
	      templateUrl: 'main_tmpl'
	    })
	  	.otherwise({redirectTo:'/'});
  
}]);	






	
})(window,angular);

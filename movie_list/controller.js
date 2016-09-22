(function (angular) {
	'use strict';

	var module = angular.module('moviecat.movie_list', ['ngRoute','moviecat.services.http']);
	// 定义路由配置
	module.config(['$routeProvider', function($routeProvider) {

	  $routeProvider.when('/:category/:page', {
	    templateUrl: 'movie_list/view.html',
	    controller: 'MoviceListController'
	  });
	}])
// 定义控制器
	module.controller('MoviceListController', ['$scope','$route','$routeParams','HttpService','Appconfig',
		function($scope,$route,$routeParams,HttpService,Appconfig) {
			var page = parseInt($routeParams.page); //分页
			var count = Appconfig.pageSize; //每页条数
			var start = (page - 1) * count; //当前页数
			$scope.subjects = []; //保存获取的数据
			$scope.message = ''; //保存错误信息
			$scope.title = 'loading';
			$scope.totalCount = 0; //默认数据
			$scope.loading = true; //加载初
			$scope.totalPages = 0; //共多少页
			$scope.currtPage = page;
			HttpService.jsonp(
				// 'http://api.douban.com/v2/movie/' + $routeParams.category,
				Appconfig.listApiAdd + $routeParams.category,
				{
					start : start,
					count : count,
					// 数据来源，1.路由匹配，2.问号后面的参数
					q : $routeParams.q

				},
				function (data) {
					$scope.subjects = data.subjects;
					$scope.totalCount = data.total;
					$scope.title = data.title;
					$scope.totalPages = Math.ceil($scope.totalCount / count);
					$scope.loading = false;
					// $apply 同步服务器数据
					$scope.$apply();

				});

			// 暴露更改上下页面的函数
			$scope.goPage = function (page) {
				// 传过来第几页就是第几页,更新当前路由值
				// 合法范围校验
				if (page >= 1 && page <= $scope.totalPages) {
					$route.updateParams({page : page});
				}

			};


			/*
			var dbApiUrl = 'http://api.douban.com/v2/movie/in_theaters';//豆瓣API地址

			// 请求数据
			$http.jsonp(dbApiUrl + '?callback=jSON_callback').then(function (response) {
				if(response.status == 200) {
					$scope.subjects = response.data.subjects;
				}else{
					$scope.message = '获取数据失败！错误信息:' + response.statusText;
				}


			},function (err) {
				console.log(err)
					$scope.message = '获取数据失败！错误信息:' + err.statusText;
			});
			*/

	}]);
})(angular);

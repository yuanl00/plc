(function (angular) {
	'use strict';
	var controllers = angular.module('app.controller',['app.services']);
	controllers.controller('myController',['$scope','$routeParams','appService','$route',
		function($scope,$routeParams,appService,$route) {
		// 初始化模型
		$scope.text = '';
		//初始化模型数据
		$scope.todos = appService.getTodo();
		// 添加内容
		$scope.add = function () {
			// 不存在就不执行
			if (!$scope.text) return;
			// 添加
			appService.add($scope.text);
			// 添加完成清空
			$scope.text = '';
		};
		// 删除完成内容
		$scope.remove = function (id) {
			appService.remove(id);
		};
		// 清空全部完成内容
		$scope.clear = function () {
			$scope.todos = appService.clear();

		};
		// 是否完成
		$scope.existCompleted =  appService.existCompleted;

		// 编辑功能
		// 初始默认不存在
		$scope.currentEditingId = -1;
		$scope.editing = function (id) {
			// 判断当是completed状态
			for (var i = 0; i < $scope.todos.length; i++) {
				if (!$scope.todos[i].completed && id === $scope.todos[i].id) {
					$scope.currentEditingId = id;
					break;
				};
			};
		};
		// 停止编辑
		$scope.save = function () {
			$scope.currentEditingId = -1;
		};
		// 全选

		$scope.toggleAll = function () {
			appService.toggleAll();
		};

		// 自定义比较函数 ,默认filter过滤器使用的模糊匹配，我们要改成严格
		$scope.equalCompare = function (source, target) {
			return source === target;
		};

		
		//路由方式
		$scope.selector = {};
		// 取出路由中匹配出的数据
		var status = $routeParams.status;
		switch(status) {
			case 'active' :
				$scope.selector = {completed:false};
				break;
			case 'completed' :
				$scope.selector = {completed:true};
				break;
			default :
			// $route，跳转链接在index.html后，不管后缀是什么// /dsafasdf,地址是什么，都把请求设置为空
				$route.updateParams({status:''});
				$scope.selector = {};
				break;
		};

	}]);

})(angular);
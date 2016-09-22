(function (angular) {
	'use strict';
	// 创建单独服务模块，和视图区分开
	var services = angular.module('app.services',[]);
	services.service('appService', ['$window',function($window){
		// 储存本地数据
		var storage = $window.localStorage;
		var todos = storage['todos_list'] ? JSON.parse(storage['todos_list']) : [];
		this.add = function (text) {
			todos.push({
				id : getId(), 
				text : text, 
				completed : false
			})
			save();
		};
		this.remove = function (id) {
			for (var i = 0; i < todos.length; i++) {
				if (todos[i].completed && id === todos[i].id) {
					todos.splice(i,1);
					break;
				};
			};
			save();
		};
		this.clear = function () {
			var arr = [];
			for (var i = 0; i < todos.length; i++) {
				if (!todos[i].completed) {
					arr.push(todos[i]);

				};
			};
			todos = arr;
			save();
			return todos;
		};
		this.existCompleted = function () {
			for (var i = 0; i < todos.length; i++) {
				if (todos[i].completed) return true;
			};
			return false;
			save();
		};
		// 更新
		this.update = function () {
			save();
		};
		var now = true;
		this.toggleAll = function () {
			for (var i = 0; i < todos.length; i++) {
				todos[i].completed = now;	
			};
			// 点完一次重置
			now = !now;
			save();
		};
		function save() {
			storage['todos_list'] = JSON.stringify(todos);
		};

		// 获取列表
		this.getTodo = function () {
			return todos;
		}

			// 获取ID
		function getId() {
			// 定义初始化ID
			var id = Math.random();
			for (var i = 0; i < todos.length; i++) {
				if (id === todos[i].id ) {
					id = getId();
				};
			}
			return id;
		};

	}]);


})(angular);
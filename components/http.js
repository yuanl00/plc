;(function (angular) {
	//angular跨域随机分配的名称不被豆瓣支持，只能自己写
	'use strict';
	var http = angular.module('moviecat.services.http',[]);
	http.service('HttpService', ['$document', '$window',function($document,$window){
		// console.log($document);
		this.jsonp = function (url,data,callback) {

				var cbName = 'jSON_callback' + Math.random().toString().replace('.','');
				var queryString = url.indexOf('?') == -1  ? '?' : url.indexOf('&') == -1 ? '&' : '';
				if(typeof data == 'function') {
					callback = data;
				} else {
					for (var key in data) {
						queryString += key + '=' + data[key] + '&';
					};
				}
				queryString += 'callback=' + cbName;

				var scriptEle = $document[0].createElement('script');
				scriptEle.src = url + queryString;

				$window[cbName] = function (data) {
					callback(data);
					$document[0].body.removeChild(scriptEle);
				}
				$document[0].body.appendChild(scriptEle);

		};


	}]);
})(angular);

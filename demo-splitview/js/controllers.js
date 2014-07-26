'use strict';

angular.module('stm.controllers', [])
theApp.value('version', '0.1');

theApp.controller('ListCtrl', ['$scope','$state','list', function($scope,$state,list) {
	$scope.list = list;
}]);

theApp.controller('DetailCtrl', ['$scope','$state','detail', function($scope,$state,detail) {
	$scope.detail = detail;
	
	$scope.gotoList = function() {
    $state.go('list.empty');				
	}
}]);

theApp.controller('SubCtrl', ['$scope','$state','sub', function($scope,$state,sub) {
	$scope.sub = sub;
}]);

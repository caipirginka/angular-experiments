'use strict';

var theApp = angular.module('stm.services', []);
theApp.value('version', '0.1');

theApp.factory('STM', ['$rootScope','$http','$state','$timeout','$window','$cacheFactory',
                       '$ionicLoading',
                       function($rootScope,$http,$state,$timeout,$window,$cacheFactory,
                      		 $ionicLoading){	
	var self = {};

	$rootScope.STM = self;			//directly expose service into scope (is this a good idea???)

	self.getList = function() {
    return [
            {'id': 0, 'value': 'Albero'},
            {'id': 1, 'value': 'Bottiglia'},
            {'id': 2, 'value': 'Cannuccia'}
            ];
	}

	self.getDetail= function(id) {
		return self.getList()[id];
	}

	return self;
}]);
'use strict';

var theApp = angular.module('stm', [
'ionic',
'pasvaz.bindonce',
'stm.services',
'stm.controllers',
]);
theApp.value('version', '0.1');
 
theApp.run(['$rootScope','$state','$window',
            '$ionicPlatform','$ionicLoading',
            'STM',
            function($rootScope,$state,$window,
            		$ionicPlatform,$ionicLoading,
            		STM) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
		$rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
		  console.log('$stateChangeStart to '+toState.name+'- fired when the transition begins. toState,toParams : \n',toState, toParams);
		});
		
		$rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams, rejection){
		  console.log('$stateChangeError to '+toState.name+'- fired when the transition errors. toState,toParams,rejection : \n',toState, toParams, rejection);
		});  
		
		$rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
		  console.log('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');
		});
		// $rootScope.$on('$viewContentLoading',function(event, viewConfig){
//		   // runs on individual scopes, so putting it in "run" doesn't work.
//		   console.log('$viewContentLoading - view begins loading - dom not rendered',viewConfig);
		// });
		$rootScope.$on('$viewContentLoaded',function(event){
//		  console.log('$viewContentLoaded - fired after dom rendered',event);
		});
		$rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
//		  console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
//		  console.log(unfoundState, fromState, fromParams);
		});		
		
		//at the last moment hide the splashscreen, if plugin exists
    if(navigator.splashscreen) {
    	navigator.splashscreen.hide();
    }    

    $state.go('list.empty');				
  });
}]);

theApp.config(['$compileProvider','$stateProvider','$urlRouterProvider', 
               function($compileProvider,$stateProvider,$urlRouterProvider) {
	//This is important to run on Cordova (for "file:" protocol is used)!!!
	$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);

	$stateProvider
    .state('list', {
      url: "/list",
      abstract: true,
	    views: {
	      'listContent' :{
	        templateUrl: "local/list.html",
	        controller: 'ListCtrl',
	      },
	    },      
      resolve: {
        'list': function(STM) {
        	return STM.getList();
        },
      },      
    })

    .state('list.empty', {
      url: "/detail/empty",
	    views: {
	      'detailContent' :{
	        templateUrl: "local/detail-empty.html",
	        controller: 'DetailCtrl',
	      }
	    },      
      resolve: {
        'detail': function() {
        	return null;
        },
      },      
    })

    .state('list.detail', {
      url: "/detail/:id",
	    views: {
	      'detailContent' :{
	        templateUrl: "local/detail.html",
	        controller: 'DetailCtrl',
	      }
	    },      
      resolve: {
        'detail': function($stateParams,STM) {
          return STM.getDetail($stateParams.id);
        },
      },      
    })
    
    .state('list.detail.sub', {
      url: "/sub",
	    views: {
	      'subContent' :{
	        templateUrl: "local/sub.html",
	        controller: 'SubCtrl',
	      }
	    },      
      resolve: {
        'sub': function($stateParams,STM) {
          return "SUB";
        },
      },      
    })
    
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/list');
}]);


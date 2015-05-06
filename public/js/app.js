/**
 * New node file
 */

var videoStore = angular.module('videoStore', ['ngRoute', 'videoStoreController']);

videoStore.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	  .when('/stream/:id', {
		 templateUrl: 'views/stream.html',
		 controller: 'videoStreamCtrl'
	  })
	  .when('/addvideo', {
		 templateUrl: 'views/addVideo.html',
		 controller: 'videoAddCtrl'
	  })
	  .when('/listvideo', {
			 templateUrl: 'views/videoList.html',
			 controller: 'videoListCtrl'
	   })
	   .otherwise("/listvideo");
		  
	
}]);
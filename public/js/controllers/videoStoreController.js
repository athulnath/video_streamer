/**
 * New node file
 */

var videoStoreController = angular.module('videoStoreController', []);

videoStoreController.controller('videoStreamCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
	$scope.id = decodeURIComponent($routeParams.id);
}]);

videoStoreController.controller('videoAddCtrl', ['$scope', function($scope) {

}]);

videoStoreController.controller('videoListCtrl', ['$scope', '$http', function($scope, $http) {

	$scope.tableFlag = true;
	
	$scope.loadFiles = function() {
		$http.get('/api/files').success(function(resp) {
			$scope.videoList = resp;
		});
	}
	
	$scope.deleteFile = function(id) {
		console.log(id);
		$http.post('/api/remove', {id: id}).success(function(resp) {
			$scope.loadFiles();
		});
	};
	
	$scope.loadFiles();
	
}]);

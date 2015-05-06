/**
 * New node file
 */

var videoStoreController = angular.module('videoStoreController', []);

videoStoreController.controller('videoStreamCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
	$scope.id = decodeURIComponent($routeParams.id);
}]);

videoStoreController.controller('videoAddCtrl', ['$scope', 'FileUploader', function($scope, FileUploader) {

	  $scope.fileUploadFlag = false;
	  
	  var uploader = $scope.uploader = new FileUploader({
          url: 'api/video/file-upload'
      });
	  
	   // CALLBACKS
      uploader.onSuccessItem = function(fileItem, response, status, headers) {
          console.info('onSuccessItem', fileItem, response, status, headers);
          $scope.fileUploadFlag = true;
      };
      uploader.onErrorItem = function(fileItem, response, status, headers) {
          console.info('onErrorItem', fileItem, response, status, headers);
      };
      uploader.onCancelItem = function(fileItem, response, status, headers) {
          console.info('onCancelItem', fileItem, response, status, headers);
      };
      uploader.onCompleteItem = function(fileItem, response, status, headers) {
          console.info('onCompleteItem', fileItem, response, status, headers);
      };
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

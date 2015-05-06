/**
 * New node file
 */

var DataManger = require("./DataManager.js");
var fs = require("fs");

function FileStreamer() {
	
	DataManger.call(this);
	
	this.saveFile = function(fileName, callback) {
		this.getGridWriteObj(fileName, function(err, gridStore) {
			if(err) {
				callback(err);
				return;
			}
			
			callback(null, gridStore);
		});	
	};
	
	this.getFile = function(fileId, callback) {
		this.getGridReaderObj(fileId, function(err, gridStore) {
			if(err) {
				callback(err);
				return;
			}
			callback(null, gridStore);
		});	
	};
	
	this.getFileList = function(callback) {
		this.getGridFileList(callback);	
	};
	
	this.deleteFile = function(fileId, callback) {
		this.unlinkFile(fileId, callback);
	}
}

module.exports = FileStreamer;
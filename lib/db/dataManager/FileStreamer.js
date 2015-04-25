/**
 * New node file
 */

var DataManger = require("./DataManager.js");
var fs = require("fs");

function FileStreamer() {
	
	DataManger.call(this);
	
	this.saveFile = function(filePath, callback) {
		this.getGridWriteObj("v1", function(err, gridStore) {
			if(err) {
				callback(err);
				return;
			}
			
			var fileStream = fs.createReadStream(filePath);
			var gridStream = gridStore.stream(true);
			
			fileStream.pipe(gridStream);
			
			fileStream.on("end", function() {
				callback(null, true);
			});
			
			fileStream.on("error", function(err){
				callback(err);
			});
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
}

module.exports = FileStreamer;
/**
 * New node file
 */

var DataManger = require("./DataManager.js");
var fs = require("fs");

function GridMangaer() {
	
	DataManger.call(this, "fs.files");
	
	this.getAllFiles = function(callback) {
		this.getCollectionObj(function(err, fileCollection) {
			if(err) {
				return callback(err);
			}
			fileCollection.find({}).toArray(function(err, files) {
				if(err) {
					return callback(err);
				}
				callback(null, files);
			});
		});
	};
}

module.exports = GridMangaer;
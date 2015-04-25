/**
 * New node file
 */

var GridStore = require("mongodb").GridStore;
var DBConnection = require("../mongodb/mongoDBConnection.js");


function DataManager(collect) {
	
	var collection = collect;
	
	this.getCollectionObj = function(callback) {
		DBConnection(function(err, db){
			if(err) {
				callback(err);
				return;
			}
			
			var collectionObj = db.collection(collection);
			callback(null, collectionObj);
		});
	};
	
	this.getGridReaderObj = function(fileId, callback) {
		DBConnection(function(err, db) {
			var gridStore = new GridStore(db, fileId, "r").open(function(err, gridStore) {
				if(err) {
					callback(err);
					return;
				}
				
				callback(null, gridStore);
			});
		});
	};
	
	this.getGridWriteObj = function(fileId, callback) {
		DBConnection(function(err, db) {
			var gridStore = new GridStore(db, fileId, "w").open(function(err, gridStore) {
				if(err) {
					callback(err);
					return;
				}
				callback(null, gridStore);
			});
		}); 
	};
	
}

module.exports = DataManager;
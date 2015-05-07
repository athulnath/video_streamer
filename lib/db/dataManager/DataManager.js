/**
 * New node file
 */

var GridStore = require("mongodb").GridStore;
var ObjectID = require("mongodb").ObjectID;
//var DBConnection = require("../mongodb/mongoDBConnection.js");
var DBConnector = require("../mongodb/DBConnector.js");


function DataManager(collect) {
	
	var collection = collect;
	var db = DBConnector.getDB();
	
	this.getCollectionObj = function(callback) {
			var collectionObj = db.collection(collection);
			callback(null, collectionObj);
	};
	
	this.getGridReaderObj = function(fileId, callback) {
			var gridStore = new GridStore(db, ObjectID.createFromHexString(fileId), "r").open(function(err, gridStore) {
				if(err) {
					callback(err);
					return;
				}	
				callback(null, gridStore);
			});
	};
	
	this.getGridWriteObj = function(fileId, callback) {
			var gridStore = new GridStore(db, fileId, "w").open(function(err, gridStore) {
				if(err) {
					callback(err);
					return;
				}
				callback(null, gridStore);
			});
	};
	
	this.getGridFileList = function(callback) {
			GridStore.list(db, function(err, list) {
				if(err) {
					callback(err);
					return;
				}	
				callback(null, list);
			});
	};
	
	this.unlinkFile = function(fileId, callback) {
			GridStore.unlink(db, ObjectID.createFromHexString(fileId), function(err) {
				if(err) {
					callback(err);
					console.log(err);
					return;
				}	
				console.log("deleted");
				callback(null, 1);
			});
	};
}

module.exports = DataManager;
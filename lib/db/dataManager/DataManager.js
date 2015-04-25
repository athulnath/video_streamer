/**
 * New node file
 */

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
	}
}

module.exports = DataManager;
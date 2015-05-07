/**
 * New node file
 */

var mongodb = require("mongodb")
  , MongoClient = mongodb.MongoClient
  , config = require("../../../config/conf.json");

function DBConnector() {
	
}

DBConnector.initDB = function() {
	var url = "mongodb://" + config.Database.host + ":" + config.Database.port + "/" + config.Database.db;
	MongoClient.connect(url, function(err, db){
		if(err) {
			console.error("can't connect to MonogoDB: " + err);
			return;
		}
		console.log("Db connected!");
		DBConnector.db = db;
	});
};

DBConnector.getDB = function() {
	
	if(typeof DBConnector.db === 'undefined') {
		DBConnector.initDB();
	}
	return DBConnector.db;
};


module.exports = DBConnector;
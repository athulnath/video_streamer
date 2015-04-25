/**
 * New node file
 */

var mongodb = require("mongodb"),
  MongoClient = mongodb.MongoClient,
  Server = mongodb.Server,
  config = require("../../../config/conf.json");

var connectionInstance;

function DBConnection(callback) {
	
	if(connectionInstance) {
		callback(null, connectionInstance);
		return;
	}
	var url = "mongodb://" + config.Database.host + ":" + config.Database.port + "/" + config.Database.db;   
	MongoClient.connect(url, function(err, db){
		if(err) {
			calback(err);
			return;
		}
		connectionInstance = db;
		callback(null, connectionInstance);
	});
}

module.exports = DBConnection;
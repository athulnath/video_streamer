/**
 * New node file
 */

var DataManger = require("./DataManager.js");


function User() {
	
	DataManger.call(this, "users");
	
	this.getData = function(name, callback) {
		this.getCollectionObj(function(err, userCollection) {
			if(err) {
				callback(err);
				return;
			}
			
			userCollection.find({name: new RegExp(name, "i")}).toArray(function(err, item) {
				if(err) {
					callback(err);
					return;
				}
				callback(null, item);
			});
		});
	}
}

module.exports = User;




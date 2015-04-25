/**
 * New node file
 */

var User = require("./lib/db/dataManager/User.js");

var userObj = new User();

userObj.getData("rebec", function(err, data) {
	if(err) {
		console.log(err);
		return;
	}
	console.log(JSON.stringify(data));
	
});
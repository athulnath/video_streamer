/**
 * New node file
 */

var router = require("express").Router();
var User = require("../lib/db/dataManager/User.js");

router.get("/user/:name", function(req, res) {
	
	var userObj = new User();
	
	userObj.getData(req.params.name, function(err, data) {
		
		if(err) {
			res.sendStatus(500);
		}
		
		res.json(data);
	});
});

module.exports = router;


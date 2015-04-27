/**
 * New node file
 */

var router = require("express").Router();
var FileStreamer = require("../lib/db/dataManager/FileStreamer.js");

router.get("/save", function(req, res) {
	var filePath = "../bin/sample.mp4";
	var fileStreamer = new FileStreamer();
	fileStreamer.saveFile(filePath, function(err, result) {
		if(err) {
			res.sendStatus(500);
			return;
		}
		if(result) {
			res.json({message: "file saved"});
		}
	});
});

router.get("/video/:id", function(req, res) {
	var fileId = req.params.id;
	var fileStreamer = new FileStreamer();
	fileStreamer.getFile(fileId, function(err, gridStore) {
		if(err) {
			res.sendStatus(500);
			return;
		}
		
		var range = req.headers.range;
		var positions = range.replace(/bytes=/, "").split("-");
		var start = parseInt(positions[0], 10);
		var total = gridStore.length;
		var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
		var chunksize = (end - start) + 1;
		
		res.writeHead(206, {
			"Content-Range" : "bytes " + start + "-" + end + "/" + total,
			"Accept-Ranges" : "bytes",
			"Content-Length" : chunksize,
			"Content-Type" : "video/mp4"
		});
		
		gridStore.seek(start, function(err, gridStore) {

			if (err) {
				res.end(err);
			}

			var stream = gridStore.stream(true);
			
			stream.on('data', function(data) {
				res.write(data);
			})
		});
		
	});
});


module.exports = router;
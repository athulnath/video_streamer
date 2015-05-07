/**
 * New node file
 */

var router = require("express").Router();
var FileStreamer = require("../lib/db/dataManager/FileStreamer.js");
var GridManager = require("../lib/db/dataManager/GridManager.js");
var multiparty = require('multiparty');
var util = require("util");
var fs = require('fs');
var path = require("path");
var MediaConverter = require("html5-media-converter");

router.get("/files", function(req, res) {
	
	var gridMangerObj = new GridManager();
	gridMangerObj.getAllFiles(function(err, list) {
		if(err) {
			res.sendStatus(500);
			return;
		}
		res.json(list);
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

router.post("/video/file-upload", function(req, res) {
	  var form = new multiparty.Form();
	  
	  form.on('error', function(err) {
		  console.log('Error parsing form: ' + err.stack);
	  });

	  form.on('part', function(part) {
		var fileStreamer = new FileStreamer();
				
		if(!part.filename) {
			part.resume();
		}
		
		var filename = path.basename(part.filename, path.extname(part.filename));
//		var mc = new MediaConverter({ videoFormats: ['mp4'] });
//		var converter = mc.asStream("200x200");
		fileStreamer.saveFile(filename, function(err, gridStore) {
			var gridStream = gridStore.stream(true);
			part.pipe(gridStream);
//			part.pipe(converter).pipe(stream);
			
//			part.pipe(converter).map(function(stream) {
//			    stream.pipe(gridStream);
//			});
		});
	    
	  });
	  
	  form.on('close', function() {
		  console.log('Upload completed!');
		  res.setHeader('content-type' , 'text/plain');
		  res.end('Received files');
	 });
	  
	  
	  form.parse(req);  
});

router.post("/remove", function(req, res) {
	var fileStreamer = new FileStreamer();
	var fileId = req.body.id;
	fileStreamer.deleteFile(fileId, function(err, flag) {
		
		if(err) {
			res.sendStatus(500);
			return;
		}
		
		res.json({message : "OK"});
		
	});
	
});

module.exports = router;
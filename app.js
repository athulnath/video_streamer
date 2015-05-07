/**
 * New node file
 */

var cluster = require("cluster"),
  numCPU = require("os").cpus().length,
  workers = {},
  express = require("express"),
  config = require("./config/conf.json"),
  userRouter = require("./router/User.js"),
  Stream = require("./router/Stream.js"),
  bodyParser = require("body-parser"),
  path = require("path"),
  DBConnector = require("./lib/db/mongodb/DBConnector.js");

		
function App() {
	
	this.init = function() {
		var app = express();
		app.set("port", process.env.PORT || config.App.port);
		
		app.use(express.static("../public"));
		app.use(bodyParser.urlencoded({ extended: false }));
		app.use(bodyParser.json());
	
		DBConnector.initDB();
	
		
		app.get("/", function(req, res){
			res.json({message: "OK"});
		});
		
		app.use("/api", [userRouter, Stream]);
		
		app.listen(app.get("port"), function() {
			console.log("application running on @localhost:%d", app.get("port"));
		});
	}
	
	this.start = function() {
		if(cluster.isMaster) {
			for(var i = 0; i < numCPU; i++) {
				var worker = (cluster.fork());
				workers[worker.process.pid] = worker;
			}
			
			cluster.on("disconnect", function(worker) {
				console.log("worker %d disconnected", worker.process.pid);
				worker = (cluster.fork());
				workers[worker.process.pid] = worker;
			});
		} else {
			this.init();
		}
	}
}

module.exports = App;
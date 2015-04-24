/**
 * New node file
 */

var cluster = require("cluster"),
  numCPU = require("os").cpus().length,
  workers = {},
  express = require("express"),
  config = require("./config/conf.json");
		
function App() {
	
	this.init = function() {
		var app = express();
		app.set("port", process.env.PORT || config.App.port);
		
		app.get("/", function(req, res){
			res.json({message: "OK"});
		});
		
		app.listen(app.get("port"), function() {
			console.log("application running on @localhost:%d", app.get("port"));
		});
	}
	
	this.start = function() {
		if(cluster.isMaster) {
			for(var i = 0; i < numCPU; i++) {
				var worker = (cluster.fork());
				workers[worker.pid] = worker;
			}
			
			cluster.on("disconnect", function(worker) {
				console.log("worker %d disconnected", worker.pid);
				cluster.fork();
			});
		} else {
			this.init();
		}
	}
}

module.exports = App;
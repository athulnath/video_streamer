/**
 * New node file
 */

var cluster = require("cluster"),
  numCPU = require("os").cpus().length,
  workers = {},
  express = require("express"),
  config = require("./config/conf.json"),
  userRouter = require("./router/User.js");
		
function App() {
	
	this.init = function() {
		var app = express();
		app.set("port", process.env.PORT || config.App.port);
		
		app.use(express.static("../public"));
		
		app.get("/", function(req, res){
			res.json({message: "OK"});
		});
		
		app.use("/api", userRouter);
		
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

			console.log(workers);
			
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
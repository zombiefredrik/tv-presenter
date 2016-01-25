function handleHTTP(req,res) {
	if(req.method === "GET"){
		if(/^\/$/.test(req.url)) {
			res.writeHead(200, { "Content-type":"text/html"});
			res.write("<html><head>");
			res.write("<head><meta http-equiv=\"refresh\" content=\"60; url=\"/\"> ");
			res.write("<link rel=\"stylesheet\" href=\"res/style.css\">");
			res.write("<script src=\"https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js\"></script>");
			res.write("<script src=\"res/presenter.js\"></script>");
			res.write("<title>TV-presenter</title>");
			res.write("</head><body>");
			res.write("<div id='target_1'></div>");
			res.write("<div id='target_2'></div>");
			res.write("</body></html>");
			res.end();

		}
		else if(/^\/(media|res)\/(.*)/.test(req.url)) {
			req.addListener("end",function(){
				static_files.serve(req,res);
			});
			req.resume();
		}
		else if(/^\/getFiles/.test(req.url)) {
			res.writeHead(200, { "Content-type":"application/json"});
			res.write(JSON.stringify(listFiles()));
			res.end();
		}
	}
}

function listFiles() {
	return cleanFiles(fs.readdirSync('./media/'));
}

function cleanFiles(files) {
	for (var key in files) {
		//since i run this on a disk-station, remove @eaDir
  		if (files[key] == '@eaDir') files.splice(key, 1);
  		//crappy macos-file
  		if (files[key] == '.DS_Store') files.splice(key, 1);
	}
	return files;
}

var port = "8006";
var http = require("http");
var http_serv = http.createServer(handleHTTP).listen(port);
var fs = require('fs');
var node_static = require("node-static");
var static_files = new node_static.Server("./");
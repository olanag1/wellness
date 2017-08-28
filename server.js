// set up ========================
  var express = require('express');
  var app = express();
  var httpServer = require('http').Server(app);
  var io = require('socket.io')(httpServer);
  var bodyParser = require('body-parser');
  var fs = require("fs");
 
// web configuration =================
    app.use(express.static(__dirname + '/public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

// io connection ===================================
    io.on('connection', function(socket) {
    	// what to do if something gets connected
    	console.log('connected');
	
	socket.on('imageRequest',function(imgData) {
	    processOpenCv(imgData, function(cvResult) {
	      socket.emit('opencvResponse',cvResult);
	    });	    
	});
	
    	socket.on('disconnect', function(socket) {
    		// what to do if something gets disconnected
    		// TODO: detect if it is the nodePlug that gets disconnected. If so, generated plugState=false for each plug in database to notify webpages
        });
    });
    

    io.on('error', function(exception) {
        console.log('SOCKET ERROR : ' + exception);
    });

    
// listen ======================================
    httpServer.listen(3000, function(){
    	console.log("WebApp listening host on port 3000");
    });


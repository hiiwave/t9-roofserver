var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 5000;

server.listen(port, function() {
  console.log("Express server listening on port %d", server.address().port);
});

app.use(bodyParser.json());
app.use(express.static('public'));

io.on('connection', function (socket) {  // connection setup for monitor.html
	console.log("A user connencted");
	socket.emit('msg1', 'welcome');
	socket.on('disconnect', function() {
		console.log("A user disconnect");
	})
});



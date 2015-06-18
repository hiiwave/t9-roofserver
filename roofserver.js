var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 5001;

server.listen(port, function() {
  console.log("Express server listening on port %d", server.address().port);
});

var reqHandlers = {
  monitorHandler: function(socket) {
    var monitorAgent = { 
      init: function() {
        console.log('A monitor connected');
        var intervalId = this.updateClock();
        socket.on('disconnect', function() {
          console.log('monitor disconnected'); 
          clearInterval(intervalId);
        });
      },
      updateClock: function() {
        socket.emit('date', {'date': new Date()});
        return setInterval(function() { 
          socket.emit('date', {'date': new Date()});
          // console.log("My port is " + process.env.PORT);
        }, 1000);
      },
    };
    monitorAgent.init(); 
  }
};

app.use(bodyParser.json());
app.use(express.static('public'));

io.on('connection', function (socket) {  // connection setup for monitor.html
	reqHandlers.monitorHandler(socket);
});



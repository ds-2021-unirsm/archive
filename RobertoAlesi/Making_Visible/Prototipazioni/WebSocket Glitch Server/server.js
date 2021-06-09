// Webserver
var express = require('express');
var app = express();
app.use(express.static('public'));

app.get("/", function(req, res) {
  res.redirect("/index.html");
});

var httpServer = require('http').createServer(app);
httpServer.listen(process.env.PORT);

// Socket Server
// WebSockets funziona con HTTP server
var io = require('socket.io').listen(httpServer);

// Callback che viene aviata quando viene individuata una nuova connessione
// Questo funziona per ogni singolo utente
io.sockets.on('connection', 
	// Oggetto websocket
	function (socket) {
		console.log("We have a new client: " + socket.id);
		var id = socket.id;
    io.sockets.emit('userid', id);
    
    socket.on('generic_message', function(data) {
      console.log("generic_message:" + data);
      // lo invio a tutti i client
			io.sockets.emit('generic_message', data);
      });		
		
		socket.on('disconnect', function() {console.log("Client has disconnected " + socket.id);});
	}
);

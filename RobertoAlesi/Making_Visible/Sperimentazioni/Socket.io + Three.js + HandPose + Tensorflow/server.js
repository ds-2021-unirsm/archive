// qui i dati vengono inviati da tutti

const express = require("express");
const app = express();
var server = app.listen(process.env.PORT || 300);

// prende tutti i file presenti nella cartella public
app.use(express.static("public"));

var io = require('socket.io')(server);

var serverData = {};

function newConnection(socket){
	console.log('new connection: ' + socket.id);
  
  socket.on('client-update', onClientUpdate);
	socket.on('disconnect', onClientExit);
  
	function onClientUpdate(data){
    serverData[socket.id] = data;
    
  socket.emit('server-update', serverData);
	}
  
	function onClientExit(){
    delete serverData[socket.id];
    console.log(socket.id+' disconnected');
	}
}	


io.sockets.on('connection', newConnection);


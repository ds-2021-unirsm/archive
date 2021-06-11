//  ______  ____  ___  _______  __________ ______ ____ ______________
//  __/ _ \/ __ \/ _ )/ __/ _ \/_  __/ __ \ _/ _ |_/ /__/ __/ __/  _/
//  _/ , _/ /_/ / _  / _// , _/ / / / /_/ / / __ |/ /__/ _/_\ \_/ /
//  /_/|_|\____/____/___/_/|_| /_/  \____/ /_/ |_/____/___/___/___/
//
// -
// 3D Object Hand Control 0.1 by Roberto [hand, controls, sphere, 3D]
// 2021 © Roberto @ciunart, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete — github.com/RobertoAlesi
// Educational purposes, MIT License, 2021, San Marino
// —
//
// Credits/Thanks to:
// networked-handpose-glitch, LingDong for
// https://github.com/LingDong-/handpose-facemesh-demos
// https://github.com/LingDong-/handpose-facemesh-demos/tree/master/networked-hand-3js-tf174-handv1
// —
//

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


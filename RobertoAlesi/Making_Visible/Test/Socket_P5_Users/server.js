var users = [];

function User(id, x, y, l) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.l = l;
}

// Using express: http://expressjs.com/
var express = require('express');
// Create the app
var app = express();

//var socket = require('socket.io');

var server = app.listen(process.env.PORT || 3000, listen);


// call back che ci informa quando il server è connesso
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

app.use(express.static('public'));

console.log("My socket server is running");

//Web Socket Portion
var io = require('socket.io')(server);


setInterval(heartbeat, 33);

function heartbeat() {
  io.emit('heartbeat', users);
}

//Callback che viene avviata quando entra un nuovo utente
//succede per ogni utente che si connette individualmente
io.on('connection',
  function(socket) {
    console.log('made socket connection: ' + socket.id);

    socket.on('start', function(data) {
    //  console.log(socket.id + ' ' + data.x + ' ' + data.y + ' ' + data.l);
      var user = new User(socket.id, data.x, data.y, data.l);
      users.push(user);
    });

    socket.on('update', function(data) {

      var user;
      for (var i = 0; i < users.length; i++) {
        if (socket.id == users[i].id) {
          user = users[i];
        }
      }
      user.x = data.x;
      user.y = data.y;
      user.l = data.l;
    });


    socket.on('disconnect', function() {
      console.log("Il client si è disconnesso");

    });
  });

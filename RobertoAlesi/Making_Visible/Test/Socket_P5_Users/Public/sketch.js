//tieni traccia della connessione del socket
var socket;
var user;
var users = [];
var zoom = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);

//inizia una connessione socket con il server
  socket = io.connect('http://localhost:3000');

//viene creato un nuovo utente
  user = new User(random(width), random(height), random(8,24));

  var data = {
    x: user.pos.x,
    y: user.pos.y,
    l: user.l
  };

  socket.emit('start', data);

  socket.on('heartbeat', function(data){
  users = data;
 });
}

function draw() {
  background(0);

  console.log(user.pos.x, user.pos.y);

  translate(width / 2, height / 2);

//zoom di inizializzazione
  var newzoom = 64 / user.l;
  zoom = lerp(zoom, newzoom, 0.2);
  scale(zoom);
  translate(-user.pos.x, -user.pos.y);

  for (var i = users.length-1; i >= 0; i--) {
    var id = users[i].id;

    if (id.substring(2, id.length) !== socket.id) {
       fill(190, 0, 180);
       ellipse(users[i].x, users[i].y, users[i].l*2, users[i].l*2);

       fill(255);
       textAlign(CENTER);
       textSize(4);
       text(users[i].id, users[i].x, users[i].y + users[i].l);
      }
    }

user.show();

if (mouseIsPressed){
  user.update();
}

user.constrain();

  var data = {
    x: user.pos.x,
    y: user.pos.y,
    l: user.l
  };

 socket.emit('update', data);
}

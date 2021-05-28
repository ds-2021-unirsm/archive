var socket;
var users = [];
var col = []
var colore = [0,255,255];
var d = []
var dim = 20;

function setup() {
  background(0);
  createCanvas(w = windowWidth, h = windowHeight);

  socket = io.connect("https://disegni-diversi.glitch.me/");
			
  socket.on('connect', function() {
    console.log("Connected");
  });
  
     socket.on('userid', function (id) {

   });
  

  
  // Viene ricevuto dal server
  socket.on('generic_message', function (data) {
    fill(data.col)
      ellipse(data.x, data.y, data.d, data.d);
   });
  
 
}

function draw() {
       
}


function mousePressed() {
  ellipse(mouseX, mouseY, dim, dim);
  socket.emit("generic_message", {x: mouseX, y: mouseY, col: colore, d: dim});
}

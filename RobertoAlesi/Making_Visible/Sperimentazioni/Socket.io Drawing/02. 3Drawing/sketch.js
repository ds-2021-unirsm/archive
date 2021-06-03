var socket;
var font;

var bonne;
var r = 0;

var parole = []
var x = []
var y = []
var z = []
var col = []
var colore = [120,0,255];
var d = []
var dim = 20;

function preload() {bonne = loadFont('Bonne.ttf');}

function setup() {
  createCanvas(w = windowWidth, h =windowHeight, WEBGL);

  
  
  
  socket = io.connect("https://disegni-diversi.glitch.me/");

  socket.on('connect', function() {
    console.log("Connected");
   });

     socket.on('userid', function (id) {
     console.log(id);
   });
  

  
  // Viene ricevuto dal server
  socket.on('generic_message', function (data) {
    //console.log(data);
    push()
    noStroke();
    specularMaterial(data.col);
    translate(data.x, data.y, data.z);
    sphere(dim);
    pop()
    
  });
}

function draw() {
  translate(-w/2,-h/2)
  lights();
  }

  
function mouseMoved() {
  socket.emit("generic_message", {x: mouseX, y: mouseY, col: colore,d: dim});
}

//  ______  ____  ___  
//  __/ _ \/ __ \/ _ )
//  _/ , _/ /_/ / _  / 
//  /_/|_|\____/____/ 
//
// —
// Voice_Control 0.1 by Roberto [voice, control, cube, 3d, nointerface]
// 2021 © Roberto @ciunart, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm
// github.com/ds-2021-unirsm — github.com/fupete — github.com/RobertoAlesi
// Educational purposes, MIT License, 2021, San Marino
// —
//
// Credits/Thanks to:
// Agar.io, Daniel Shiffman for
// https://github.com/CodingTrain/website/tree/main/Node/sockets
// https://www.youtube.com/watch?v=i6eP1Lw4gZk
// original license: MIT License
//
// Agar.io, Daniel Shiffman for
// https://thecodingtrain.com/CodingChallenges/032.2-agario-sockets.html
// https://github.com/CodingTrain/website/tree/main/CodingChallenges/CC_032.2_agar.io_sockets
// https://youtu.be/ZjVyKXp9hec
// original license: MIT License
// —
//
// Help:
// [muovi il mouse] -> disegna
// —

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

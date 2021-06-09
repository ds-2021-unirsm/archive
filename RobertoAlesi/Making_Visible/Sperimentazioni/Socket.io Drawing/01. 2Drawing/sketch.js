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
// [click] -> disegna
// —

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

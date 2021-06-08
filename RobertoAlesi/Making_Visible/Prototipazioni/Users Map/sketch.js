//  ______  ____  ___  _______  __________
//  __/ _ \/ __ \/ _ )/ __/ _ \/_  __/ __ \
//  _/ , _/ /_/ / _  / _// , _/ / / / /_/ /
//  /_/|_|\____/____/___/_/|_| /_/  \____/
//
// -
// Users Map 0.1 by Roberto [users, map, 3D, connection, socketid]
// 2021 © Roberto @ciunart, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete — github.com/RobertoAlesi
// Educational purposes, MIT License, 2021, San Marino
// —
//
// Help:
// [mouse] ruota liberamente la mappa degli utenti
//
// —   

var socket;
var font;

var bonne;

var r = 0;
var parole = []
var x = []
var y = []
var z = []

function preload() {bonne = loadFont('Bonne.ttf');}

function setup() {
  createCanvas(w = windowWidth, h =windowHeight, WEBGL);

  //////testo
  textFont(bonne);
  textSize(20);
  textAlign(CENTER, CENTER);
  
  socket = io.connect("https://disegni-diversi.glitch.me/");

  socket.on('connect', function() {
    console.log("Connected");
   });

     socket.on('userid', function (id) {
     console.log(id);
     parole.push(id);
     mostra_parole(parole)
   });
  

  
  // Viene ricevuto dal server
  socket.on('generic_message', function (data) {
    //console.log(data);
    push()
    noStroke();
    translate(data.x, data.y, data.z);
    sphere(15);
    pop()
    
  });
}

function draw() {
  background(0);
  //translate(-w/2,-h/2)
  orbitControl();
  lights();
  rotateY(r)
//////setup inserimento del testo
  mostra_parole(parole)

 //////rotazione mind map
  r += 0.005;
}

  
////////parole collegate e collegamenti
function mostra_parole(parole) {
     //translate(width / 2, height / 2);
     textSize(15)
     push();
    
  for (var j = 0; j < parole.length; j++){
     if (z.length <= parole.length){
      x.push(random(-250,250));
      y.push(random(-250,250));
      z.push(random(-250,250));
    }
  }
  
  for (var i = 0; i < parole.length; i++) {
      fill(0)
      stroke(255)
      strokeWeight(1)
        var v = createVector(x[i], y[i], z[i]);
        var v1 = createVector(x[i-1], y[i-1], z[i-1]);
        var v2 = createVector(x[i+1], y[i+1], z[i+1]);
                //line(0, 0, 0, v.x, v.y, v.z);
        if (i>0){
                line(v1.x,v1.y, v1.z, v.x, v.y, v.z);
          }
        if (i<parole.length-1){
                line(v2.x,v2.y, v2.z, v.x, v.y, v.z);}
        fill(255)
     push()
        translate(v.x, v.y, v.z+10)
        noStroke();
        text(parole[i], 0, -20, 0);
      pop()
       
     push()
        translate(v.x, v.y, v.z)
        sphere(5);
      pop()

   
      }
    
    pop();

}

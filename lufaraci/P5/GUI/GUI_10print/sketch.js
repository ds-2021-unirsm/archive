// —
// 10Print - variazione 3 by lufaraci [10print, random, color]
// 2021 © Lucrezia Faraci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/lufaraci
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to: 
// Daniel Shifftman
// Github: https://github.com/CodingTrain
// —

let parametri = {
  modulo : 50,
  spessore: 4,
  coloresfumatura : [51,71,126],
  trasparenza: 5,
  stop:false,
  avvia:false,
};

window.onload = function() {
  
  var gui = new dat.GUI();//Crea la GUI
    gui.add(parametri, 'modulo', 5, 100);
    gui.add(parametri, 'spessore', 1, 10);
    gui.addColor(parametri, 'coloresfumatura');
    gui.add(parametri, 'trasparenza',0,100);
    gui.add(parametri, 'stop');
}
  
  
let x = 0;
let y = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  
  if(parametri.stop){
  noLoop();
  }

  stroke(255);

  push();
  translate(x,y);
  noStroke();
  fill(parametri.coloresfumatura,parametri.trasparenza);
  rect(0,0,width,height);
  strokeWeight(parametri.spessore);
  stroke(255);
  //applicare una funzione di probabilità
  if(random(1)<0.5){
  line(0,0,parametri.modulo,parametri.modulo);
  }else{
  line(0,parametri.modulo,parametri.modulo,0);
  }
  pop();

  x = x + parametri.modulo;
  
  if(x>width){
  x = 0;
  y = y + parametri.modulo;
  }
  if(y>height){
    x = 0;
    y = 0;
  }

}
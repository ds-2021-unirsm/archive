// 10PRINT
// Variazione 1
// Andrea Castellucci

let x = 0;
let y = 0;
let modulo = 50;
var y1 = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  translate(x,y);
  stroke(255);
  strokeWeight(2);
  fill(255, 255, 255, 50);
  
  beginShape();
  
  // definizione primo vertice della Shape
  noStroke();
  var rndm = random(1);
  if( rndm < 0.5){
    vertex(0,modulo);
  } else{
    vertex(0,0);
  }
  
  // generazione vertici della Shape
  // disegno punti che formano la curva bianca
  for(var i=0; i<=modulo; i++){
    noStroke();
    vertex(i,map(noise(y1), 0,1, 0,modulo));
    stroke(255);
    point(i,map(noise(y1), 0,1, 0,modulo));
    y1+=0.005;
  }
  
  // definizione ultimo vertice della Shape
  noStroke();
  if( rndm < 0.5){
    vertex(modulo,modulo);
  } else{
    vertex(modulo,0);
  }
  endShape();
  
  if(x<width){
    x+=modulo;
  } else{
    x=0;
    y+=modulo;
  }
}

// Generatore di pattern 0.1 by Mariangela Catucci [pattern, color, click, square, circle]
// 2021 © Mariangela @MariangelaCatucci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
//
// —
//
// Help:
// [mousePressed] pattern di rettangoli
// [mouseReleased] pattern di cerchi
//
//-

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  background(255);  
  noStroke();
}

function mousePressed() {
  background(255);
  creaRettangoli();
}

function mouseReleased(){
  background(255);
  creaCerchi();
}

function creaRettangoli() {
  for (x=0; x<windowWidth; x=x+60) {
    for (y=0; y<windowHeight; y=y+60) {
      fill(randomColor());
      
      let latoCanvas = round(random(0, 3));
      let pos = round(random(0, 50));
      
      //lato in alto
      if (latoCanvas == 0) {
        beginShape();
        vertex(x, y);
        vertex(x+80, y);
        vertex(x+80, y+80-pos);
        vertex(x, y+80-pos);
        endShape(CLOSE);
      } 
       //lato destro
      else if (latoCanvas == 1) {
        beginShape();
        vertex(x+pos, y);
        vertex(x+50, y);
        vertex(x+50, y+50);
        vertex(x+pos, y+50);
        endShape(CLOSE);
      } 
      //lato in basso
      else if (latoCanvas == 2) {
        beginShape();
        vertex(x, y+pos);
        vertex(x+50, y+pos);
        vertex(x+50, y+50);
        vertex(x, y+50);
        endShape(CLOSE);
      } 
      //lato sinistro
      else if (latoCanvas == 3) {
        beginShape();
        vertex(x, y);
        vertex(x+60-pos, y);
        vertex(x+60-pos, y+60);
        vertex(x, y+60);
        endShape(CLOSE);
      }
    }
  }
}


function creaCerchi() {
  for (x=0; x<windowWidth; x=x+60) {
    for (y=0; y<windowHeight; y=y+60) {
      fill(randomColor());
      
      let latoCanvas = round(random(0, 3));
      let pos = round(random(0, 50));
      
 if (latoCanvas == 0) {
        ellipse(x+80, y+80-pos, 20, 20);
      } 
       // right
      else if (latoCanvas == 1) {
ellipse(x+50, y+50-pos, 40, 40);
      } 
      // bottom
      else if (latoCanvas == 2) {
ellipse(x+50, y+50-pos, 40, 40);
      } 
      // left
      else if (latoCanvas == 3) {
ellipse(x+60, y+60-pos, 50, 50);
      }
    }
  }
}

function randomColor() {
  let colori = ['#0346fe','#11265e','#07163e','#02010f', '#fc9904'];
  let prende = round(random(0, 4));
  return colori[prende];
}
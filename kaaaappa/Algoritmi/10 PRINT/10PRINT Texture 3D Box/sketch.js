// — 
// █▄▀ ▄▀█ █▀█ █▀█ ▄▀█
// █░█ █▀█ █▀▀ █▀▀ █▀█
//
// 10Print Trippy Box by kaappa
// 2021 © Carmen Ianiro, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/kaaaappa
// Educational purposes, MIT License, 2021, San Marino
// —


let x = 0;
let y = 0;
let art;
let angle = 0;
let index = 0;

function setup() {
  createCanvas(720, 500, WEBGL);
  art = createGraphics(400, 400);
  art.background(0);
}

function draw() {
  background(0);
  orbitControl();


    
     if (random(1) > 0.5) {
       
    art.strokeWeight(4);
    art.stroke(255);
    art.line(x, y, x+20, y+20);
    
    
  } 
  else {
    art.strokeWeight(4);
    art.stroke(0, 255, 202);
    art.line(x, y+20, x+20, y);
    //texture(art)
  }

 texture(art)
 
  x += 20;
  if (x > art.width) {
    x = 0;
    y += 20;
  }

  if (y > art.height) {
   art.background(0);
    x = 0;
    y = 0;
    
  }

  rotateX(angle);
  rotateY(angle);
  rotateZ(angle);
  box(200);
  angle += 0.006;

}

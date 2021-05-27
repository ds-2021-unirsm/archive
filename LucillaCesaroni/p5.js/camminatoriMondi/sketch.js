//         ___       ________     
//        |\  \     |\   ____\    
//        \ \  \    \ \  \___|    
//         \ \  \    \ \  \       
//          \ \  \____\ \  \____  
//           \ \_______\ \_______\
//            \|_______|\|_______|
                                  
// -
//
// Camminatori che disegnano mondi, scappano by Lucilla Cesaroni [mouse X, mouseY]
// 2021 Lucilla @LucillaCesaroni, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm - github.com/fupete - github.com/LucillaCesaroni 
// Educational purposes, MIT License, 2021, San Marino
//
// —
//
// Help:
// [mouseY] position
// [mouseX] position
//
// —

let w, h;
let c = [];
let quanti = 500;

function setup() {
  createCanvas(w = windowWidth, h = windowHeight);

  for (var i = 0; i < quanti; i++) {
    c.push(new Camminatore(i));
  }
}

function draw() {
  background(0, 10); // nero con opacità 40

  let x2 = mouseX;
  let y2 = mouseY;
  fill(0, 0, 255);
  noStroke();
  ellipse(x2, y2, 30, 30);

  for (let i = 0; i < quanti; i++) {
    c[i].move();
    c[i].display();
  }
}

function Camminatore(_id) {
  this.id = _id;
  this.x = w / 2;
  this.y = h / 2;
  this.diametro = random(5, 10);
  this.colore = random(255);

  this.move = function() {

    let xStep = random(-3, 3);
    let yStep = random(-3, 3);
    this.x += xStep;
    this.y += yStep;

    let d = dist(this.x, this.y, mouseX, mouseY);

    if (d <= 30) { // scappano quando la distanza tra la pallina blu e i camminatori è < di 30
      this.x += random(-40, 40); // si posizionano casualmente tra -40 e 40 nella x e nella y
      this.y += random(-40, 40);
    }
  }

  this.display = function() {
    stroke(this.colore);
    noFill();
    ellipse(this.x, this.y, this.diametro, this.diametro);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

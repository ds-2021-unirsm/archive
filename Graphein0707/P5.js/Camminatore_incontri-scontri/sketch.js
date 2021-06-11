// -
// Camminatori incontri-scontri 0.1 by GaiaAndruccioli [Camminatori, incontri-scontri]
// 2021 © GaiaAndruccioli, Daniele @Fupete, Irene @iretrtr and the course DS-2021 at DESIGN.unirsm,
// github.com/ds-2021-unirsm — github.com/fupete - github.com/Graphein0707
// Educational purposes, MIT License, 2021, San Marino
// —

let w, h;
let c = [];

function setup() {
  createCanvas((w = windowWidth), (h = windowHeight));

  for (var i = 0; i < 6; i++) {
    c[i] = new Walker((w = width), (h = height));
  }
}

function draw() {
  background(50, 200, 255);

  for (var i = 0; i < c.length; i++) {
    c[i].move();
    c[i].display();

    for (var k = 0; k < c.length; k++) {
      //finchè i non corrisponde a k (i != j), quindi la bolla non controlla se stessa e si interseca con un'altra allora cambia colore
      if (i != k && c[i].intersezione(c[k])) {
        c[k].changeShape();
        c[k].changeColor();
      }
    }
  }
}

function Walker(x, y) {
  this.x = x;
  this.y = y;
  this.r = 10;
  this.col = 255; //colore iniziale
  this.t = random(10);

  this.changeColor = function () {
    this.col = color(255, random(30), random(250));
  };

  this.changeShape = function () {
    this.r = random(10, 100);
  };

  this.intersezione = function (seconda) {
    var d = dist(this.x, this.y, seconda.x, seconda.y);
    //se la distanza fra i due oggetti è inferiore alla somma dei raggi dei due oggetti allora si intersecano
    if (d < this.r + seconda.r) {
      this.t += 0.02; //quando si intersecano aumenta la velocità
      return true;
    } else {
      return false;
    }
  };
  //move
  this.move = function () {
    this.x = noise(this.t + 1) * w;
    this.y = noise(this.t) * h;
    this.t += 0.001; //incremento
  };
  //display
  this.display = function () {
    noStroke();
    fill(this.col);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  };
}

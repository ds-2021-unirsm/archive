// -
// Camminatore mondi 0.2 by Gaia Andruccioli [Camminatori, mondi]
// 2021 © Gaia Andruccioli, Daniele @Fupete, Irene @iretrtr and the course DS-2021 at DESIGN.unirsm,
// github.com/ds-2021-unirsm — github.com/fupete - github.com/Graphein0707
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to: Nature fo Code
//https://natureofcode.com/book/chapter-1-vectors/
//
// Help:
// camminatore che segue il movimento del mouse
//-

let movers = [];
let num = 5;
let d = 0.2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  blendMode(ADD);
  
  smooth();
  background(0);
  for (var i = 0; i < num; i++) {
    movers[i] = new Mover();
    ellipseMode(CORNERS);
  }
}

function draw() {

  for (var i = 0; i < num; i++) {
    movers[i].move();
    movers[i].edges();
    movers[i].display();
  }
}

function Mover(x, y) {

  this.location = createVector(10, 10);
  this.velocity = createVector(0, 0);
  this.speed = 2;

  //move
  this.move = function() {

    var mouse = createVector(mouseX, mouseY);
    this.dir = p5.Vector.sub(mouse, this.location);
    this.dir.normalize(); //normalizza
    this.dir.mult(0.2); //scala

    this.acceleration = this.dir;

    //La velocità cambia con l'accellerazione
    //La posizione cambia con la velocità
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.speed);
    this.location.add(this.velocity);
  }

  //display
  this.display = function() {
    stroke(random(255), 20, random(255), 20);
    strokeWeight(0.5);
    noFill();
    ellipse(this.location.x, this.location.y, d);
  }

  //bordi
  this.edges = function() {

    if (this.location.x > width) {
      this.location.x = 0;
    } else if (this.location.x < 0) {
      this.location.x = width;
    }

    if (this.location.y > height) {
      this.location.y = 0;
    } else if (this.location.y < 0) {
      this.location.y = height;
    }
  }
}

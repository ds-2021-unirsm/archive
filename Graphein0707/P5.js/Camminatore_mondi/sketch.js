//https://natureofcode.com/book/chapter-1-vectors/
//ultimo esempio di camminatori che seguono il mouse con vettori 
//codice portato su p5

let movers = [];
let num = 5;
let d = 70;

function setup() {
  createCanvas(windowWidth, windowHeight)
  smooth();
  background(0);
  for (var i = 0; i < num; i++) {
    movers[i] = new Mover();
  }
}

function draw() {
  //background(255);

  for (var i = 0; i < num; i++) {
    movers[i].move();
    movers[i].edges();
    movers[i].display();
  }
}

function Mover(x, y) {

  this.location = createVector(random(width), random(height));
  this.velocity = createVector(0, 0);
  this.speed = 5;

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
    stroke(random(255), 0, random(255), 30);
    strokeWeight(3);
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
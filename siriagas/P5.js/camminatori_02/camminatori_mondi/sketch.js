// Camminatori che generano mondi Siria GAsperoni

let movers = [];
let num = 300;
let dim = 0.5;

var colors = [
  "#69d2e7",
  "#a7dbd8",
  "#0000ff",
  "#f38630",
  "#00ffff"
]

function setup() {
  createCanvas(800, 800);
  blendMode(ADD);

  background(0);
  for (var i = 0; i < num; i++) {
    movers[i] = new Mover();
    ellipseMode(RADIUS);
  }
}

function draw() {


  for (var i = 0; i < num; i++) {
    movers[i].update();
    movers[i].display();
  }
}

function Mover(x, y) {

  this.location = createVector(random(width), random(height));
  
  this.velocity = createVector(6, 6);
  this.topspeed = 5;

  this.update = function() {

    var mouse = createVector(mouseX, mouseY);
    this.dir = p5.Vector.sub(mouse, this.location);
    //Normalizzare il vettore
    this.dir.normalize();
    //Scalare il vettore
    this.dir.mult(0.1);
    //accellererazoione
    this.acceleration = this.dir;

    // la velocità cambia in base all'accellerazione e la posizione cambia in base alla velocità
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.location.add(this.velocity);

  }

  // mostra i camminatori
  this.display = function() {
   stroke(random(colors));
    

    fill(random(colors))
    ellipse(this.location.x, this.location.y, dim);

  }

  //bordi canvas

  this.sponde = function() {

    if (location.x > width) {
      location.x = 0;
    } else if (location.x < 0) {
      location.x = width;
    }

    if (location.y > height) {
      location.y = 0;
    } else if (location.y < 0) {
      location.y = height;
    }
  }
}
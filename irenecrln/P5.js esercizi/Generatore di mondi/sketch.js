const num = 190;
let walker = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  t = 0;
  //creo dei camminatori con colori e diametri diversi 
  for (let i = 0; i < num; i++) {
    var R = 138 * noise(t + 90);
    var G = 43 * noise(t + 20);
    var B = 226 * noise(t + 50);
    var radRand = random(2, 20);
    t += 70;
    walker[i] = new Walker(R, G, B, radRand);

  }

}

function draw() {
  for (var i = 0; i < num; i++) {
    walker[i].display();

  }

}

function Walker(r, g, b, raggio) {

  this.position = createVector(width / 2, height / 2); //li faccio partire dal centro del canvas
  this.R = r;
  this.G = g;
  this.B = b;
  this.rad = raggio;


  //////////////////
  /////Display/////
  ////////////////
  this.display = function() { //creo i vettori
    for (let i = 0; i < 10; i++) {
      this.velocity = createVector(random(-1, 1), random(-1, 1));
      this.position.add(this.velocity);
      noStroke();
      fill(this.R, this.G, this.B, 10);
      noSmooth();
      ellipse(this.position.x, this.position.y, this.rad, this.rad);
    }
  }

}
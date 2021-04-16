// Camminatori che generano mondi 3
// Sketch di Andrea Castellucci

let world
let quanti = 10;
var walkers=[];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(0);

  world = 400;
  
  for (var i = 0; i < quanti; i++) {
    walkers.push(new Walker(i));
  }
}

function draw() {
  orbitControl();
  lights();
  
  translate(-world/2,-world/2,mouseX/2)

  for (var i = 0; i < walkers.length; i++) {
    walkers[i].display();
    walkers[i].move();
  }

}

function Walker(_id) {
  this.id = _id;
  this.x = this.r = 0;
  this.y = this.g = 0;
  this.z = this.b = 0;
  this.t = random(100);
  this.incr = random(1)*0.01;
  this.size;

  this.display = function() {
    push();
    noStroke();
    //this.r = map(this.x, 0,world, 0,255);
    this.g = map(this.y, 0,world, 0,200);
    this.b = map(this.z, 0,world, 0,255);
    this.size = noise(this.t + 25) * 20;
    
    fill(0, this.g, this.b);
    translate(this.x, this.y, this.z);
    //sphere(this.size);
    rotateZ(frameCount * 0.05);
    rotateX(frameCount * 0.05);
    rotateY(frameCount * 0.05);
    torus(30, 6);
    pop();
  }

  this.move = function() {
    this.x = noise(this.t) * world;
    this.y = noise(this.t+5) * world;
    this.z = noise(this.t+10) * world;
    
    this.t += this.incr;
  }
}

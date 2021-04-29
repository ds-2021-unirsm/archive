var camminatori = [];
var d;
var quanti = 10;
var t = 0;

function setup() {
  createCanvas(w = windowWidth, h = windowHeight, WEBGL)
 
  for (var i = 0; i < quanti; i++) {
    camminatori[i] = new Walker(random(w / 2), random(h / 2), random(400))
  }
}

function draw() {
 background(0);
  lights();
  orbitControl();
  rotateY(PI + t / 10)

 push();

  strokeWeight(3)
  stroke(255);
  noFill();
  box(w / 2, w / 2, w / 2);
  stroke(52)
  fill(50);
  //sphere(1200);
 pop();

  for (var i = 0; i < camminatori.length; i++) {
    camminatori[i].move()
    camminatori[i].mostrati()

    for (var j = 0; j < camminatori.length; j++) {
      if (i != j && camminatori[i].collisione(camminatori[j])) {

        camminatori[i].poligoni();
        camminatori[j].poligoni();

        camminatori[i].colore();
        camminatori[j].colore();

        camminatori[i].direzione();
        camminatori[j].direzione();
      }
    }
  }
  t += 0.1
}

function Walker(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.r = 255;
  this.g = 255;
  this.b = 255;
  this.rag = 20;
  this.t = random(1);

  this.col = 255;
  this.pol = 15;

  this.xvel = random(-5, 5)
  this.yvel = random(-5, 5)
  this.zvel = random(-5, 5)

  this.collisione = function(altra) {
    d = dist(this.x, this.y, this.z, altra.x, altra.y, altra.z)

    if (d < this.rag + altra.rag) {
      return true;
    } else {
      return false;
    }
  }

  this.mostrati = function() {
    noStroke()
    specularMaterial(this.r, this.g, this.b);
    push();
    translate(this.x-w/4, this.y-w/4, this.z-w/4)
    sphere(this.rag, this.pol, this.pol);
    pop();
  }

  this.colore = function() {
    this.r = map(this.x, 0, w / 2, 100, 255)
    this.g = 0;
    this.b = map(this.y, 0, w / 2, 100, 255)
  }

  this.poligoni = function() {
    this.pol = int(random(2, 10));
    this.rag = int(random(20, 40));
  }

  this.move = function() {
    this.x = this.x + this.xvel * noise(this.t) * 2
    this.y = this.y + this.yvel * noise(this.t) * 2

    if (this.x < 0 || this.x > w / 2) {
      this.xvel = (-1) * this.xvel
    } else if (this.y < 0 || this.y > h / 2) {
      this.yvel = (-1) * this.yvel
    } else if (this.z < 0 || this.z > w / 2) {
      this.zvel = (-1) * this.zvel
    }
  }

  this.direzione = function() {
    this.xvel = (-1) * this.xvel
    this.yvel = (-1) * this.yvel
    this.zvel = (-1) * this.zvel
  }
}

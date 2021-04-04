//camminatore incontri_scontri

let w, h;
let c = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (var i = 0; i < 6; i++) {
    c[i] = new Walker(w = width, h = height);
  }
}

function draw() {
  background(255, 248, 220);

  for (var i = 0; i < c.length; i++) {
    c[i].move();
    c[i].display();
 
    for (var k = 0; k < c.length; k++) {
      //finchè i non corrisponde a k (i != j), quindi la bolla non controlla se stessa e si interseca con un'altra allora cambia colore
      if (i != k && c[i].intersezione(c[k])) {
        c[i].changeColor();
        c[k].changeColor();
      }
    }
  }
}

function Walker(x, y) {
  this.x = x;
  this.y = y;
  this.r = 40;
  this.col = color(255); //colore iniziale
  this.t = random(10);

  this.changeColor = function() {
    this.col = color(0, random(206), random(209));
  }

  this.intersezione = function(seconda) {
    var d = dist(this.x, this.y, seconda.x, seconda.y);
    //se la distanza fra i due oggetti è inferiore alla somma dei raggi dei due oggetti allora si intersecano
    if (d < this.r + seconda.r) {
      this.t += 0.02; //quando si intersecano aumenta la velocità
      return true;
    } else {
      return false;
    }
  }
  //move
  this.move = function() {
    this.x = noise(this.t + 1) * w;
    this.y = noise(this.t) * h;
    this.t += 0.001 //incremento
  }
  //display
  this.display = function() {
    noStroke();
    fill(this.col); 
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }
}
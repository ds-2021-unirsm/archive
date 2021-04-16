let camminatore = [];
let position;
let num = 10;


function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  for (var i = 0; i < num; i++) {
    //camminatori disposti casualmente nella canvas
    camminatore[i] = new Walker(random(width), random(height));
  }
}


function draw() {
  background(0);
  for (var i = 0; i < camminatore.length; i++) {
    camminatore[i].move();
    camminatore[i].display();

    //la variabile j cicla l'array camminatore
    //quando la variabile j non è uguale a se stessa e si interseca con i
    //cambia forma e colore ad entrambi
    for (var j = 0; j < camminatore.length; j++) {
      if (i != j && camminatore[i].scontro(camminatore[j])) {
        camminatore[i].cambiaColore();
        camminatore[i].cambiaForma();
        camminatore[j].cambiaColore();
        camminatore[j].cambiaForma();
      }
    }
  }
}



function Walker(x, y) {
  // COSTRUTTORE --------------------  
  this.position = createVector(100, 100);
  this.position.x = x
  this.position.y = y
  this.r = 15 //raggio
  this.col = color(155); //colore di partenza
  this.t = random(100);
  this.tIncr = random(20);

  // FUNZIONE COLORE -------------------- 
  this.cambiaColore = function() {
    this.col = color(random(255), random(255), random(255));
  }

  // FUNZIONE FORMA -------------------- 
  this.cambiaForma = function() {
    rect(this.position.x, this.position.y, this.r, this.r);
    fill(random(255));
  }

  // FUNZIONE SCONTRO-------------------- 
  this.scontro = function(other) {
    //dist calcola la distanza tra due punti
    this.d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
    //se la distanza è minore della somma dei due raggi vuol dire che c'è uno scontro
    if (this.d < this.r + other.r) {
      return true;
    } else {
      return false;
    }
  }

  // FUNZIONE DISPLAY-------------------- 
  this.display = function() {
    noStroke()
    fill(this.col)
    ellipse(this.position.x, this.position.y, this.r * 2, this.r * 2)
  }


  // FUNZIONE MOVIMENTO-------------------- 
  this.move = function() {
    this.position.x = noise(this.t + this.tIncr) * width;
    this.position.y = noise(this.t + this.tIncr + 20) * height;
    this.t += 0.01;

  }
}

// RANDOM WALKER PERLING NOISE OOP
// Variazione 2
// Andrea Castellucci

var w, h;
var quanti = 80;
var c = [];
var speedMax = 2;

function setup() {
  createCanvas(w = windowWidth, h = windowHeight);
  strokeCap(SQUARE);
  background(30);

  // crea "n" oggetti di classe Camminatore
  for (var i = 0; i < quanti; i++) {
    c.push(new Camminatore(i));
  }
}

function draw() {
  background(30, 60);

  // per tutti i camminatori chiama i diversi metodi utili 
  for (var i = 0; i < quanti; i++) {
    c[i].move();
    c[i].display();
  }
}

// CLASSE CAMMINATORE
function Camminatore(_id) {

  // COSTRUTTORE
  this.id = _id;
  this.x;
  this.y;
  this.speed = random(1, speedMax);
  this.altro;
  this.randomX = random(200); // valore X per noise();
  this.randomY = random(200); // valore Y per noise();
  this.randomZ = random(200); // valore per "b" dell'rgb

  // METODO MOVE
  this.move = function() {
    this.x = map(noise(this.randomX), 0, 1, 0, width);
    this.y = map(noise(this.randomY), 0, 1, 0, height);

    this.randomX += 0.001 * this.speed;
    this.randomY += 0.001 * this.speed;
  }

  // METODO DISPLAY
  this.display = function() {
    stroke(map(this.randomX, 0, 200, 0, 255), map(this.randomY, 0, 200, 0, 255), map(this.randomZ, 0, 200, 0, 255), 80);
    strokeWeight(map(this.speed, 1, speedMax, 0, 20)); // più è alto this.speed più la linea è spessa

    if (this.id == quanti - 1) this.altro = 0;
    else this.altro = this.id + 1;
    line(this.x, this.y, c[this.altro].x, c[this.altro].y);
  }
}
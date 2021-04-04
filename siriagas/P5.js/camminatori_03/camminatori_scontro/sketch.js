//scontro camminatori Siria Gasperoni

let palline = []
let num = 100


function setup() {
  createCanvas(800, 800);
  // numero di palline
  for (var i = 0; i < num; i++) {
    palline[i] = new Walker(random(width), random(height));

  }
}

function draw() {
  background(0);
  for (var i = 0; i < palline.length; i++) {
    palline[i].spostati();
    palline[i].mostrati();
    for (var j = 0; j < palline.length; j++) {
      if (i != j && palline[i].interseca(palline[j])) {
        palline[i].cambiaColore();
        palline[j].cambiaColore();
      }
    }
  }

}



function Walker(x, y) {
  this.position = createVector(200, 200);

  this.position.x = x
  this.position.y = y
  this.r = 4 //raggio 
  this.col = color(255); //colore iniziale

  this.cambiaColore = function() {
    this.col = color(random(255), random(0), random(255));
  }

  this.interseca = function(other) {
    this.d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
    if (this.d < this.r + other.r) //se la distanza è < della somma dei due raggi
    {
      return true;
    } else {
      return false;
    }
  }

  this.mostrati = function() {

    stroke(255, 0, 0);
    fill(this.col)
    ellipse(this.position.x, this.position.y, this.r * 5, this.r * 5)
  }



  this.spostati = function() {

    var spostati = p5.Vector.random2D(); //crea un nuovo vettore 2D da un angolo casuale
    this.position.add(spostati);
  }



}

var position;
var n_walker = 30;
var sfere = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < n_walker; i++) {
    sfere[i] = new Walker(random(width),random(height));
  }
  noStroke();
}


function draw() {
  background(0);
  for (var i = 0; i < sfere.length; i++) {
    sfere[i].move();
    sfere[i].display();

    //quando i e j si intersecano faccio cambiare forma e stroke alla sfera
    for (var j = 0; j < sfere.length; j++) {
      if (i != j && sfere[i].scontro(sfere[j])) {
        sfere[i].modificaStroke();
        sfere[i].modificaShape();
        sfere[j].modificaStroke();
        sfere[j].modificaShape();
      }
    }
  }
}



function Walker(x, y) {
 
  this.position = createVector(100, 100);
  this.position.x = x
  this.position.y = y
  this.r = random(5,40) //raggio
  this.col = color(155); //colore che hanno le sfere
  this.shape = ellipse(this.position.x, this.position.y, this.r * 2, this.r * 2) //la forma che hanno le sfere prima dello scontro
  this.t = random(10); //variabile che mi servirà per modificale la loro posizione
  this.t_increment = random(5);



////////////////////
/////Trasforma/////
////////////////// 
  this.modificaShape = function() {
    this.shape= star(this.position.x, this.position.y, this.r, this.r, this.r);
    fill(random(255));
    this.t+= 0.001; //quando si scontrano aumenta anche la velocità
  }

////////////////////
/////Scontro///////
//////////////////
  this.scontro = function(other) {
    this.d = dist(this.position.x, this.position.y, other.position.x, other.position.y);

    if (this.d < this.r + other.r) {
      return true;
    } else {
      return false;
    }
  }
  
////////////////////
/////Stroke////////
//////////////////
  this.modificaStroke = function() {
      noFill();
      stroke(this.col)
      strokeWeight(5);
  }

////////////////////
/////Dispaly///////
//////////////////  
  this.display = function() {
    noStroke()
    fill(this.col)
    ellipse(this.position.x, this.position.y, this.r * 2, this.r * 2)
  }


////////////////////
/////Move//////////
//////////////////
  this.move = function() {
    this.position.x = noise(this.t + this.t_increment) * width;
    this.position.y = noise(this.t + this.t_increment + 20) * height;
    this.t += 0.01;

  }
  
 function star(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius2 * noise(0.01 * frameCount + 500);
      let sy = y + sin(a) * radius2 * noise(0.01 * frameCount + 500);
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
}
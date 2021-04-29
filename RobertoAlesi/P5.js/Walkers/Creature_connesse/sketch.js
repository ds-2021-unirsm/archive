var w, h;
var d = 5;
var quanti = 15;
var c = [];
t=0;


function setup() {
  createCanvas(w=windowWidth, h=windowHeight);
  textSize(18);
  
  // crea n oggetti di classe Camminatore
  for (var i=0; i<quanti; i++){
  	c.push(new Camminatore(i)); 
  }
}

function draw() {
 background(0);
 
  
 for (var i=0; i<quanti; i++){
	c[i].move();
	c[i].display();
 }
}


// classe
function Camminatore(_id) {

  // costruttore
  this.id = _id;
  this.x;
  this.y;
  this.dirX = 0;
  this.dirY = 0;
  this.speed = random(1, 50);
  this.speed2 = random(1, 50);
  this.qualeAltro;
  this.qualeAltro2 = int(random(quanti));


  // metodo move
  this.move = function() {
    this.dirX = noise(this.speed*5);
    this.dirY = noise(this.speed2*5);
	this.x = this.dirX * w;
	this.y = this.dirY * h;
    this.speed += random(0.001);
    this.speed2 += random(0.001);
    
  }


  // metodo display
  this.display = function() {

    fill(r, g, b);
    stroke(255,50);
    strokeWeight(1.5);
    beginShape();
    line(this.x, this.y, this.x , 0);
    line(this.x, this.y, this.x, h);
    line(this.x, this.y, 0, this.y);
    line(this.x, this.y, w, this.y);
    
    noStroke();
    
    //blendMode(DARKEST);
    push();
    var r = 255 * noise(t+3);
    var g = 255 * noise(t+4);
    var b = 255 * noise(t+5);
	fill(r, g, b, 150);
    if (this.id == quanti - 1) this.qualeAltro = 0;
    else this.qualeAltro = this.id+1;
    blendMode(DIFFERENCE);
	 beginShape();
	 vertex(this.x, this.y);
	 vertex(c[this.qualeAltro].x,c[this.qualeAltro].y)
	 vertex(c[this.qualeAltro2].x,c[this.qualeAltro2].y);
     vertex(this.x-random(-50,50), this.y+random(100,-100));
	 endShape(CLOSE);
    t+=0.0001
    pop();
     fill(map(this.speed, 0, 10, 0, 255));
    ellipse(this.x, this.y, d);
  }

}

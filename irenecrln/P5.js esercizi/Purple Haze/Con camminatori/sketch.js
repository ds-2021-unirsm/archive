/*╔════════════               ════════════╗
    
// -
// Purple Haze 0.1 by Irene Carlino [walkers]
// 2021 © 
Irene.Crln @irenecrln, Daniele @Fupete, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete - github.com/irenecrln
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to: 
// @Kenneth Newby for https://openprocessing.org/sketch/957656
//
// — 
     
//╚════════════               ════════════╝*/
var position;
var n_walker = 60;
var sfere = [];
let radius = 300; // the radius of the circle

function setup() {
  createCanvas(windowWidth, windowHeight);
 // colorMode(HSB, 360, 100, 100, 100);
  for (var i = 0; i < n_walker; i++) {
    sfere[i] = new Walker(random(width),random(height));
  }
  noStroke();
}


function draw() {
  background(0);
     frameRate(40);
  //translate(width/2, height/2);
	
	noFill();
	stroke(255,255,255);
	ellipse(width/2, height/2, random(radius*1.9), radius*1.8);
  for (var i = 0; i < sfere.length; i++) {
    sfere[i].move();
    sfere[i].display();

  }
}



function Walker(x, y) {
 
  this.position = createVector(100, 100);
  this.position.x = x
  this.position.y = y
  this.r = random(5,40) //raggio
  this.col = color(186,85,211); //colore che hanno le sfere
  this.shape = ellipse(this.position.x, this.position.y, this.r * 2, this.r * 2)
  this.t = random(10); //variabile che mi servirà per modificale la loro posizione
  this.t_increment = random(5);



  


////////////////////
/////Display///////
//////////////////  
  this.display = function() {
    noStroke()
    fill(this.col)
    star(this.position.x,this.position.y, random(1, 16), random(1, 16), 12)
      for (var i = 0; i < 20; i++) {
    let hue = random(265,290);
    //fill(hue, 500, 100, 500);
		
		// get a random point within the circle defined by radius
    let angle = random(TWO_PI); // get a random angle


		
  }
  }


////////////////////
/////Move//////////
//////////////////
  this.move = function() {
    this.position.x = noise(this.t + this.t_increment) * width ;
    this.position.y = noise(this.t + this.t_increment + 20) * height;
    this.t += 0.01;

  }
  
function star(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius2;
      let sy = y + sin(a) * radius2;
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }

function keyPressed(){
  if(key == 's'){
    save('poster_Magia_irene_crln.png');
  }
}
}
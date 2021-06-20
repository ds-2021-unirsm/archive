/*╔════════════               ════════════╗
    
// -
// Purple Haze 0.1 by Irene Carlino 
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



let radius = 300; // the radius of the circle

function setup() {
  createCanvas(windowWidth, windowHeight);// golden section
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
   frameRate(30);
  background(0, 0, 0, 10); // gradual erase of the canvas

	translate(width/2, height/2);
	
	noFill();
	stroke(238,130,238, 50);
	ellipse(0, 0, random(radius*1.9), radius*1.8);
	
  for (var i = 0; i < 20; i++) {
    let hue = random(265,290);
    fill(hue, 500, 100, 500);
		
		// get a random point within the circle defined by radius
    let angle = random(TWO_PI); // get a random angle
    let x = cos(angle) * radius * random(1); // get a random x within the circle
    let y = sin(angle) * radius * random(1); // get a random y within the circle
 
		
		
		star(x, y, random(1, 16), random(1, 16), 12);//penultima cifra è la lunghezza delle punte 
    //ellipse(x, y, ); // draw the circle
		
  }
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

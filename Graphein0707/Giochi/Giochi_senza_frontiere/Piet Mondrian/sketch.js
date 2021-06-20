// -
// Piet Mondrian 0.1 by Gaia Andruccioli [square, color, geometry]
// 2021 © Gaia Andruccioli, Daniele @Fupete, Irene @iretrtr and the course DS-2021 at DESIGN.unirsm,
// github.com/ds-2021-unirsm — github.com/fupete - github.com/Graphein0707
// Educational purposes, MIT License, 2021, San Marino
// —
//

function setup() {
	createCanvas(800, 800);
	background(255);
	stroke(20);
	strokeWeight(4);
}

function draw() {
	background(255);
	for (var x = 0; x < 800; x = x+60){
		for (var y = 0; y < 500; y = y+60){
			push();
			translate(x, y);			
	  		drawMondrian();
			pop();
		}	
	}
	noLoop();
}

function drawMondrian() {
	var c = random(1);
	
	if (c > 0 && c < 0.2) {
	fill(255,0,0);
	rect(0, 0, random(150), random(150));
	}
	else if(c > 0.2 && c < 0.4){
	fill(0,0,255);
    rect(0, 0, random(100), random(100));
	}
	else if(c > 0.4 && c < 0.6){
	fill(255,255,0);
    rect(0, 0, random(100), random(100));
	}
	else if(c < 1){
	fill(255);
    rect(0, 0, random(400), random(400));
	}
}
// -
// Rotating in place n.2 0.1 by Lucrezia Nediani 
// 2021 © Lucrezia Nediani, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/Lucrezia604 — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to: 
// @ Gene Kogan (genekogan.com) for https://genekogan.com/code/p5js-transformations/
// —


function setup(){
	createCanvas(500, 500);
	rectMode(CENTER);	// now the first two arguments of a rect are its center point, not corner
}
function draw(){
	background(240);

	// move the origin to the pivot point
	translate(250, 250); 

	// then rotate the grid around the pivot point by a
	// number of degrees equal to the frame count of the sketch
	rotate(radians(frameCount));

	// and draw the square at the origin
	fill(0);
	rect(0, 0, 100, 100);
  
  translate(100, 100); 
    fill(255);
    rect(0, 0, 100, 100);
}

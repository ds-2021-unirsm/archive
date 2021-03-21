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
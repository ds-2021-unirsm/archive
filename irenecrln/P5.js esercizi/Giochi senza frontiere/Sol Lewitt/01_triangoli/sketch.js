function setup() {
	createCanvas(400, 400);
  colorMode(HSB, 230, 100, 100);
}

function draw(){
	background(210);
	//fill(0, 20);
	noStroke();
	
	translate(width/2, height/2);
    rotate(PI);
  
	
	for (var i=0; i < 20; i++) {
		push();
		scale(20/i);
		fill(random(230), 250, 255);
		triangle(0, -100, -100, 100, 100, 100);
		pop();
	}
  noLoop();
}
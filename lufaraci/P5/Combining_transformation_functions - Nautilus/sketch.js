function setup() {
	createCanvas(400, 400);
}

function draw(){
	background(240);
	fill(0, 10);
	stroke(0, 160);
	
	translate(width/2-10, height/2-20);
	for (var i=0; i < 30; i++) {
        push();
        rotate(i / 5.0);
	for (var i=0; i < 30; i++) {
		push();
		rotate(i / 5.0);
		scale(i / 20.0);
        rotate(i / 1.5);
        circle(-100,100, 30);
		pop();
	}
      pop();
    }
}
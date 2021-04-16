function setup() {
	createCanvas(400, 400);//dimensione canvas
}

function draw() {
	background(240);
	
	push();
  	translate(50, 50);//permette di spostare le coordinate
	//i rettandoli hanno tutti le stesse dimensioni e grazie a translate cambiano di posizione
    fill(255, 255, 204);
    stroke(255, 255, 204);
  	ellipse(50, 50, 100, 100);
    fill(255, 204, 153);
    stroke(255, 204, 153);
  	ellipse(50, 50, 50, 50);
	pop();

	push();
  	translate(250, 280);
	fill(153, 255, 204);
    stroke(153, 255, 204);
    triangle(-60,-60, -120, 0, 0, 0);
  	//rect(0, 0, 100, 100);
	pop();

	push();
  	translate(140, 280);
	fill(204, 204, 255);
    stroke(204, 204, 255);
  	rect(0, 0, 100, 100);
	pop();
}

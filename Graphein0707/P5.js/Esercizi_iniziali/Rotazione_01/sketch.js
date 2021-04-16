function setup() {
	createCanvas(w=windowWidth, h=windowHeight);
	background(240);
	rectMode(CENTER); //elementi ruotano rispetto al loro centro in 0,0
}

function draw(){
	//L'operatore modulo% calcola il resto.
    //esempio: 24% 25 = 24, 25% 25 = 0, 26% 25 = 1, ecc.
    //quindi valuta se questa istruzione if è vera ogni 25 fotogrammi
	if (frameCount % 5 == 0) {
		fill(random(255),random(255));
        noStroke();
		push();
		translate(w/2, h/2); //sposto il canvas
		rotate(radians(frameCount));
		triangle(0, 0, 58, 20, 100, 175);
		pop(); //fine animazione triangoli
	}
    //seconda cornice esterna e colorata 
  	if (frameCount % 5 == 0) {
		fill(random(255),255,random(255));
        noStroke();
		push();
		translate(w/2, h/2); //sposto il canvas
		rotate(radians(frameCount));
		triangle(0, 270, 60, 35, 5, 5);
		pop(); //fine animazione cerchi 
	}
}
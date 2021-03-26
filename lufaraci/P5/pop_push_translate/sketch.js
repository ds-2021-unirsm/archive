function setup(){
	createCanvas(500, 500);
}

function draw(){
	background(230, 255, 255);
	for (var x = 5; x < 500; x = x+50){//x è uguale a 5 e deve muoversi di 50 per tutto il canvas 500
		for (var y = 5; y < 500; y = y+50){//y è uguale a 5 e deve muoversi di 50 per tutto il canvas 500
			push();//situazione che è vera solo all'interno di push e pop
			translate(x, y);//sposta le coordinate			
	  		drawHouse();//funzione disegna casa, viene sviluppata sotto
			pop();
		}	
	}	
}

function drawHouse() {
	//circle(15, 15, 30);
    noStroke();
    fill(255, 255, 102);
    circle(10, 15, 20);
    fill(204, 255, 102);
    circle(20, 15, 20);
    fill(255, 0, 128);
    circle(15, 15, 20);
    fill(230, 255, 255);
	rect(0, 15, 30, 25);
    fill(230, 172, 0);
    triangle(0, 15, 15, 50, 30, 15);
	//rect(10, 10, 10, 10);
}

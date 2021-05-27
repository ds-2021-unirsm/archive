// -
// 10 PRINT 0.1 by SiriaGasperoni [10 PRINT, movimento, pattern]
// 2021 © SiriaGasperoni, Daniele @Fupete, Irene @iretrtr and the course DS-2021 at DESIGN.unirsm,
// github.com/ds-2021-unirsm — github.com/fupete - github.com/siriagas
// Educational purposes, MIT License, 2021, San Marino
// —

var r, g, b, a
var x;
var y;
var PreviousXPostion;
var PreviousYPostion;
let lapse = 0;    // mouse timer

function setup() {
	createCanvas(800, 800);
	x = width / 2;
	y = height / 2;
	background(0);
	frameRate(30)
}

function draw() {
	PreviousXPostion = x;
	PreviousYPostion = y;
	r = random(255);
	g = random(255);
	b = random(255);
	a = random(80, 0);
	randomSaturatedColors = color(r, g, b);
	randomUnsaturatedColors = color(r, g, b, a);

	var stepDirection = random(1);
	let step = 40;
	if (stepDirection < 0.25 && x < width) {
		x += step;
	} else if (stepDirection < 0.5 && x > 0) {
		x -= step;
	} else if (stepDirection < 0.75 && y < height) {
		y += step;
	} else if ( y > 0){
		y -= step;
	}


	stroke(r,g,b);
	strokeWeight(3);
	line(x, y, PreviousXPostion, PreviousYPostion);
}



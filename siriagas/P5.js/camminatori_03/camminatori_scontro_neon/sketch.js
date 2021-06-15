// -
// Camminatore incontri-scontri 0.1 by Siria Gasperoni [Camminatori, incontri-scontri]
// 2021 © Siria Gasperoni, Daniele @Fupete, Irene @iretrtr and the course DS-2021 at DESIGN.unirsm,
// github.com/ds-2021-unirsm — github.com/fupete - github.com/siriagas
// Educational purposes, MIT License, 2021, San Marino
// Credits/Thanks to: 
//https://openprocessing.org/sketch/902930
//Ryno Hsiao

let walkers = [];
let walkersNum = 20;

function setup() {
	createCanvas(windowWidth, screen.availHeight);
	colorMode(HSB,10,10,10,255,);

	for (let i = 0; i < walkersNum; i++) {
		walkers.push(new walker());
	}
}

function draw() {
	blendMode(BLEND);
	background(0);

	blendMode(SCREEN);

	for (let i = 0; i < walkers.length; i++) {
walkers[i].move();
		walkers[i].dislpay();
	}
}

function walker() {
	this.x = 0;
	this.y = 0;
	this.c = random(9);
	this.w = random(5, 30);

	this.nx = random(1.00);
	this.ny = random(1.00);

	this.dx = random(0.005, 0.015);
	this.dy = random(0.005, 0.015);

	this.colorDelta = 0;
	this.colorSpeed = random(-1, 1) * 0.1;
//move
	this.move = function () {
		this.x = noise(this.nx, this.c * this.w) * width;
		this.y = noise(this.ny, this.c * this.w) * height;

		this.nx += this.dx;
		this.ny += this.dy;

		this.colorDelta += this.colorSpeed;
	}
//display
	this.dislpay = function () {
		for (let i = 1; i < 50; ++i) {
			strokeWeight(i * this.w * .1);
			stroke(abs((this.c+this.colorDelta))%9, 9, (50 - i) * .3, 9);
			//fill(9, 3);
			fill(abs((this.c+this.colorDelta))%9, 9, (50 - i) * .3, 6);
			circle(this.x, this.y, this.w);
		}
    }}
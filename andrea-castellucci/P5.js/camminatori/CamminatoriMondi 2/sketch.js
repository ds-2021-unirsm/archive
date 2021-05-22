//   __   __ _  ____  ____  ____   __
//  / _\ (  ( \(    \(  _ \(  __) / _\
// /    \/    / ) D ( )   / ) _) /    \
// \_/\_/\_)__)(____/(__\_)(____)\_/\_/
//
// -
// Camminatori-mondi-2 by Andrea [atom, pulse, attraction]
// 2021 © Andrea @AndrCastellucci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm
// github.com/ds-2021-unirsm — github.com/fupete — github.com/andrea-castellucci
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to: 
// Konstantin Makhmutov - Wobbly Swarm for https://openprocessing.org/sketch/492096
// —
//
// Help:
// [mouse.pressed] new walkers
// [mouse.drag] new walkers
//
// —

var mass = [];
var positionX = [];
var positionY = [];
var velocityX = [];
var velocityY = [];

let blurry = 40;
let blurch = 1;

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 360, 100, 100);
  	//stroke(0,25,50,255);
    noStroke();
}

function draw() {
	blendMode(BLEND);
	background(0);
    blendMode(HARD_LIGHT);
  
    fill(8, 8, 8);
 
	drawingContext.shadowColor = color(192, 90, 255);
	drawingContext.shadowBlur = blurry;
	
	for (var particleA = 0; particleA < mass.length; particleA++) {
		var accelerationX = 0
        var accelerationY = 0;
		
		for (var particleB = 0; particleB < mass.length; particleB++) {
			if (particleA != particleB) {
				var distanceX = positionX[particleB] - positionX[particleA];
				var distanceY = positionY[particleB] - positionY[particleA];

				var distance = sqrt(distanceX * distanceX + distanceY * distanceY);
				if (distance < 1) distance = 1;

				var force = (distance - height/3) * mass[particleB] / distance;
				accelerationX += force * distanceX;
				accelerationY += force * distanceY;
			}
		}
		
		velocityX[particleA] = velocityX[particleA] * 0.99 + accelerationX * mass[particleA];
		velocityY[particleA] = velocityY[particleA] * 0.99 + accelerationY * mass[particleA];
	}
	
	for (var particle = 0; particle < mass.length; particle++) {
		positionX[particle] += velocityX[particle];
		positionY[particle] += velocityY[particle];
		
		rect(positionX[particle], positionY[particle], mass[particle] * 1000, mass[particle] * 1000, 10);
	}
  
    blurry+= blurch;
	if (blurry > 40 || blurry < 15) blurch *= -1
}

function addNewParticle() {
	mass.push(random(0.003, 0.03));
	positionX.push(mouseX);
	positionY.push(mouseY);
	velocityX.push(0);
	velocityY.push(0);
}

function mouseClicked() {
	addNewParticle();
}

function mouseDragged() {
	addNewParticle();
}

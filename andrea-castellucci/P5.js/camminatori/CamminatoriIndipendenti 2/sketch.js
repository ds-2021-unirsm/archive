//   __   __ _  ____  ____  ____   __
//  / _\ (  ( \(    \(  _ \(  __) / _\
// /    \/    / ) D ( )   / ) _) /    \
// \_/\_/\_)__)(____/(__\_)(____)\_/\_/
//
// -
// Light-walkers by Andrea [light, walkers, relation]
// 2021 © Andrea @AndrCastellucci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete — github.com/andrea-castellucci
// Educational purposes, MIT License, 2021, San Marino
// —
// Add Credits from https://openprocessing.org/ 
// —
//
// Help:
// [mouse.click] new walker
//
// —

var circles = [];
var quanti = 10;
var circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);

  for (var i = 0; i < quanti; i++) {
    circles.push(new Circle(random(0, width), random(0, height)));
  }
}

function draw() {
  blendMode(BLEND);
  background(5, 60);
  blendMode(EXCLUSION);
  
  fill(0, 0, 0);
  strokeWeight(1);

  for (var i = circles.length - 1; i >= 0; i--) {
    if (circles[i].id <= circles[circles.length - 1].id - 30) {
      circles.splice(i, 1);
    }
  }

  var noHit = true;
  
  for (i = 0; i < circles.length; i++) {
    for (x = 0; x < circles.length; x++) {
      if (i != x && noHit) {
        if (circles[i].intersects(x) && circles[x].intersects(i)) {
          
          circles[i].fill = color(random(200, 225), 76, 79);
          circles[x].fill = color(random(200, 225), 76, 79);
          
          noHit = false;
          
        } else {
          circles[i].fill = circles[i].fillFix;
        }
      }
    }
    noHit = true;
  }
  for (i = 0; i < circles.length; i++) {
    circles[i].id = i;
    circles[i].update();
    circles[i].show();
  }
}

function Circle(x, y) {
  this.x = x;
  this.y = y;
  this.id;
  this.xVel = floor(random(-10, 5)); // velocitàX
  this.yVel = floor(random(-10, 5)); // velocitàY
  this.diameter = floor(random(20, 90));
  this.blurry = random(80, 120);
  this.stroke = random(30,50);
  this.fill = random(10,30);
  this.fillFix = this.fill;

  this.intersects = function(circleId) {
    if (dist(this.x, this.y, circles[circleId].x, circles[circleId].y) <= (this.diameter + circles[circleId].diameter) / 2) {
      return true;
    } else {
      return false;
    }
  }

  this.show = function() {
    stroke(this.stroke);
    
    drawingContext.shadowColor = color(this.fill);
	drawingContext.shadowBlur = this.blurry;
    
    ellipse(this.x, this.y, this.diameter);
  }

  this.update = function() {
    if (this.x - this.diameter / 2 <= 0 || this.x + this.diameter / 2 >= width) {
      this.xVel *= -1;
    }
    if (this.y - this.diameter / 2 <= 0 || this.y + this.diameter / 2 >= height) {
      this.yVel *= -1;
    }
    this.x += this.xVel;
    this.y += this.yVel;
  }
}

function mousePressed() {
  circles.push(new Circle(mouseX, mouseY));
}

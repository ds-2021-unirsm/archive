//   __   __ _  ____  ____  ____   __
//  / _\ (  ( \(    \(  _ \(  __) / _\
// /    \/    / ) D ( )   / ) _) /    \
// \_/\_/\_)__)(____/(__\_)(____)\_/\_/
//
// -
// Camminatori-incontri-scontri-GUI by Andrea [transparency, liquid]
// 2021 © Andrea @AndrCastellucci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete — github.com/andrea-castellucci
// Educational purposes, MIT License, 2021, San Marino
// —
//
// Help:
// [mouse.click] new shape
//
// —

var circles = [];
var quanti = 30;
var circles = [];

// PARAMETRI GUI
let parametri = {
  dimensione: 250,
  roundness: 15,
  //blur: 0,
  blendmode: "difference", 
  
  Hue: 220,
  Saturation: 30,
  Brightness: 100,
};

// FUNZIONE GUI
window.onload = function() {
  var gui = new dat.GUI();
  
  var f1 = gui.addFolder('Forma');
  f1.add(parametri, 'dimensione', 0, 500);
  f1.add(parametri, 'roundness', 0, 250);
  //gui.add(parametri, 'blur', 0, 50);
  

  var f2 = gui.addFolder('Colore');
  f2.add(parametri, 'blendmode', ['exclusion', 'difference', 'remove']);
  f2.add(parametri, 'Hue', 0, 360);
  f2.add(parametri, 'Saturation', 0, 100);
  f2.add(parametri, 'Brightness', 0, 100);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  rectMode(CENTER);

  for (var i = 0; i < quanti; i++) {
    circles.push(new Circle(random(0, width), random(0, height)));
  }
}

function draw() {
  blendMode(BLEND);
  background(parametri.Hue, parametri.Saturation, parametri.Brightness);

  if (parametri.blendmode == "exclusion") {
    blendMode(EXCLUSION);
  } else if (parametri.blendmode == "remove") {
    blendMode(REMOVE);
  } else if (parametri.blendmode == "difference") {
    blendMode(DIFFERENCE);
  }

  //fill(360, 50, 100);
  fill(0, 0, 0);

  for (var i = circles.length - 1; i >= 0; i--) {
    if (circles[i].id <= circles[circles.length - 1].id - 100) {
      circles.splice(i, 1);
    }
  }

  var noHit = true;
  for (i = 0; i < circles.length; i++) {
    for (x = 0; x < circles.length; x++) {
      if (i != x && noHit) {
        if (circles[i].intersects(x) && circles[x].intersects(i)) {

          circles[i].blurry += random(-8, 8);
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
  this.diameter = floor(random(50, 70));
  this.blurry = random(0, 10);
  this.fill = random(10, 60);
  this.fillFix = this.fill;

  this.intersects = function(circleId) {
    if (dist(this.x, this.y, circles[circleId].x, circles[circleId].y) <= (this.diameter + circles[circleId].diameter) / 2) {
      return true;
    } else {
      return false;
    }
  }

  this.show = function() {
    noStroke();
    
    //this.blurry = parametri.blur;
    
    drawingContext.shadowColor = color(this.fill);
    drawingContext.shadowBlur = this.blurry;

    this.diameter = parametri.dimensione;

    rect(this.x, this.y, this.diameter, this.diameter, parametri.roundness);
  }

  this.update = function() {
    if (this.x - parametri.dimensione / 2 <= 0 || this.x + parametri.dimensione / 2 >= width) {
      this.xVel *= -1;
    }
    if (this.y - parametri.dimensione / 2 <= 0 || this.y + parametri.dimensione / 2 >= height) {
      this.yVel *= -1;
    }
    this.x += this.xVel;
    this.y += this.yVel;
  }
}

function mousePressed() {
  circles.push(new Circle(mouseX, mouseY));
}

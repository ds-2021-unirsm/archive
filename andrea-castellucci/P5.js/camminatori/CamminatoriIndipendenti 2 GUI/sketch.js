//   __   __ _  ____  ____  ____   __  
//  / _\ (  ( \(    \(  _ \(  __) / _\
// /    \/    / ) D ( )   / ) _) /    \
// \_/\_/\_)__)(____/(__\_)(____)\_/\_/
//  

// Camminatori Indipendenti 2 + GUI
// Sketch di Andrea Castellucci

var circles = [];
var quanti = 10;
var circles = [];

// PARAMETRI GUI
let parametri = {
  coloreSfondo: 0,
  dimensione: 50,
  spessoreTraccia: 20,
  opacitàTraccia: 100,
  blur: 70,
  forme: "ellipse",
};

// FUNZIONE GUI
window.onload = function() {
  var gui = new dat.GUI();
  gui.add(parametri, 'coloreSfondo', 0, 100); 
  gui.add(parametri, 'spessoreTraccia', 0, 200);
  gui.add(parametri, 'opacitàTraccia', 0, 100);
  gui.add(parametri, 'dimensione', 50, 500); 
  gui.add(parametri, 'blur', 1, 200); 
  gui.add(parametri, 'forme', ['ellipse', 'rect']);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);

  for (var i = 0; i < quanti; i++) {
    circles.push(new Circle(random(0, width), random(0, height)));
  }
}

function draw() {
  blendMode(BLEND);
  background(parametri.coloreSfondo, 60);
  blendMode(EXCLUSION);
  
  fill(0, 0, 0);

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
  this.blurry = random(10, 200);
  this.stroke = random(30,50);
  this.fill = random(10,30);
  this.fillFix = this.fill;

  this.intersects = function(circleId) {
    if (dist(this.x, this.y, circles[circleId].x, circles[circleId].y) <= ((this.diameter + parametri.dimensione) + (circles[circleId].diameter + parametri.dimensione)) / 2) {
      return true;
    } else {
      return false;
    }
  }

  this.show = function() {
    this.stroke = parametri.opacitàTraccia;
    strokeWeight(parametri.spessoreTraccia);
    stroke(this.stroke);
    
    this.blurry = parametri.blur;
    
    drawingContext.shadowColor = color(this.fill);
	drawingContext.shadowBlur = this.blurry;
    
    if(parametri.forme == "rect"){
         rect(this.x, this.y, this.diameter + parametri.dimensione);
    }  else {
         ellipse(this.x, this.y, this.diameter + parametri.dimensione);
    }
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

function keyPressed() {
  circles.pop();
}

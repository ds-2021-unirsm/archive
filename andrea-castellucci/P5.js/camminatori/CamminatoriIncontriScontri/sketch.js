// Incontri e Scontri tra Camminatori
// Andrea Castellucci

var circles = [];
var quanti = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);

  for (var i = 0; i < quanti; i++) {
    circles.push(new Circle(random(0, width), random(0, height)));
  }
}

function draw() {
  blendMode(BLEND);
  background(8, 10);
  blendMode(SCREEN);
  
  fill(0, 0, 0);
  noStroke();


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
          circles[i].diameter += random(-10, 10);
          
          circles[i].fill = color(219, 76, 79);
          circles[x].fill = color(219, 76, 79);
          
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
  this.fill = random(10,60);
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
  print(circles);
}

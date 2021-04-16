// PATTERN CHE UTILIZZANO IL MODULO
// sketch by emanuelepizzuti

// Guida:
// [mouse] al movimento cambiano i colori

let w, h;
let tx, ty;
let mx, my;

function setup() {
  createCanvas(w = windowWidth, h = 600);
  
  rectMode(CENTER);
  ellipseMode(CENTER);
  // noFill();
  strokeWeight(2);
}

function draw() {
background(10,30);
  for (var x = 0; x < w; x += 20) {
    for (var y = 0; y < h; y += 20) {

      noStroke();
        // stroke(x%255, mouseX/5, mouseY);
        fill(x%255, mouseX/5, mouseY);
        ellipse(x, y, frameCount%60);
      
    }
  }
}
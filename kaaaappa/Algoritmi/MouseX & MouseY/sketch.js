function setup() {
  createCanvas(800, 400);
  noStroke();
  background(0);
}

function draw() {

  if (frameCount % 8 == 0){
  
  fill(random(100, 255),0, random(100, 255), random(200, 255));
  triangle (800, 0, (800 - mouseX), (400 - mouseY), 0, 400);  
  
  fill(random(100, 255), random(100, 255), 0, random(200, 255));
  triangle (0, 400, mouseX, mouseY, 800, 0);
  }
}

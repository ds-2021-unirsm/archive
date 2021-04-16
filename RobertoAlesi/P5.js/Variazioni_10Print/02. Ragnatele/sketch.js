var w, h;
var x = 0;
var y = 0;
var z = 0;
var size = 20; 
var noisex = 0;
var noisey = 0;
var noisez = 0;
var destraSinistra;
var rot;
var t=0;

function setup() {
  createCanvas(w = 1000, h = 800, WEBGL);
  background(0);
 //rotateX(map(frameCount, 0, 60, 0 , PI/2))
}

function draw() {
  lights();
 
  rotateX(-PI/2);
  rotateY(map(frameCount, 0, 60, 0 , 2*PI));
  
  push();
  noStroke();
  translate(0, -h / 2, -h / 2)
  rotateY(7 / 4 * PI); 
  destraSinistra = random(1);
  if (destraSinistra < 0.5) {
    push();
    fill(127, 255, 212);
    emissiveMaterial(127, 255, 212);
    translate(x, y, 0);
    sphere(5);
    pop();
  
   // circle(x, y, size);
  } else if (destraSinistra > 0.5) {
    
    push();
    fill(191, 0, 255)
    translate(x, y, 0);
    rotateX(t++);
    rotateY(t++);
    box(20, 20, 20);
    pop();
    line(x, y + size, x + size, y); // grande
  }
 
  pop();

  
  x += size;
  noisex += 0.3;

  if (x > w / 2) {
    x = 0;
    y += size;
    noisex = 0;
    noisey += 0.3;
    z += size;
    noisez += 0.05
  }
  
}

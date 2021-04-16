var w, h;
var x = 0;
var y = 0;
var z = 0;
var size = 20;
var noisex = 0;
var noisey = 0;
var noisez = 0;
var moneta;
var bolla;

function setup() {
  createCanvas(w = windowWidth, h = windowHeight, WEBGL);
  background(0);
  
}

function draw() {
  //lights();
translate(-30,0,0)
rotateZ(2.5/5*PI);
  
push();
  translate(-w / 2 + 130, -h / 2 + 20)
  rotateY(1 / 4 * PI)
   
  moneta = random(1);
  if (moneta < 0.5) {
       strokeWeight(2);
       stroke(191, 0, 255);
       circle(x, y, noise(noisex, noisey, noisez) * 15);
    
  } else if (moneta > 0.5) {
    strokeWeight(noise(noisex, noisey, noisez) * 3);
    stroke(0, 50, 130);
    line(x, y + size, x + size, y);
        
    if (moneta >= 0.9) {
    push();
      noStroke();
      fill(125,255,212);
      translate(x+random(50, 400), y-random(50, 350),0 );
      bolla = random(1,15);
      sphere(bolla);
      stroke(255,5);
      noFill();
      sphere(bolla+7);
     pop();
    }
  }
  pop();

  
push();
  translate(0, -h / 2, -h / 2 +50)
  rotateY(7/4 * PI)
  moneta = random(1);
  if (moneta < 0.5) {
    noStroke();
    fill(191, 0, 255);
    rect(x, y, size, size);
  } 
    
  else if (moneta > 0.5) {
    
    strokeWeight(2); 
    stroke(255);
    
    ////////Parallelepipedi///////
    push();
     translate(x, y, 0);
     ambientMaterial(250);
     box(20, 20, random(10,250));
   pop();
 }

    
  x += size;
  z += size;
  noisex += 0.3;

  // andare a capo
  if (x > w / 2) {
    x = 0;
    y += size;
    noisex = 0;
    noisey += 0.3;
    z += size;
    noisez += 0.05
  }
  
 if(y > w/2+250){
    noLoop();
  }
}

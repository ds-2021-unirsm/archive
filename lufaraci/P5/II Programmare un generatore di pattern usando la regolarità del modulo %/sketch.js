function setup() { 
  createCanvas(windowWidth,windowHeight);
  noLoop();
} 

function draw() { 
  background(255);
  noStroke();
  for (var i = 0; i < width; i = i+15) {
    for (var o = 0; o <600; o = o+15) {
    push();
    translate(i, o);				
      if (o % 2 == 0) {
      fill(random(255),0,0);
      rect(0,15,15);
      
     } else {
     fill(0,random(255),0);
     rect(0,15,15);
      
    }
    pop();
  }}
  
}
let x = 0
let y = 0
let x1 = 0
let y1 = 0
let spacing = 30

function setup() {
  createCanvas(800, 800);
  background(0);
  blendMode(ADD);
}

function draw() {
  // noStroke()
  strokeWeight(random(0,3))
  stroke(random(0,75),random(75,150),random(150,255),random(0,100))
  fill(random(0,75),random(75,150),random(150,255),random(0,100),)

  if(random(1) < 0.2){
     circle(x, y, random(1,spacing*2))
     }else{
     arc(x, y, random(1,spacing*2),random(1,spacing*2),random(1,360),random(1,360))
     }
     x += spacing

  if (x > width){
    x = 0
    y += spacing
  }
  if (y > height) {
   
    x = 0;
    y = 0;
  }
   if(random(1) < 0.2){
     circle(x1, y1, random(1,spacing))
     }else{
     arc(x1, y1, random(1,spacing*2),random(1,spacing*2),random(1,360),random(1,360))
  y1 += spacing
  
  if (y1 > width){
    y1 = 0
    x1 += spacing
  }
       if (x1 > height) {
    
    x1 = 0;
    y1 = 0;
       }
}
}
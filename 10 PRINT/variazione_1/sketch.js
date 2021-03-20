let w = 16; 
let h = 16; 
let index = 0;

function setup() {
      createCanvas(640, 384);
      background('#000000');
      //background(#0000ff);
      strokeWeight(0);
      //strokeWeight(5);
      stroke(0);
      //stroke(224);
      strokeCap(SQUARE);
      smooth();
}
function draw() {
let x1 = w*index; 
let x2 = x1 + w; 
let y1 = h*23; 

   

      if (random(3) < 1) {
        fill(random(255),random(255),random(255));
        circle(x1+8, y1, 16);
        //line(x1, y1, x1, y2);
      } else if (random(3) < 2) {
        fill(0);
        circle(x1+8, y1, 16);
        //line(x1, y1, x2, y2);
      }
      else {
        fill(random(255),random(255),random(255));
        rect(x1, y1-8, 16,16);
      }
      
index++;

if (index == width/w) {
   p = get(0, h, width, h*23); 
   background('#000000');
   
   set(0, 0, p);
index = 0;
} 
}

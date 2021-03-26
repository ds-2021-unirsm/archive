let w = 800;
let h = 400;


function setup() {
  createCanvas(w, h);
  noStroke();
  background(0);

}

function draw() {

  if (frameCount % 19 == 0){
   for(var x = -10; x < w; x= x+55){
     for(var y = -60; y < h; y = y + 60){
       push();
       translate(x, y);
       triangolo();
       cerchio();
       pop();


     }  
    }
 
   }background(0, 0, 0, 5);
  }
    
function triangolo(){
    fill(random(100, 255),0, random(100, 255), random(200, 255));
    triangle (15, 0, movedX, movedY, 30, 50); 
    fill(random(100, 255),0, random(100, 255), random(200, 255));
    triangle (60, 100, 45, 100, 30, 50);
}

function cerchio(){
   noFill();
  strokeWeight(random(2, 10));
   stroke(random(100, 255),0, random(100, 255), random(200, 255)); 
     circle(30, 50, movedX);

}

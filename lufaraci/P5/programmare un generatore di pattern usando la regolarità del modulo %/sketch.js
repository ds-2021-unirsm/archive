function setup() { 
  createCanvas(600, 600);
  //noLoop();
} 

function draw() { 
  background(255);
  
  for (var i = 0; i < 600; i+15) {
    // modulo division with the % returns the
    // remainder of the left hand side divided by the right.
    // e.g. i % 2 == 0 when number is even
    //      i % 2 == 1 when number is odd
    if (i % 2 == 0) {
      fill(0);
      rect(i,i,20,20);
      
    } else {
      fill(220);
      rect(i,i,20,20);
      
    }
    //line(100 + i * 50, 200, 100 + i * 50, 400);
  }
  noLoop();
}
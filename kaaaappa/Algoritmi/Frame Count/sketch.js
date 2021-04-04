function setup() {
  createCanvas(800, 400);
  background (0);
  rectMode(CENTER);
  noStroke();
}

function draw() {
  //frameCount: conteggia quanti frame draw vengono letti
  if(frameCount % 10 == 0){
    fill(0, 0, random (100, 255));
    push();
    translate(400,200);
    //specificare se in radianti o in gradi
    rotate(radians(frameCount));
    triangle(18, 18, 18, 360, 81, 360);
    pop();
 }else{
       fill(0, 0, 0, 50);
    push();
    translate(400,200);
    rotate(radians(frameCount + 1));
    triangle(18, 18, 18, 360, 81, 360);
    pop();
 }
}

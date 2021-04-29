function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255, 210, 230);
  //trasla il foglio per creare del margine
  translate (20, 20)
  for (var x=5; x<400; x+=50){
    for (var y=5; y<400; y+=50) {
      push();
      translate(x, y);
      drawHouse();
      //ad ogni ciclo viene ripristinata la traslazione del canvas
      pop();
    }
  }
}

function drawHouse() {
  //crea 5 cerchi più piccoli attorno al cerchio più grande
  for (var j=0; j<5; j++) {
      push();
      rotate(TWO_PI*j/5);
      circle(6, 6, 8);
      pop();
   }
  //crea il cerchio grande
  fill (250, 241, 153);
  circle(0, 0, 15);  
}

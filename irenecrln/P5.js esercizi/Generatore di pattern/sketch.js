var x=0;
var y=0;
var sizer=30;

function setup () {
  createCanvas(windowWidth, windowHeight);
  frameRate(7); // x frame al secondo
  background(0);
}

function draw () {
  
  //background(random(255), random(50), random(250)); //ogni sec cambia colore di sfondo
  background(0);
  rectMode(CENTER);
  //width e height serve per farlo disegnare lungo l'altezza e la larghezza del canvas 
  for (var i=0; i<width; i+=sizer) {
    for (var j=0; j<height; j+=sizer) {

      
      r = random(3);

      if (r<1) {
//se esce un numero minore di 1 stampa un rettangolo
        fill (random(255), 0, 100);
        rect(x+i, y+j, (30* (sin(frameCount/60 % 60))), (30* (sin(frameCount/60 % 60))));//il valore del seno è sempre compreso tra 1 e -1 quindi 
      } else if (r<2) {
        //se esce un numero minire di 2 
        noStroke();
        fill (random(255), 0, 200);
        star(x+i, y+j, 8, 10, 7);
      }
     //noLoop();
      }
  }
  function star(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius2 * noise(0.01 * frameCount + 500);
      let sy = y + sin(a) * radius2 * noise(0.01 * frameCount + 500);
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
  
}
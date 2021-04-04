var x = 0;
var y = 0;

function setup() {
  createCanvas(400, 400);
  background(255);
  noStroke();
}

function draw() {

  fill(random(255), random(255), random(255), random(255) );
  if (random(1) > 0.5) {
    ellipse(x+10, y+10, 30, 30);
  }
  else {
    ellipse(x+7, y+7, 10, 10);
  }

  x += 20;
  
  //se esce dalla larghezza della pagina rinizia una nuova linea
  if (x > width) {
    x = 0;
    y += 20;
  }

  //se esce dalla lunghezza della pagina azzera e ricomincia dall'inizio
  if (y > height) {
    background (255);
    x = 0;
    y = 0;
  }
}

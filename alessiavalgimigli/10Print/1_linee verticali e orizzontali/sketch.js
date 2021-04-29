var x = 0;
var y = 0;

function setup() {
  createCanvas(400, 400);
  background(255);
  colorMode(HSB, 360, 100, 100)
  strokeWeight(5);
  strokeCap(ROUND);
}

function draw() {


  if (random(1) > 0.5) {
    line(x, y, x+20, y);
  }
  else {
    line(x, y, x, y+20);
  }

  x += 20;
  //se esce dalla larghezza della pagina rinizia una nuova linea
  if (x > width) {
    x = 0;
    y += 20;
  }

  //se esce dalla lunghezza della pagina azzera e ricomincia dall'inizio
  if (y > height) {
    background(random(360), 100, 100);
    stroke(random(360), 100, 100);
    x = 0;
    y = 0;
  }
}

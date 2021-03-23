// https://openprocessing.org/sketch/813345 (riferimento)

let n = 20; // numero di triangoli
let w, h;

function setup() {
  createCanvas(550, 550);
  // Calcola i triangolini disponendoli per tutta la larghezza e lunghezza
  w = width / n;
  h = height / n;
}

function draw() {
  background(255);
  fill(0);

  for (var riga = 0; riga < n; riga++) {
    for (let col = 0; col < n; col++) {
      // calcola X e Y della piastrella 
      let x = col * w;
      let y = riga * h;

      push();
      translate(x, y);

      // Disegna i triangoli
      let r = floor(random(4));

      if (r == 0) {
        triangle(0, 0, w, 0, 0, h);
      } else if (r == 1) {
        triangle(w, 0, w, h, 0, 0);
      } else if (r == 2) {
        triangle(w, h, 0, h, w, 0);
      } else if (r == 3) {
        triangle(0, h, 0, 0, w, h);
      }
      pop();
    }
  }
  noLoop();
}
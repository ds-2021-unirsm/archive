// -
// Perlin Noise di cerchi 0.1 by Gaia Andruccioli [Noise, flash, cerchi]
// 2021 © Gaia Andruccioli, Daniele @Fupete, Irene @iretrtr and the course DS-2021 at DESIGN.unirsm,
// github.com/ds-2021-unirsm — github.com/fupete - github.com/Graphein0707
// Educational purposes, MIT License, 2021, San Marino
// —

function setup() {
  createCanvas(1530, 680);
  rectMode(CENTER); //elementi ruotano rispetto al loro centro in 0,0
}

function draw() {
  background(0);
  fill(random(255), 10); //colore casuale su scala di grigi, effetto flash
  noStroke();

  translate(width / 2, height / 2); //sposto il canvas al centro

  for (var i = 0; i < 150; i++) { //per ognuno dei 150 cerchi
    push();
    rotate(TWO_PI * i / 8); //rotazione
    var tx = 200 * noise(0.01 * frameCount); //il perlin noise modifica           la dimensione dei cerchi in base alla frequenza dei frame  
    translate(tx, 0); //traslazione in base alla variabile
    scale(i / 15); //scala
    circle(0, 0, 100); //dimensione dei cerchi 
    pop();
  }
}

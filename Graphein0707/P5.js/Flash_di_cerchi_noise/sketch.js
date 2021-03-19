//Perlin noise è un generatore di sequenze casuali che produce una successione armonica di numeri più ordinata in modo naturale rispetto alla funzione random () standard.Il Perlin noise è stato inventato per applicazioni che richiedevano variazioni semi-casuali con traiettorie continue e uniformi. 

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
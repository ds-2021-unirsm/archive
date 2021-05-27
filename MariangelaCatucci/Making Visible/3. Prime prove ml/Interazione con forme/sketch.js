// Circonferenza cambia forma 0.1 by Mariangela Catucci [mouse, colors]
// 2021 © Mariangela @MariangelaC, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// —
// Help:
// mouse take points circle
// —

let vertici = [];
let totpunti = 30;

let indice = -1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < totpunti; i++) {
    let v = createVector(
      100 * cos((2 * PI * i) / totpunti) + width / 2,
      100 * sin((2 * PI * i) / totpunti) + height / 2
    );

    vertici.push(v);
  }
  console.log(vertici);
}

function draw() {
  background(255);

  fill(255, 255, 0);
  beginShape();
  let conta = 0;
  for (let punto of vertici) {
    vertex(punto.x, punto.y);
    //ellipse(punto.x, punto.y,10,10);

    if (dist(mouseX, mouseY, punto.x, punto.y) < 10 && mouseIsPressed) {
      indice = conta;

      vertici[indice] = createVector(mouseX, mouseY);
    } else {
      indice = -1;
    }
    conta++;
  }
  endShape(CLOSE);
}

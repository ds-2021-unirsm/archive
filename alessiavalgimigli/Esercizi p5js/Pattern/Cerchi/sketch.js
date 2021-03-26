function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(1);
  noFill();

  //creo un pattern lungo la larghezza della pagina
  for (let i = 25; i < width; i += 25) {
    //e lo distribuisco lungo la lunghezza
    for (let k = 25; k < height; k+=50) {
      let c = i % 2;
      print(c);
      if (c > 0) {
        ellipse(i, k, 50, 50)
      } else {
        ellipse(i, k, 20, 20)
      }
    }
  }
  
  //creo un secondo pattern che si va ad alternare al primo
  //alla larghezza sottraggo 25 perchè altrimenti disegnerebbe anche il cerchio più piccolo finale
  for (let p = 50; p < width-25; p += 25) {
    for (let q = 50; q < height; q+=50) {
      
      let a = p % 2;
      print(a);

      if (a<1) {
        ellipse(p, q, 50, 50)
      } else {
        ellipse(p, q, 20, 20)
      }
    }
  }
  
  noLoop();
}

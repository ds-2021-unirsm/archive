//crea un array di colori, toglie il trattino e mette l'asterisco
let colori = "1200ff-0092ff-00fff8-fff655-fffcd9".split("-").map(a => "#" + a)

let w = [];
let nWalkers = 20;
let world = 700;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noStroke();

  for (let i = 0; i < nWalkers; i++) {
    w.push(new Walker());
  }
}

function draw() {
  translate(windowWidth / 2, windowHeight / 2)
  rotate(frameCount / TWO_PI)
  translate(-world / 2, -world / 2)

  for (let i = 0; i < nWalkers; i++) {
    w[i].move();
    w[i].display();

  }
}

function Walker(_id) {
  this.id = _id;
  this.x = 0;
  this.y = 0;
  this.t = random(100);
  this.tIncr = random(-1, 2) * 0.001;

  this.move = function() {
    this.x = noise(this.t) * world;
    this.y = noise(this.t + 25) * world;
    this.t += this.tIncr;
  }

  this.display = function() {
    //più questo numero è alto più tempo ci mette a cambiare colore
    let cambioColore = 70
    let color1 = (int(frameCount / cambioColore)) % 5
    let color2 = (int(frameCount / cambioColore) + 1) % 5
    let ratio = (frameCount / cambioColore) * 0.01

    this.d = random(1, 5);
    ellipse(this.x, this.y, (this.d * mouseX) * 0.005);

    //lerpColor prende due colori di riferimento e ne trova un terzo compreso tra essi
    //in questo caso vengono presi due colori dall'array colori
    fill(lerpColor(color(colori[color1]), color(colori[color2]), ratio));
    noStroke();
  }

}

function mousePressed() {
  clear();
  background(0);
}

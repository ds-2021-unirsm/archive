let walkers = [];
let alpha; //float

function setup() {

  createCanvas(1112, 834);
  background(0);

  noStroke();
  setWalkers();
}

function draw() {
  //frameRate(120);
  alpha = map(mouseX, 0, width, 5, 35);
  fill(0, alpha);
  rect(0, 0, width, height);

  // crea n oggetti di classe Camminatore
  for (i = 0; i < 10000; i++) {
    walkers[i].move();
  }
}

function setWalkers() {
  for (let i = 0; i < 10000; i++) {
    let x = random(width);
    let y = random(height);
    let adj = map(y, 0, height, 255, 0);
    let c = color(40, adj, 255);
    walkers[i] = new Walker(x, y, c);
  }
}


class Walker {
  constructor(xIn, yIn, cIn) {
    this.posX = xIn;
    this.posY = yIn;
    this.c = cIn;
    this.incr = 0.0;
  }

  move() {
    this.update();
    this.wrap();
    this.display();
  }

  update() {
    this.incr += 0.006;
    let theta = noise(this.posX * 0.001, this.posY * 0.0008, this.incr) * TWO_PI; // cambia 0.001 a 0.008
    this.posX += 1 * cos(theta);
    this.posY += -10 * tan(theta); //          //          //          //          //cambia da tan a sen
  }

  display() {
    if (this.posX > 0 && this.posX < width && this.posY > 0 && this.posY < height) {
      //pixels[int(this.posX) + int(this.posY * width)] =  this.c;
      stroke(this.c);
      point(this.posX, this.posY);
    }
  }

  wrap() {
    if (this.posX < 0) this.posX = width;
    // if (this.posX > width ) this.posX =  0;
    if (this.posY < 0) this.posY = height;
    if (this.posY > height) this.posY = 0;
  }
}
//particelle

class particle {
  constructor(x, y, _id) {
    this.id = _id;
    this.x = x;
    this.y = y;
  //  this.t = 1;
  //  this.tIncr = 5;
    this.raggio = random(3, 8);
    this.vita = random(0, 40);
    this.velocity = random(-1, 1);
    this.velocitx = random(-1, 1);
  }
  
  update() {
    this.x += this.velocitx //* this.t;
    this.y += this.velocity //* this.t + 5;
    this.vita--;
  //  this.t += this.tIncr;
  }

  disegna() {
    push();
    noStroke();
    translate(this.x, this.y);
    fill(180, 47, 235, this.vita);
    ellipseMode(RADIUS);
    ellipse(0, 0, this.raggio, this.raggio);
    pop();
  }
}

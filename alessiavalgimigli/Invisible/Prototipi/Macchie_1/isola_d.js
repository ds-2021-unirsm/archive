function Isola_d() {
    this.x = 0;
    this.y = 0;
    this.r = 0;
      this.t = random(50)*0.1;
    this.t2 = 0.001;

  this.move = function () {       
    this.x = map(noise(this.t), 0, 1, 300, 400);
    this.y = map(noise(this.t+5), 0, 1, 300, 400);
    this.t += this.t2;
  }

  this.show = function () {
    this.r = 10;
    stroke(0, 255, 0);
    ellipse(this.x, this.y, this.r);
  }
}

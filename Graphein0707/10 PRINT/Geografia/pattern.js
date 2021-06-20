class Pattern {
  constructor() {
    angleMode(RADIANS);
    
    this.time = 0;
    this.flussox = 0;
    this.flussoy = 0;
  }

  movimento() {
    this.linee = random(0.1, 3);

    //velocità di movimento e direzione
    //movimento inizia in alto a sinistra
    this.flussox += noise(this.linee) * 0.01;
    this.flussoy += noise(this.linee + 2) * 0.01;
    this.time += 0.01;
  }

  trama(x, y) {
    return noise(
      //movimento
      (2 * x) / width - this.flussox,
      (2 * y) / width - this.flussoy,
      this.time
    );
  }
}

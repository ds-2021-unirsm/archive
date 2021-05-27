class Pattern {
  constructor() {
    angleMode(RADIANS);
    
    this.time = 0;
    this.flusso = 0;
    this.flussob = 0;
  }

  movimento() {
    this.linee = random(0.1, 3);

    this.flusso += noise(this.linee) * 0.01;
    this.flussob += noise(this.linee - 2) * 0.01;
    this.time += 0.01;
  }

  trama(x, y) {
    return noise(
      (2 * x) / width - this.flusso,
      (2 * y) / width - this.flussob,
      this.time
    );
  }
}

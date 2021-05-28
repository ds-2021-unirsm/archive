class goccia {
  constructor(x, y, angle = 0) {
    this.x = x;
    this.y = y;
    this.radius = 30;
    //orientamento macchinina
    this.angle = angle; //utilizzare i radianti
    this.speed = 1;
    this.rosso = color(255, 0, 0);
    this.verde = color(0, 255, 0);
    this.colori = [this.rosso, this.verde];
    this.estrazioneColori = random(this.colori);
  }

  update() {
    //trigonometria serve per lo spostamento orizzontale, se no va in diagonale
    this.x += this.speed * cos(this.angle); 
    this.y += this.speed * sin(this.angle);

    if (this.x < this.radius || this.x > width - this.radius) {
      this.speed *= -1;
      this.radius = 10;
    }

    if (this.y < this.radius || this.y > height - this.radius) {
      this.speed *= -1;
    }
  }

  followPoint(x, y) {
    //creiamo il vettore del target
    let dis = createVector(x, y);
    //sottraiamo un nuovo vettore
    dis.sub(createVector(this.x, this.y));
    //normalizziamo il valore dato dalla differenza in modo da ricavare la direzione
    dis.normalize();
    g.applyForce(dis.x, dis.y);
  }

  //applichaimo una forza
  applyForce(fx, fy) {
    let xvel = this.speed * cos(this.angle) + fx;
    let yvel = this.speed * cos(this.angle) + fy;
    let vectVel = createVector(xvel, yvel);
    this.angle = vectVel.heading();

    // console.log(fx + " " + fy)
    /* let vec = createVector(fx, fy);
  let vectAngle = vec.heading();
      if (this.angle - vecAngle > 0) {
    this.angle -= 0.01;
  } else if (this.angle - vecAngle < 0) {
    this.angle += 0.01;
  } */
  }

  show() {
    noFill();
    stroke(this.estrazioneColori);
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    //fill(200, 0, 200);
    rectMode(CENTER);
    ellipse(0, 0, this.radius);
    pop();
  }
}

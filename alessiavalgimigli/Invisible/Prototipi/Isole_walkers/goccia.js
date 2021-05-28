class goccia {
  constructor(x, y) {
    this.location = createVector(x, y);
    this.velocity = createVector(random(-3, 3), random(-3, 3));
    this.acceleration = createVector(0, 0);
    // Additional variable for size
    this.radius = 30;
    this.maxforce = random(0.002, 0.1);
    this.maxspeed = random(1, 3);
    this.rosso = color(255, 0, 0);
    this.verde = color(0, 255, 0);
    this.colori = [this.rosso, this.verde];
    this.estrazioneColori = random(this.colori);
  }

  // Our standard “Euler integration” motion model
  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    // this.t = random(50) * 0.1;
    //this.t2 = 0.001;

    if (
      this.location.x < this.radius ||
      this.location.x > width - this.radius
    ) {
      this.velocity.x *= -1;
      this.radius = 10;
      //  this.location.x = map(noise(this.t), 0, 1, 300, 400);
      // this.location.y = map(noise(this.t + 5), 0, 1, 300, 400);
    }

    if (
      this.location.y < this.radius ||
      this.location.y > height - this.radius
    ) {
      this.velocity.y *= -1;
      // this.location.x = map(noise(this.t), 0, 1, 300, 400);
      // this.location.y = map(noise(this.t + 5), 0, 1, 300, 400);
    }
  }

  // Newton’s second law; we could divide by mass if we wanted.
  applyForce(force) {
    this.acceleration.add(force);
  }

  // Our seek steering force algorithm
  seek(target) {
    let desired = target.sub(this.location);
    desired.normalize();
    desired.mult(this.maxspeed);
    let steer = desired.sub(this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }

  fdisplay() {
    // Vehicle is a triangle pointing in
    // the direction of velocity; since it is drawn
    // pointing up, we rotate it an additional 90 degrees.
    let theta = this.velocity.heading();
    noFill();
    stroke(this.estrazioneColori);
    push();
    translate(this.location.x, this.location.y);
    rotate(theta);
    ellipseMode(CENTER);
    ellipse(0, 0, this.radius);
    pop();
  }
}

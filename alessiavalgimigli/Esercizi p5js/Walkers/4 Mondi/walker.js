class Walker {
  constructor(x, y, targetVector) {
    this.location = createVector(x, y);
    this.velocity = createVector(random(-0.3, 0.3), random(-0.3, 0.3));
    this.acceleration = createVector(0, 0);
    // Additional variable for size
    this.r = random(10, 50);
    this.maxforce = 0.03;
    this.maxspeed = 1;
    this.arrivato = false;
    this.t = random(50) * 0.1;
    this.t2 = 0.001;
    //il target è il punto verso cui le gocce si dirigono
    this.area = targetVector;
  }

  update() {
    //se viene pescato un numero randomico inferiore al valore indicato allora modifica l'accelerazione, in modo da creare dei cambiamenti nel moto
    
    //attraverso il pescaggio random si generano dei piccoli picchi di accelerazione durante il movimento della goccia
    
    if (random() < 0.002)
      this.acceleration.add(createVector(random(-0.01, 0.01), random(-0.01, 0.01))); 

   this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
   this.acceleration.mult(0);
  }

  //modifica la traiettoria rendendola più irregolare e meno lineare
  noise() {
    this.location.x += map(noise(this.t), 0, 1, -0.2, 0.2);
    this.location.y += map(noise(this.t + 5), 0, 1, -0.2, 0.2);
    this.t += this.t2;
  }

  // Newton’s second law; we could divide by mass if we wanted.
  
  
  applyForce(force) {
    this.acceleration.add(force);
  }

  // Our seek steering force algorithm
  // è la funzione che serve alle gocce per raggiungere il target
  seek() {
    let area = this.area.copy();
    let desired = area.sub(this.location);
    desired.normalize();
    desired.mult(this.maxspeed);
    let steer = desired.sub(this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);

    if (area.sub(this.location).mag() < 20) {
      this.arrivato = true;
    } else {
      this.arrivato = false;
    }
  }

  display() {
    noStroke();
    fill(255, 30);
    push();
    translate(this.location.x, this.location.y);
    ellipseMode(CENTER);
    ellipse(0, 0, this.r);
    pop();
  }
}

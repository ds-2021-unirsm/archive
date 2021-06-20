class Goccia {
  constructor(x, y, c, targetVector, _id, estr) {
    this.id = _id;
    this.estrazione = estr;
    this.location = createVector(x, y);
    this.velocity = createVector(random(-0.1, 0.1), random(-0.1, 0.1));
    this.acceleration = createVector(0, 0);
    // Additional variable for size
    this.r = 3;
    this.maxforce = 0.01;
    this.maxspeed = 0.5;
    this.arrivato = false;
    this.color = c;
    this.t = random(50) * 0.1;
    this.t2 = 0.001;
    //il target è il punto verso cui le gocce si dirigono
    this.macchia = targetVector;
    this.fade = 0;
    this.fadeAmount = 1;
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
    let macchia = this.macchia.copy();
    let desired = macchia.sub(this.location);
    desired.normalize();
    desired.mult(this.maxspeed);
    let steer = desired.sub(this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);

    if (macchia.sub(this.location).mag() < 20) {
      this.arrivato = true;
    } else {
      this.arrivato = false;
    }
  }

  display(tx) {
    noFill();
    stroke(this.color);
    push();
    translate(this.location.x, this.location.y);
    ellipseMode(CENTER);
    ellipse(0, 0, 10, 10);
    noStroke();
    fill(255, this.fade);
    text(tx, 10, 10, 200, 200);
    pop();
    
    //fade in e out del testo
    if (this.fade < 0) this.fadeAmount = 0;
    if (this.fade > 1000) this.fadeAmount = -2;
    this.fade += this.fadeAmount * 6;
  }

  scontro(altra_goccia) {
    //dist calcola la distanza tra due punti
    this.d = dist(
      this.location.x,
      this.location.y,
      altra_goccia.location.x,
      altra_goccia.location.y
    );
    //se la distanza è minore della somma dei due raggi vuol dire che c'è uno scontro
    if (this.d <= this.r + altra_goccia.r) {
          /*  p5.Vector.add(
          this.macchia,
          createVector(random(-30, 30), random(-30, 30))
        );*/
      return true;
    } else {
      return false;
    }
  }

  
  distanziamento() {
    
    this.acceleration.add(
          this.macchia,
          createVector(random(0.001, 0.01), random(0.001, 0.01)));
        /*altra_goccia.acceleration.add(
          this.macchia,
          createVector(map(noise(this.t), 0, 1, 10, -20), map(noise(this.t), 0, 1, 20, -10)));*/
      
  } 
}

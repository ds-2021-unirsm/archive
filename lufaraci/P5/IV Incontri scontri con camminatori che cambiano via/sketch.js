let walkers = [];
let d;
let numberWalkers = 30;
let t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < numberWalkers; i ++){
    walkers[i] = new Walkers(random(width), random(height));
  }
  t += 0.01 
}

function draw() {
  background(255,0,0,5);
  noStroke();
  
  for (let i = 0; i < walkers.length; i ++){
    walkers[i].movimento();
    walkers[i].display();
   
    for (let j = 0; j < walkers.length; j++){

      if (i != j && walkers[i].collisioni(walkers[j])) {
      }
    }
  }
}

function Walkers (x, y, id, others) {
  this.x = x;
  this.y = y;
  this.r = 20;
  this.others = others;
  this.id = id;
  this.col = color(0, 0, 200);
  
  this.xspeed = random(0, 5);
  this.yspeed = random(0, 5);


  this.collisioni = function (other) {
    d = dist(this.x, this.y, other.x, other.y);
    
    if (d <= this.r + other.r) {
  
      this.xspeed = this.xspeed * -1;
      this.yspeed = this.yspeed * -1;

      return true;
    } else {
      return false;
    }
  }

  this.display = function(){
    noStroke();
    fill(this.col);
    ellipse(this.x, this.y, this.r * 2, this.r *2);
  }
  
  this.movimento = function(){
    this.x = this.x + this.xspeed * noise(t);
    this.y = this.y + this.yspeed * noise(t);
    
    if (this.x > width + this.r || this.x < this.r) {
      this.xspeed = this.xspeed * -1;
    }
    if (this.y > height + this.r || this.y < this.r) {
      this.yspeed = this.yspeed * -1;
    }
  }
}

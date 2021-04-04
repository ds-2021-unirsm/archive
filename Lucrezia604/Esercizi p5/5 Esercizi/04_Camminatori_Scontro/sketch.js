let objects = []; 
let d;
let numberObjects = 10;
let t = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  
  for (let i = 0; i < numberObjects; i ++){
   
    objects[i] = new Objects(random(width), random(height));
  }

  t += 0.01 
}


function draw() {
  background(255);
  
  
  for (let i = 0; i < objects.length; i ++){
    objects[i].movimento();
    objects[i].display();
    

    for (let j = 0; j < objects.length; j++){
      
     
      if (i != j && objects[i].collisione(objects[j])) {
        objects[i].changeColor();
        objects[j].changeColor();
      }
    }
  }
}


function Objects (x, y, amp, id, others) {
  this.x = x;
  this.y = y;
  this.r = 10; 
  this.others = others;
  
  this.id = id;
  this.col = color(0, 500, 200, 250);
 
  
  this.xspeed = random(-4, 4);
  this.yspeed = random(-4, 4);
  
  
  this.changeColor = function (){
    this.col = color(500, 200, 0, 300)
  }

  this.collisione = function (other) {
    d = dist(this.x, this.y, other.x, other.y);
    
    if (d <= this.r + other.r) {
      
      
      this.xspeed = this.xspeed * -1;
      this.yspeed = this.yspeed * -1;
      
      if (random(2) < 1) {
        this.r = this.r - 0.6;
      } else {
        this.r = this.r + 0.5;
      }
      return true;
    } else {
      return false;
    }
  }

  this.display = function(){
    noStroke();
    fill(this.col);
    rect(this.x, this.y, this.r * 2, this.r *2);
  }
  
  this.movimento = function(){
    this.x = this.x + this.xspeed * noise(t);
    this.y = this.y + this.yspeed * noise(t);
    
    //così torna indietro
    if (this.x > width - this.r || this.x < this.r) {
      this.xspeed = this.xspeed * -1;
    }
    if (this.y > height - this.r || this.y < this.r) {
      this.yspeed = this.yspeed * -1;
    }
  }
}
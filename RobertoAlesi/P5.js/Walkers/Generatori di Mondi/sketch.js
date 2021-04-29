let walkers = []
let n = 3;
let world = 700;


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  //noStroke();
background(0);
 
  //creo tutti i walkers
for (let i=0; i<n; i++)
   walkers.push(new Walker(i))
  
}

function draw() {
  lights();
  orbitControl();
  

    //box(50);
 rotate(frameCount%TWO_PI*mouseX)
 translate(-world/2,-world/2,-world/2)
  
 for (let i=0; i<walkers.length; i++){
   walkers[i].display()
   walkers[i].walk()
 }
}

function mousePressed(){
  walkers.push(new Walker(walkers.lenght))

}

function keyPressed(){
  walkers.pop(new Walker(walkers.lenght))

}

function Walker(_id){
  this.id = _id;
  this.x =   this.r =0;
  this.y =  this.g = 0;
  this.z =   this.b =0;
  this.tDelta = random(100)
  this.t = random(100);
  this.tIncr = random(1,3)*0.003;
  this.size = 10;

  
  this.display = function (){
  
    push()
    this.r = map(this.x, 0 ,world, 0 ,255)
    this.g = map(this.y, 0 ,world, 0 ,255)
    this.b = map(this.z, 0 ,world, 0 ,255)
    this.size= noise(this.t+5)*30;
    noStroke();
    fill(this.r*2, this.g/5 ,  this.b);
    translate(this.x, this.y, this.z);
   
    sphere(this.size);
    pop()
  }
  
  this.walk = function(){
    this.x= noise(this.t) * world;
    this.y= noise(this.t+5) * world;
    this.z= noise(this.t+10) * world;
    this.t += this.tIncr;
  }
 
}

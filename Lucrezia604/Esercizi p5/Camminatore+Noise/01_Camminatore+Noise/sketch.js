let Palline = []; 
let n = 10; 
let xoff1 = 300;
let xoff2 = 80;

function preload() {
//
}

function setup() {
  createCanvas(windowWidth, windowHeight, P2D); 
  background(30);

  // gruppo iniziale di Linee
  for (let i=0; i<n; i++) {
    Palline.push(new Astronave(i));
  }
}

function draw() {
  background(130);

  //orbitControl(); 

  push(); 
  translate(0,0); 
  
  
  for (var i=0; i<Palline.length; i++) {
    Palline[i].spostati();
    Palline[i].mostrati();
    
    }
  pop();
}


function Astronave(_id) {

  // dati e costruttore
  this.id = _id;
  let x = width/2 + random (-width/5,width/5);
  let y = height/2 + random (-height/5,height/5);
  
  

  // funzionalità

  this.mostrati = function() {
    
    fill(15);
    ellipse(this.x,this.y, 70, 100);
  }

  this.spostati = function() {
    let vel = random(0, 0.0003);
    
    this.x =  map(noise(x + xoff1), 0, 1, 0, width);
    this.y =  map(noise(y + xoff2), 0, 1, 0, height);
  
    xoff1 += vel;
    xoff2 += vel;
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function setup() { 
  createCanvas(500, 500);
  //frequenza dei fotogrammi (velocità di ingrandimento quadrati)
  frameRate(5);
  //frequenza al centro
  rectMode(CENTER);
} 

function draw() { 
  background(10);
  for (var i = 0  ;  i < 25  ;  i++) {
    for (var v= 0; v < 25; v++) {
    
  //verticale, 
    if (i % 3 == 0 || v % 3 == 0) {   
      
    }else {
      //rgb
      fill(random(255), 255);
      // i = distanza tra assi y ; v = distanza tra assi x
      rect(i*55, v*55, frameCount%50, frameCount%80);
      }
    }
  }
}
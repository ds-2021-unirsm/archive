//  ______  ____  ___  _______  __________ ______ ____ ______________
//  __/ _ \/ __ \/ _ )/ __/ _ \/_  __/ __ \ _/ _ |_/ /__/ __/ __/  _/
//  _/ , _/ /_/ / _  / _// , _/ / / / /_/ / / __ |/ /__/ _/_\ \_/ /
//  /_/|_|\____/____/___/_/|_| /_/  \____/ /_/ |_/____/___/___/___/
//
// -
// Generatore_di_pattern 0.1 by Roberto [generatore, pattern]
// 2021 © Roberto @ciunart, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete — github.com/RobertoAlesi
// Educational purposes, MIT License, 2021, San Marino
// —

var spz = 10;
var t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
//  frameRate(160);
}

function draw() {
  background(0,10);
  
    // fill(float(noise(t)*255));

  for (var x = 0; x<= windowWidth; x+=5) {
    for (var y = 0; y<= windowHeight; y+=5) { 
      var posX = spz * x;    
      var posY = spz * y; 
      
      if(x%3==0 || y%3==0){
        stroke(255);
       
         circle(posX, posY, 90- frameCount%90);
        }
      else if(x%1==0 || y%1==0){
       // push(); 
        stroke(255);
        noFill();
        //rotate(frameCount%2*TWO_PI)
        rect(posX, posY, frameCount%120,frameCount%120);
   
      }
      t++
      
     }
   }
}

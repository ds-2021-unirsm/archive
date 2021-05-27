//  ______  ____  ___  _______  __________ ______ ____ ______________
//  __/ _ \/ __ \/ _ )/ __/ _ \/_  __/ __ \ _/ _ |_/ /__/ __/ __/  _/
//  _/ , _/ /_/ / _  / _// , _/ / / / /_/ / / __ |/ /__/ _/_\ \_/ /
//  /_/|_|\____/____/___/_/|_| /_/  \____/ /_/ |_/____/___/___/___/
//
// -
// Layering 0.1 by Roberto [layering, terrain]
// 2021 © Roberto @ciunart, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete — github.com/RobertoAlesi
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to: 
// @daniel_shiffman for https://github.com/CodingTrain
// —

var colonne, righe;

var scala = 25;

var w = 600;
var h = 600;

var terrain = [];

var muovi = 0;



function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  
  //lrghezza e altezza/ grandezza modulo
  colonne = w / scala ;
  righe = h / scala ;
  
    for (var x = 0; x < colonne; x++) {
    terrain[x] = [];
    for (var y = 0; y < righe; y++) {
      terrain[x][y] = 0;
    }
  }

}

function draw() {
  
  muovi -= 0;

  var yoff = muovi;
  for (var y = 0; y < righe; y++) {
    var xoff = muovi;
   for (var x = 0; x < colonne; x++) {
     var variazione = noise(xoff, yoff);
      terrain[x][y] = map(variazione, 0, 1, -150, 150);
      xoff += 0.1;
    }
    yoff += 0.1;
  }

  lights();


  orbitControl();
  background(0);

  
  translate(0, 50);
  rotateX(PI / 3);

  
 
  translate(-w / 2, -h / 2);
  //creo la griglia del terrain
  for (var y = 0; y < righe-1; y++) {
    
    //beginShape(TRIANGLE_STRIP);
    
    for (var x = 0; x < colonne; x++) {
    
      
 noStroke();
   
  push();
      translate(x * scala, y * scala, terrain[x][y]);
      console.log(this.terrain[x][y])
      
       if(this.terrain[x][y]<5){
        specularMaterial(0,130,200);
      }else {
        ambientMaterial(50,200,0);
      }
      
        box(scala,scala,scala);
      
     vertex(x * scala, y * scala, terrain[x][y]);
      vertex(x * scala, (y + 1) * scala, terrain[x][y + 1]);
      pop();
      
   
    
    }
    //endShape();
    
     // console.log(x * scala);
  }
}

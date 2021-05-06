//SHIFFMAN: 3D Terrain Generation
//https://www.youtube.com/watch?v=IKB1hWWedMk&list=RDCMUCvjgXvBlbQiydffZU7m1_aw&index=3

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

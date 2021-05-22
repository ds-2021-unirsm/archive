// -
// Generatore_di_paesaggi 0.1 by Roberto [terrain, generator]
// 2021 © Roberto @ciunart, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete — github.com/RobertoAlesi
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to: 
// @daniel_shiffman for https://github.com/CodingTrain
// —

let gui = new UIL.Gui({ // interfaccia
  css:'right:0; top:0;',
  bg:'#7777aa', // to update new version
  w:300 
} ); 

var colonne;
var righe;

var w = 600;
var h = 600;
var terrain = [];
var muovi = 0;

var parametri = {
  velocità: 0.005,
  scala: 20,
  colore1: [0, 128, 255],
  colore2: [182,227,219],
  colore3: [229,217,194],
  colore4: [114,84,40],
  colore5: [181,186,97],
  colore6: [124,141,76],
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  
    colonne = w / parametri.scala ;
  righe = h / parametri.scala ;
  
    for (var x = 0; x < colonne; x++) {
    terrain[x] = [];
    for (var y = 0; y < righe; y++) {
      terrain[x][y] = 0;
    }
  }
  
  muovi -= parametri.velocità;
console.log(righe, colonne, parametri.velocità)
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
    for (var x = 0; x < colonne; x++) {
    
      
 noStroke();
   
  push();
      translate(x * parametri.scala, y * parametri.scala, terrain[x][y]);
      //console.log(this.terrain[x][y])
      
       if(this.terrain[x][y]<-60){
        specularMaterial(parametri.colore1);
      }else if(this.terrain[x][y]<-40){
        specularMaterial(parametri.colore2);
      }else if(this.terrain[x][y]<-20){
        ambientMaterial(parametri.colore3);
      }else if(this.terrain[x][y]<0){
        ambientMaterial(parametri.colore4);
      }else if(this.terrain[x][y]<30){
        ambientMaterial(parametri.colore5);
      }     
      else {
        ambientMaterial(parametri.colore6);
      }
            
     box(parametri.scala,parametri.scala,100);
      
 pop();  
    }
  }
}

window.onload = function() {
  var gui = new dat.GUI();
   gui.add(parametri, 'scala', 10, 40);
   gui.add(parametri, 'velocità', 0, 0.1);
   gui.addColor(parametri, 'colore1');
   gui.addColor(parametri, 'colore2');
   gui.addColor(parametri, 'colore3');
   gui.addColor(parametri, 'colore4');
   gui.addColor(parametri, 'colore5');
   gui.addColor(parametri, 'colore6');

}

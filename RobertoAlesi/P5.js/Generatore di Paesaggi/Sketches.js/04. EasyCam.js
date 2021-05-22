// -
// Generatore_di_paesaggi_EasyCam 0.1 by Roberto [terrain, generator, easycam, gui]
// 2021 © Roberto @ciunart, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete — github.com/RobertoAlesi
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to: 
// @daniel_shiffman for https://github.com/CodingTrain
// https://www.youtube.com/watch?v=IKB1hWWedMk
// —

var colonne;
var righe;

var wb = 600;
var hb = 600;
var terrain = [];
var muovi1 = 0;
var muovi2 = 0;

var NX = 1;
var NY = 2;
var cameras;


var parametri = {
  velocitàx: 0.005,
  velocitày: 0.005,
  preSet: "base",
  scala: 20,
  
//base
  colore1: [0, 128, 255],
  colore2: [182,227,219],
  colore3: [229,217,194],
  colore4: [114,84,40],
  colore5: [181,186,97],
  colore6: [124,141,76],
  
//cyber  
  colore7: [214, 128, 255],
  colore8: [180,0,255],
  colore9: [142,154,255],
  colore10: [0,30,255],
  colore11: [0,184,255],
  colore12: [0,255,159],

  
//pastel  
  colore13: [246, 138, 128],
  colore14: [246,191,127],
  colore15: [225,220,128],
  colore16: [116,185,156],
  colore17: [117, 155, 142],
  colore18: [148,200,199],
  
 //candy 
  colore19: [255, 236, 222],
  colore20: [251,202,234],
  colore21: [241,98,162],
  colore22: [192,98,241],
  colore23: [49,112,207],
  colore24: [41,62,107],
  
//fire
  colore25: [255,0,0],
  colore26: [255,70,9],
  colore27: [255,102,9],
  colore28: [255,136,9],
  colore29: [255,171,9],
  colore30: [255, 255, 0],
  
  //neon
  colore31: [255,0,92],
  colore32: [255,191,0],
  colore33: [250,255,0],
  colore34: [104,255,0],
  colore35: [19,244,239],
  colore36: [0, 111, 255],
}

function setupGui() {
}
window.onload = function() {
  var gui = new dat.GUI();
   gui.add(parametri, 'scala', 10, 40);
   gui.add(parametri, 'velocitàx', 0, 0.1);
   gui.add(parametri, 'velocitày', 0, 0.1);
  
  var f2 = gui.addFolder('Cambia colori base');
   f2.addColor(parametri, 'colore1');
   f2.addColor(parametri, 'colore2');
   f2.addColor(parametri, 'colore3');
   f2.addColor(parametri, 'colore4');
   f2.addColor(parametri, 'colore5');
   f2.addColor(parametri, 'colore6');
  
   gui.add(parametri, 'preSet', ['base', 'cyber', 'pastel', 'candy', 'fire', 'neon']);
  

}


//let weirdColor = [0, 0, 0];



function setup() {
  
  pixelDensity(1);
  
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  setAttributes('antialias', true);
   setupGui();
  
  var RENDERER = this._renderer;
  
  console.log(Dw.EasyCam.INFO);

  cameras = [];
  cameras.length = NX * NY;
 
  for(var i = 0; i < cameras.length; i++){
    // create EasyCam
    cameras[i] = new Dw.EasyCam(RENDERER);
    // set ID
    cameras[i].ID = i;
    // remove canvas, we handle this manually
    cameras[i].setCanvas(null);
    // no autoupdate, also handled manually
    cameras[i].setAutoUpdate(false); 
    // set some random states at the beginning
    var rx = random(-PI,PI)/random(5,8);
    var ry = random(-PI,PI)/random(2,8);
    var rz = random(-PI,PI)/random(1);
   
     cameras[i].setRotation(Dw.Rotation.create({angles_xyz:[rx,ry,rz]}), 2000);
    cameras[i].setDistance(random(600, 5000), 500);
    cameras[i].setRotation(Dw.Rotation.create({angles_xyz:[rx,ry,rz]}), 2000);
    cameras[i].setDistance(random(300, 500), 500);
    
  }
  
  // set camera viewports
  setCameraViewports();
}



function setCameraViewports(){
  var gap = 3;
  
  // tiling size
  var tilex = floor((width  - gap) / NX);
  var tiley = floor((height - gap) / NY);
 
  // viewport offset ... corrected gap due to floor()
  var offx = (width  - (tilex * NX - gap)) / 2;
  var offy = (height - (tiley * NY - gap)) / 2;
  
  // viewport dimension
  var cw = tilex - gap;
  var ch = tiley - gap;
  
  // create new viewport for each camera
  for(var y = 0; y < NY; y++){
    for(var x = 0; x < NX; x++){
      var id = y * NX + x;
      var cx = 0;
      var cy = offy + y * tiley;
      cameras[id].setViewport([cx, cy, cw, ch]); // this is the key of this whole demo
    }
  }

}


function draw() {
    
  // update current camera states
  for (var i in cameras){
    cameras[i].update();
  }
  
  // check if god-mode is on
 // handleSuperController(cameras)
  
  // clear background once, for the whole window
  setGLGraphicsViewport(0,0,width,height);
  clear();
  
  randomSeed(0);
  
  // render scene once per camera/viewport
  for (var z in cameras){
    var cam =  cameras[z];
    push();
    displayScene(cam);
    pop();
  
  }  
}

function setGLGraphicsViewport(x,y,w,h){
  var gl = this._renderer.GL;
  gl.enable(gl.SCISSOR_TEST);
  gl.scissor (x,y,w,h);
  gl.viewport(x,y,w,h);
}


///////////////SCENA DA MOSTRARE//////////////////
function displayScene(cam){
  
  var viewport = cam.getViewport();
  var w = viewport[2];
  var h = viewport[3];
  var xb = viewport[0];
  var yb = viewport[1];
  var y_inv =  height - yb - h; // inverted y-axis
  
  // scissors-test and viewport transformation
  setGLGraphicsViewport(xb,y_inv,w,h);
  
  // modelview - using camera state
  cam.apply(this);
  
  // projection - using camera viewport
  perspective(60 * PI/500, w/h, 1, 5000);
  
  
///////////////TERRAIN////////////////// 
  colonne = wb / parametri.scala ;
  righe = hb / parametri.scala ;
  
    for (var x = 0; x < colonne; x++) {
    terrain[x] = [];
    for (var y = 0; y < righe; y++) {
      terrain[x][y] = 0;
    }
  }
  
  
///////////////MOVIMENTO NOISE//////////////////  
  muovi1 -= parametri.velocitàx;
  muovi2 -= parametri.velocitày;
  
console.log(righe, colonne, parametri.velocitàx, parametri.velocitày)
  var yoff = muovi2;
  for (var y = 0; y < righe; y++) {
    var xoff = muovi1;
   for (var x = 0; x < colonne; x++) {
     var variazione = noise(xoff, yoff);
      terrain[x][y] = map(variazione, 0, 1, -150, 150);
      xoff += 0.1;
    }
    yoff += 0.1;
  }
  
///////////////LUCI/CONTROLLI//////////////////
  lights();
  background(0);
  translate(0, 50);
  rotateX(PI / 3);
  translate(-wb / 2, -hb / 2);
  

///////////////GRIGLIA//////////////////
    for (var y = 0; y < righe-1; y++) {
    for (var x = 0; x < colonne; x++) {
    
      
 noStroke();
  
///////////////COLORE//////////////////
      
 if (parametri.preSet == "base"){
   if(this.terrain[x][y]<-60){
        ambientMaterial(parametri.colore1);
      }else if(this.terrain[x][y]<-40){
        ambientMaterial(parametri.colore2);
      }else if(this.terrain[x][y]<-20){
        ambientMaterial(parametri.colore3);
      }else if(this.terrain[x][y]<0){
        ambientMaterial(parametri.colore4);
      }else if(this.terrain[x][y]<30){
        ambientMaterial(parametri.colore5);
      } else {
        ambientMaterial(parametri.colore6);
      }}
      
      else if(parametri.preSet == "cyber"){
      if(this.terrain[x][y]<-60){
        ambientMaterial(parametri.colore7);
      }else if(this.terrain[x][y]<-40){
        ambientMaterial(parametri.colore8);
      }else if(this.terrain[x][y]<-20){
        ambientMaterial(parametri.colore9);
      }else if(this.terrain[x][y]<0){
        ambientMaterial(parametri.colore10);
      }else if(this.terrain[x][y]<30){
        ambientMaterial(parametri.colore11);
      } else {
        ambientMaterial(parametri.colore12);
      }
      }      
      
      else if(parametri.preSet == "pastel"){
      if(this.terrain[x][y]<-60){
        ambientMaterial(parametri.colore13);
      }else if(this.terrain[x][y]<-40){
        ambientMaterial(parametri.colore14);
      }else if(this.terrain[x][y]<-20){
        ambientMaterial(parametri.colore15);
      }else if(this.terrain[x][y]<0){
        ambientMaterial(parametri.colore16);
      }else if(this.terrain[x][y]<30){
        ambientMaterial(parametri.colore17);
      } else {
        ambientMaterial(parametri.colore18);
      }
      }
      
        else if(parametri.preSet == "candy"){
      if(this.terrain[x][y]<-60){
        ambientMaterial(parametri.colore19);
      }else if(this.terrain[x][y]<-40){
        ambientMaterial(parametri.colore20);
      }else if(this.terrain[x][y]<-20){
        ambientMaterial(parametri.colore21);
      }else if(this.terrain[x][y]<0){
        ambientMaterial(parametri.colore22);
      }else if(this.terrain[x][y]<30){
        ambientMaterial(parametri.colore23);
      } else {
        ambientMaterial(parametri.colore24);
      }
     }   
      
       else if(parametri.preSet == "fire"){
      if(this.terrain[x][y]<-60){
        ambientMaterial(parametri.colore25);
      }else if(this.terrain[x][y]<-40){
        ambientMaterial(parametri.colore26);
      }else if(this.terrain[x][y]<-20){
        ambientMaterial(parametri.colore27);
      }else if(this.terrain[x][y]<0){
        ambientMaterial(parametri.colore28);
      }else if(this.terrain[x][y]<30){
        ambientMaterial(parametri.colore29);
      } else {
        ambientMaterial(parametri.colore30);
      }
     } 
      
           else if(parametri.preSet == "neon"){
      if(this.terrain[x][y]<-60){
        emissiveMaterial(parametri.colore31);
      }else if(this.terrain[x][y]<-40){
        emissiveMaterial(parametri.colore32);
      }else if(this.terrain[x][y]<-20){
        emissiveMaterial(parametri.colore33);
      }else if(this.terrain[x][y]<0){
        emissiveMaterial(parametri.colore34);
      }else if(this.terrain[x][y]<30){
        emissiveMaterial(parametri.colore35);
      } else {
        emissiveMaterial(parametri.colore36);
      }
     } 
      
  push();
  
  ///////////////CUBI//////////////////
    translate(x * parametri.scala, y * parametri.scala, terrain[x][y]);
    //console.log(this.terrain[x][y])        
    box(parametri.scala,parametri.scala,100);
 pop();  
    }
  }
}
  
  

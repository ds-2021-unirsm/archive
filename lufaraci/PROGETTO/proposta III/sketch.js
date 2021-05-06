// OGGETTO PARAMETRI
// Inserire i parametri che si vogliono modificare, e i loro valori iniziali
let parametri = {
    MAGLIETTACOLORE: [198,160,255],
    cotone: 1,
    lana: 1,
    poliestere: 1,
    microfibra:1,
    print: false,
    size: 10,
    salva: function() {
    saveCanvas('myTshirt', 'png');
    
    }
};

window.onload = function() {
  
  var gui = new dat.GUI();//Crea la GUI
  var evento1 =
    gui.addColor(parametri, 'MAGLIETTACOLORE');
  var f1 = gui.addFolder('MATERIALI');
    f1.add(parametri, 'cotone',0, 100);
    f1.add(parametri, 'lana',0, 100);
    f1.add(parametri, 'poliestere',0, 100);
    f1.add(parametri, 'microfibra',0, 100);
    gui.add(parametri, 'print');
    gui.add(parametri, 'size',10,100);
    gui.add(parametri, 'salva');


}

let vel = 25;
let img;
let img1;
let img2;
let evento1;

function preload() {
  img = loadImage('img/tshirt1.png');
  img1 = loadImage('img/luna.png');
  img2 = loadImage('img/git.png');

}

function setup() {
  let c = createCanvas(w = 850, w);
  imageMode(CENTER);
}

function draw() {

  print("Frame: " + frameCount);
  print("Velocità: " + vel);
  
  let somma = parametri.cotone + parametri.lana + parametri.poliestere + parametri.microfibra;
  
  if (frameCount % vel == 0){
  background(parametri.MAGLIETTACOLORE);
  
    //rect(100,100,w-200); margini maglietta
  
  if (somma<=100) { 
  for (var i = 0; i < parametri.cotone; i++) {
      //fill(random(255), random(255), random(255));
      noStroke();
      fill(120,255,183);
      let x = random(100,w-100);
      let y = random(100,w-100);
      x1 = random(100,w-100);
      y1 = random(100,w-100);
      circle(x,y,parametri.size);
      circle(x1,y1,parametri.size);
      }
   
  for (var l = 0; l < parametri.lana; l++) {
      noStroke();
      fill(243,254,150);
      x = random(100,w-100);
      y = random(100,w-100);
      x1 = random(100,w-100);
      y1 = random(100,w-100);
      circle(x,y,parametri.size);
      circle(x1,y1,parametri.size);
      }
  
  for (var m = 0; m < parametri.poliestere; m++) {
      noStroke();
      fill(78,0,33);
      x = random(100,w-100);
      y = random(100,w-100);
      x1 = random(100,w-100);
      y1 = random(100,w-100);
      circle(x,y,parametri.size);
      circle(x1,y1,parametri.size);      
  }
    
  for (var n = 0; n < parametri.microfibra; n++) {
      noStroke();
      fill(254,198,150);
      x = random(100,w-100);
      y = random(100,w-100);
      x1 = random(100,w-100);
      y1 = random(100,w-100);
      circle(x,y,parametri.size);
      circle(x1,y1,parametri.size);
      }
    }
    else{
      alert('Controlla meglio la percentuale dei materiali');
      parametri.cotone = 0;
      parametri.lana = 0;
      parametri.poliestere = 0;
      parametri.microfibra = 0;
    }
      image(img, w/2, w/2);
      fill(136,62,215);
      textAlign(CENTER);
      textSize(20);
      text('usa le GUI per visualizzare', 0, 20, w);
      text('le % dei materiali della tua maglietta', 0, 45, w);
      textAlign(RIGHT);
      image(img2, w-115, w-32);
      fill('black');
      text('lufaraci', 0, w-40, w-20);
      
       
    if(parametri.print){
    image(img1, w/2, w/2-100);
   }
    
} 
}
//RIDIMENSIONA.(mettere l'SVG IN POS ABS?)
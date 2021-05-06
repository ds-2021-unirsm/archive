// -
// simple UI interface example [GUI]
// 2019 © Luigi @MrJ4ckpot & Daniele @Fupete 
// github.com/dsii-2019-unirsm + github.com/fupete
// Educational purposes, MIT License, 2019, Crespina IT
// —
// Credits/Thanks to: 
// https://editor.p5js.org/fupete/sketches/WUY1jA4jn for original code
// —


// OGGETTO PARAMETRI
// Inserire i parametri che si vogliono modificare, e i loro valori iniziali
let parametri = {

  coloreSfondo: [0, 0, 0, 5], 
  
  diametroEllissi: 5, // Slider: inserire valore all'avvio dello sketch 
  
  TriangoloSu: 0,

  LuciNatale: function() { // Pulsante chiama funzione: scrivere la funzione che si intende richiamare
    vel= floor(random(2, 30));
  }
};




// FUNZIONE GUI
// Inserire i parametri e il loro range se presente.
// Si possono aggiungere sezioni nascoste dichiarandole con il metodo .addFolder();
window.onload = function() {

  var gui = new dat.GUI();
  gui.addColor(parametri, 'coloreSfondo'); // Slider: inserire valore inferiore e maggiore

  var evento1 = gui.add(parametri, 'diametroEllissi', 5, 100); // EVENTO: Viene chiamata una funzione al variare del parametro

  var f1 = gui.addFolder('Triangoli'); // Crea una tendina che nasconde i prossimi parametri
  //f1.add(parametri, 'mostraQuadrato'); // Spunta: non inserire nulla
  f1.add(parametri, 'TriangoloSu', 0, 1500);
  

  gui.add(parametri, 'LuciNatale'); // Pulsante chiama funzione: non aggiungere nulla
}


let vel = 19;
let evento1;



function setup() {
  createCanvas(w = 1600, w/2);

  coloreEllisse = random(256);
}


function draw() {
   print("Frame: " + frameCount);
   print("Velocità: " + vel);
  
   if (frameCount % vel == 0){
   for(var x = -10; x < w; x= x+55){
     for(var y = -60; y < w; y = y + 60){
       push();
       translate(x, y);
       triangolo();
       cerchio();
       pop();
     }  
    }
   }
  
  //background(parametri.coloreSfondo);
  background(parametri.coloreSfondo, 5);


  noStroke();

}

    
function triangolo(){
    fill(random(100, 255),0, random(100, 255), random(200, 255));
    triangle (15, 0, parametri.TriangoloSu, 0, 30, 50); 
    fill(random(100, 255),0, random(100, 255), random(200, 255));
    triangle (60, 100, 45, 100, 30, 50);
}

function cerchio(){
   noFill();
  strokeWeight(random(2, 10));
   stroke(random(100, 255),0, random(100, 255), random(200, 255)); 
     circle(30, 50, parametri.diametroEllissi);

}

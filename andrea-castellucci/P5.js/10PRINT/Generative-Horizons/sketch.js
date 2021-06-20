//   __   __ _  ____  ____  ____   __
//  / _\ (  ( \(    \(  _ \(  __) / _\
// /    \/    / ) D ( )   / ) _) /    \
// \_/\_/\_)__)(____/(__\_)(____)\_/\_/
//
// -
// GenerativeHorizons-10PRINT by Andrea [horizons, evolution]
// 2021 © Andrea @AndrCastellucci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete — github.com/andrea-castellucci
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to: 
// Luigi @MrJ4ckpot & Daniele @Fupete for github.com/dsii-2019-unirsm + github.com/fupete
// original license: Educational purposes, MIT License, 2019, Crespina IT
// —
//
// Help:
// [GUI] Modifica i valori per generare effetti visivi differenti
//
// —

//-----------------------------------------------------
// IMPOSTAZIONI INIZIALI
let c; // canvas

// livello graphics
// contiene la traccia (stroke) che disegna la linea dell'orizzonte
// la traccia è disattivata - per visualizzarla accenderla dalla GUI
let graphics; 

// coordinate per translate
let x = 0;
let y = 0;

// var per incremento variazione noise
var y1 = 10; 
// var per incremento colore livelli
let incrementoColore = 60;
// var per distaccare i moduli lentamente nel tempo
let distaccoModuli = 0;
let incrementoDistaccoModuli = 0.005;
// dimensione modulo
let modulo = 40;

//-----------------------------------------------------
// PARAMETRI GUI
let parametri = {
  variazioneNoise: 0.005,
  strokeWeight: 2,
  strokeColor: 120,
  AutoLoop: false,
  Traccia: false,
  Reset: function() {
    background(0);
    graphics.clear();
    x=0;
    incrementoColore = 60;
    x=0;
    y=0;
    distaccoModuli = 0;
    incrementoDistaccoModuli = 0.05;
  },
  SalvaCanvas: function() {
    saveCanvas(c, 'GenerativeHorizons.jpg');
  }
};

//-----------------------------------------------------
// FUNZIONE GUI
window.onload = function() {
  var gui = new dat.GUI();
  
  var f1 = gui.addFolder('Visual');
  f1.add(parametri, 'variazioneNoise', 0, 0.1); 
  f1.add(parametri, 'Traccia');
  f1.add(parametri, 'strokeWeight', 0, 10); 
  f1.add(parametri, 'strokeColor', 0, 255);
  
  var f0 = gui.addFolder('Settings');
  f0.add(parametri, 'AutoLoop');
  f0.add(parametri, 'Reset');
  f0.add(parametri, 'SalvaCanvas');
}

//-----------------------------------------------------
// SETUP
function setup() {
  // crea il canvas e il livello graphics in primo piano
  c = createCanvas(windowWidth, windowHeight);
  graphics = createGraphics(windowWidth, windowHeight);
  graphics.clear();
  
  background(0);
}

//-----------------------------------------------------
// DRAW
function draw() {
    
      if (frameCount%2 == 0){
      // siccome il livello graphics deve essere sempre disegnato
      // dalla coordinata iniziale 0,0 del canvas è necessario fare
      // push e pop prima che questo livello venga disegnato
      push(); 
          // trasla l'origine degli assi prima su tutto l'asse x incrementando
          // di volta in volta anche l'asse y creando in tempo reale una griglia
          // di moduli entro i quali vengono disegnate cose.
          translate(x,y);
  
          graphics.strokeWeight(parametri.strokeWeight);
          fill(incrementoColore, 50);

          beginShape();
          let variazione = parametri.variazioneNoise;

          // definizione primo vertice della Shape
          noStroke();
          vertex(0,height);

          for(var i=0; i<=modulo; i++){
            // generazione vertici della Shape
            noStroke();
            vertex(i,map(noise(y1), 0,1, 0,modulo));
            // disegna i punti che formano la traccia bianca
            if(parametri.Traccia){
              graphics.stroke(parametri.strokeColor);
              graphics.point(i+x,map(graphics.noise(y1), 0,1, 0,modulo)+y);
            }
            y1+=variazione;
          }

          // definizione ultimo vertice della Shape
          noStroke();
          vertex(modulo,height);

          endShape();
      pop();
     
      // disegna il livello graphics
      image(graphics, 0, 0);
      
      // incrementa la x usata all'inizio del draw per traslare della dimensione
      // del modulo controllando ogni volta se è stata completata una riga (asse x)
      if(x<width){
        x+=modulo;
      } else{
        // incrementa il colore per generare l'effetto sfumato
        incrementoColore += 9;
        if(y>height/3){
           incrementoDistaccoModuli += 0.1;
        } else{
           incrementoDistaccoModuli += 0.001;
        }
        
        distaccoModuli += incrementoDistaccoModuli;
        x=0;
        y+=modulo;
      }
      
      // impostazioni generali di AutoLoop
      if(parametri.AutoLoop){
        if(x >= width && y >= height){
          background(0);
          graphics.clear();
          x=0;
          incrementoColore = 60;
          x=0;
          y=0;
          distaccoModuli = 0;
          incrementoDistaccoModuli = 0.005;
        }
      }
      
      // modifica il valore dell'altezza (y) dell'inizio 
      // della Traccia di ogni singolo modulo
      y1+=distaccoModuli;
      }
  }

//   __   __ _  ____  ____  ____   __
//  / _\ (  ( \(    \(  _ \(  __) / _\
// /    \/    / ) D ( )   / ) _) /    \
// \_/\_/\_)__)(____/(__\_)(____)\_/\_/
//
// -
// HumanLandscape-10PRINT by Andrea [landscapes, humanity]
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
// [webcam] rilevamento distanza tra le mani
// [webcam] rilevamento posizione mani sull'asse y
//
// —

//-----------------------------------------------------
// IMPOSTAZIONI INIZIALI
let c; // canvas
let graphics; // livello graphics

// coordinate per translate
let x = 0;
let y = 0;

// var per incremento variazione noise
var y1 = 10; 
// var per incremento colore livelli
let incrementoColore = 60;
// numero di moduli
let modulo = 40;

// impostazioni per PoseNet
let video;
let poseNet;
let pose;
let skeleton;

// dimensioni video per il rilevamento tramite PoseNet
let widthVideo = 640;
let heightVideo = 480;

// parametri gestibili con PoseNet
let variazioneNoise = 0; // posizione punto medio tra le mani sull'asse y
let tracciaWeight = 2; // distanza tra le mani

//-----------------------------------------------------
// PARAMETRI GUI
let parametri = {
  strokeColor: 255,
  distaccoModuli: 0.1,
  AutoLoop: false,
  Traccia: true,
  Reset: function() {
    background(0);
    graphics.clear();
    x=0;
    incrementoColore = 60;
    x=0;
    y=0;
  },
  SalvaCanvas: function() {
    saveCanvas(c, 'HumanLandscape.jpg');
  }
};

//-----------------------------------------------------
// FUNZIONE GUI
window.onload = function() {
  var gui = new dat.GUI();
  
  var f1 = gui.addFolder('Visual');
  f1.add(parametri, 'distaccoModuli', 0, 2);
  f1.add(parametri, 'Traccia');
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
  
  // avvio detection PoseNet
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

//-----------------------------------------------------
// FUNZIONE PER SALVARE LE POSE DEL CORPO RILEVATE
function gotPoses(poses){
  //console.log(poses);
  if (poses.length > 0){ // se è stata rilevata almeno una posa
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

//-----------------------------------------------------
// CALLBACK FUNCTION PER DEBUG DI POSENET
function modelLoaded(){
  console.log('poseNet ready');
}

//-----------------------------------------------------
// DRAW
function draw() {
  if(pose && frameCount%2 == 0){
    
      //Calcolo punto medio tra le coordinate y delle mani - polsi
      let b = (pose.leftWrist.y + pose.rightWrist.y) / 2;
      // mappatura per gestire il noise spostando verso l'alto o verso il basso entrambe le mani
      variazioneNoise = map(b, 0, heightVideo, 0, 0.1);
      mappaturaHeightVideo = map (heightVideo, 0, heightVideo, 0, 0.1)
      let variazione = mappaturaHeightVideo - variazioneNoise;
    
      // Calcolo la distanza tra le mani - polsi
      let distMani = dist(pose.leftWrist.x, pose.leftWrist.y, pose.rightWrist.x, pose.rightWrist.y);
      // mappatura per gestire lo spessore della traccia con la distanza tra le mani
      tracciaWeight = map (distMani, 0, widthVideo, -3, 10)

      // siccome il livello graphics deve essere sempre disegnato
      // dalla coordinata iniziale 0,0 del canvas è necessario fare
      // push e pop prima che questo livello venga disegnato
      push();
          // trasla l'origine degli assi prima su tutto l'asse x incrementando
          // di volta in volta anche l'asse y creando in tempo reale una griglia
          // di moduli entro i quali vengono disegnate cose.
          translate(x,y);
    
          graphics.strokeWeight(tracciaWeight);
          fill(incrementoColore, 50);

          beginShape();
          // definizione primo vertice della Shape
          noStroke();
          vertex(0,height);

          // generazione vertici della Shape
          // disegno punti che formano la curva bianca
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
        incrementoColore += 8;
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
        }
      }

      // modifica il valore dell'altezza (y) dell'inizio 
      // della Traccia di ogni singolo modulo
      y1+=parametri.distaccoModuli;
  }
}

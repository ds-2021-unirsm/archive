//  ______  ____  ___  
//  __/ _ \/ __ \/ _ )
//  _/ , _/ /_/ / _  / 
//  /_/|_|\____/____/ 
//
// —
// Spatial_Being_3D 0.1 by Roberto [spatial, being, 3d, lessinterface, handpose, voicecontrols]
// 2021 © Roberto @ciunart, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm
// github.com/ds-2021-unirsm — github.com/fupete — github.com/RobertoAlesi
// Educational purposes, MIT License, 2021, San Marino
// —
//
// Credits/Thanks to:
// Shared Canvas, Daniel Shiffman for
// https://github.com/CodingTrain/website/tree/main/Node/sockets
// https://www.youtube.com/watch?v=i6eP1Lw4gZk
// original license: MIT License
//
// Agar.io, Daniel Shiffman for
// https://thecodingtrain.com/CodingChallenges/032.2-agario-sockets.html
// https://github.com/CodingTrain/website/tree/main/CodingChallenges/CC_032.2_agar.io_sockets
// https://youtu.be/ZjVyKXp9hec
// original license: MIT License
//
// Credits/Thanks to:
// p5.speech.js Speech Recognition, Speech synthesis, R.Luke DuBois
// The ABILITY lab, New York University for
// https://github.com/IDMNYU/p5.js-speech/blob/master/LICENSE
// original license: MIT License 2017
//
// p5 speech example, piecesofuk for
// https://editor.p5js.org/piecesofuk/sketches/SyBpNOJTb
//
// bomanimc (https://github.com/bomanimc) for https://learn.ml5js.org/#/reference/handpose
// https://github.com/ml5js/ml5-library/tree/main/examples/p5js/Handpose
// original license: MIT License
// —
//
// Hand gesture:
// [muovi la mano] -> disegna nello spazio
// [pinch] -> controlla la dimensione
//
// Voice commands:
// [rosso, verde, blu, giallo, arancione, azzurro, marrone, bianco, nero, viola] -> cambia colore
// [disegna] -> inizia a disegnare muovendo la mano
// [stop] -> ferma il disegno 
// [salva] -> salva lo sketch sul dispositivo
// —

let bg;
let w;
let h;
let widthVideo = 640;
let heightVideo = 480;
let handpose;
let video;
let predictions = [];
let d0;

let ythumb; 
let xthumb; 
let xindex;
let yindex;
let xpinky;
let ypinky;
let xpalm;
let ypalm;

let speechRec;
let socket;
let font;
let bonne;
let r = 0;
let parole = []
let x = []
let y = []
let z = []
let col = []
let colore = [255,255,0];
let d = []

let disegna = false;

//carico il font
function preload() {bonne = loadFont('Bonne.ttf');}

function setup() {
  createCanvas(w = windowWidth, h =windowHeight, WEBGL);
  bg = createGraphics(w, h, WEBGL);

//impostazioni video / ml5
  video = createCapture(VIDEO);
  video.size(widthVideo, heightVideo);
 
//impostazioni handpose
  handpose = ml5.handpose(video, modelReady);
  handpose.on("predict", results => {predictions = results;});

  video.hide();
  
// Connessione al server su Glitch.me    
  socket = io.connect("https://disegni-diversi.glitch.me/");
  socket.on('connect', function() {console.log("Connected"); });
  socket.on('userid', function (id) { console.log(id); });
  

    
//comandi vocali per cambiare colore, disegnare e salvare l'immagine
  var foo = new p5.Speech();
  speechRec = new p5.SpeechRec(gotSpeech);
  let continuous = true;
  let interimResults = true;
  speechRec.start(continuous, interimResults);
  function gotSpeech(speech) {
    if (speech.text.includes("verde") || speech.text.includes("Verde") ) coloreVerde(speech.text);
    if (speech.text.includes("rosso") || speech.text.includes("Rosso") ) coloreRosso(speech.text);
    if (speech.text.includes("blu") || speech.text.includes("Blu") || speech.text.includes("blue") || speech.text.includes("Blue")  ) coloreBlu(speech.text);
    if (speech.text.includes("viola" ) ||speech.text.includes("Viola")  ) coloreViola(speech.text);
    if (speech.text.includes("arancione") || speech.text.includes("Arancione")  || speech.text.includes("arancio") || speech.text.includes("Arancio")) coloreArancione(speech.text);
    if (speech.text.includes("giallo") || speech.text.includes("Giallo") ) coloreGiallo(speech.text);
    if (speech.text.includes("bianco") || speech.text.includes("Bianco")) coloreBianco(speech.text);
    if (speech.text.includes("nero") || speech.text.includes("Nero")) coloreNero(speech.text);
    if (speech.text.includes("marrone") || speech.text.includes("Marrone")) coloreMarrone(speech.text);
    if (speech.text.includes("rosa") || speech.text.includes("Rosa")) coloreRosa(speech.text);
    if (speech.text.includes("azzurro") || speech.text.includes("Azzurro")) coloreAzzurro(speech.text);
    
    if (speech.text.includes("disegna") || speech.text.includes("disegno") || speech.text.includes("disegni")) disegna=true
      if (speech.text.includes("stop") || speech.text.includes("Stop") ) disegna=false;
    
    if (speech.text.includes("salva") || speech.text.includes("Salva immagine")) saveImage();

  console.log(speech.text);
  }
}

//il modello della mano è pronto
function modelReady() {
  console.log("Model ready!");
}


function draw() {
  translate(-w/2,-h/2)

  lights();
  bg.background(0,255,217);
  
//disegno lo scheletro e i keypoints della mano
  drawKeypoints();
  drawSkeleton();

//quando viene detto "disegna" viene avviata la scena
 if (predictions.length > 0 && disegna==true){
   drawScene();
   }
//altrimenti viene visualizzata solo la sfera sulla mano
 else if(predictions.length > 0 && disegna==false){
    drawInit();
   }

//background, mano e sfera base
   image(bg, 0, 0, w, h)
  
//video in basso a destra
   image(video, w-200, windowHeight-150, 200, 150);
  
// Viene ricevuto dal server
  socket.on('generic_message', function (data) {

//viene creata una sfera con i dati ricevuti
   push()
    noStroke();
    fill(data.col);
    translate(data.x, data.y, data.z);
    sphere(d0/3);
   pop()
    
  });  
 }

//quando viene pronunciato un colore viene avviata la relativa funzione
   function coloreBlu() {colore = [0, 127, 255];}
   function coloreViola() {colore = [143, 0, 255];}
   function coloreRosso() {colore = [220, 20, 60];}
   function coloreGiallo() {colore = [255, 191, 0];}
   function coloreArancione() {colore = [255, 102, 0];}
   function coloreVerde() {colore = [0, 255, 127];}
   function coloreBianco() {colore = [255, 255, 255];}
   function coloreNero() {colore = [55, 55, 55];}
   function coloreMarrone() {colore = [184, 115, 51];}
   function coloreAzzurro() {colore = [8, 232, 222];}
   function coloreRosa() {colore = [255, 192, 203];}

//Disegna i punti della mano
//i punti sono stati mappati su tutto lo schermo
function drawKeypoints() {
   bg.push();
   bg.translate(-w/2,-h/2);
   if (predictions.length > 0){
     for (let i = 0; i < predictions.length; i += 1) {
       const prediction = predictions[i];
     for (let j = 0; j < prediction.landmarks.length; j += 1) {
       const keypoint = prediction.landmarks[j];
         bg.fill(100, 0, 255);
         bg.noStroke();
      let xmap = map(keypoint[0], 0, widthVideo, 0, windowWidth);
      let ymap = map(keypoint[1], 0, heightVideo, 0, windowHeight);
         bg.push()
         bg.translate(xmap, ymap)
         bg.sphere(5);
         bg.pop();
      }
     }
    }
  bg.pop();
 }

//Disegna lo scheletro della mano con delle linee che uniscono ogni punto
//i punti sono stati mappati su tutto lo schermo
function drawSkeleton() {
  bg.push();
  bg.translate(-w/2,-h/2);
 
  if (predictions.length > 0){
    let annotations = predictions[0].annotations;
    bg.stroke(159, 0, 255);
    bg.strokeWeight(5)
    
//POLLICE
    for (let j = 0; j < annotations.thumb.length - 1; j++) {  
////mappatura pollice
      let xth = map(annotations.thumb[j][0], 0, widthVideo, 0, windowWidth);
      let yth = map(annotations.thumb[j][1], 0, heightVideo, 0, windowHeight);
      let xth2 = map(annotations.thumb[j + 1][0], 0, widthVideo, 0, windowWidth);
      let yth2 = map(annotations.thumb[j + 1][1], 0, heightVideo, 0, windowHeight);
      bg.line(xth, yth,xth2, yth2);
}
    
//INDICE
    for (let j = 0; j < annotations.indexFinger.length - 1; j++) {
////mappatura indice
      let xin = map(annotations.indexFinger[j][0], 0, widthVideo, 0, windowWidth);
      let yin = map(annotations.indexFinger[j][1], 0, heightVideo, 0, windowHeight);
      let xin2 = map(annotations.indexFinger[j + 1][0], 0, widthVideo, 0, windowWidth);
      let yin2 = map(annotations.indexFinger[j + 1][1], 0, heightVideo, 0, windowHeight);
      bg.line(xin, yin, xin2, yin2);
    }
    
//MEDIO
    for (let j = 0; j < annotations.middleFinger.length - 1; j++) {        
////mappatura
      let xmid = map(annotations.middleFinger[j][0], 0, widthVideo, 0, windowWidth);
      let ymid = map(annotations.middleFinger[j][1], 0, heightVideo, 0, windowHeight);
      let xmid2 = map(annotations.middleFinger[j + 1][0], 0, widthVideo, 0, windowWidth);
      let ymid2 = map(annotations.middleFinger[j + 1][1], 0, heightVideo, 0, windowHeight);
      bg.line(xmid, ymid, xmid2, ymid2);
    }
    
//ANULARE
    for (let j = 0; j < annotations.ringFinger.length - 1; j++) {
 ////mappatura anulare
      let xrin = map(annotations.ringFinger[j][0], 0, widthVideo, 0, windowWidth);
      let yrin = map(annotations.ringFinger[j][1], 0, heightVideo, 0, windowHeight);
      let xrin2 = map(annotations.ringFinger[j + 1][0], 0, widthVideo, 0, windowWidth);
      let yrin2 = map(annotations.ringFinger[j + 1][1], 0, heightVideo, 0, windowHeight);
      bg.line(xrin, yrin, xrin2, yrin2);
    }
    
//MIGNOLO
    for (let j = 0; j < annotations.pinky.length - 1; j++) {
     let xpin = map(annotations.pinky[j][0], 0, widthVideo, 0, windowWidth);
      let ypin = map(annotations.pinky[j][1], 0, heightVideo, 0, windowHeight);
      let xpin2 = map(annotations.pinky[j + 1][0], 0, widthVideo, 0, windowWidth);
      let ypin2 = map(annotations.pinky[j + 1][1], 0, heightVideo, 0, windowHeight);
      bg.line(xpin, ypin, xpin2, ypin2);
    }

//PALMO
      let xrinf = map(annotations.ringFinger[0][0], 0, widthVideo, 0, windowWidth);
      let yrinf = map(annotations.ringFinger[0][1], 0, heightVideo, 0, windowHeight);
      let xpinfi = map(annotations.pinky[0][0], 0, widthVideo, 0, windowWidth);
      let ypinfi = map(annotations.pinky[0][1], 0, heightVideo, 0, windowHeight);
      let xmidf = map(annotations.middleFinger[0][0], 0, widthVideo, 0, windowWidth);
      let ymidf = map(annotations.middleFinger[0][1], 0, heightVideo, 0, windowHeight);
      let xindf = map(annotations.indexFinger[0][0], 0, widthVideo, 0, windowWidth);
      let yindf = map(annotations.indexFinger[0][1], 0, heightVideo, 0, windowHeight);
      let xthf = map(annotations.thumb[0][0], 0, widthVideo, 0, windowWidth);
      let ythf = map(annotations.thumb[0][1], 0, heightVideo, 0, windowHeight);
      xpalm = map(annotations.palmBase[0][0], 0, widthVideo, 0, windowWidth);
      ypalm = map(annotations.palmBase[0][1], 0, heightVideo, 0, windowHeight);
       xindex = map(predictions[0].annotations.indexFinger[3][0], 0, widthVideo, 0, windowWidth);
   yindex = map(predictions[0].annotations.indexFinger[3][1], 0, heightVideo, 0, windowHeight);

    bg.line(xrinf, yrinf, xpinfi, ypinfi);
    bg.line(xrinf, yrinf, xmidf, ymidf);
    bg.line(xindf, yindf, xmidf, ymidf);
    bg.line(xindf, yindf, xthf, ythf);
    bg.line(xpalm, ypalm, xthf, ythf);
    bg.line(xpalm, ypalm, xpinfi, ypinfi);
        
    bg.stroke(10, 189, 189);
    bg.strokeWeight(1);
    bg.line(xpalm, ypalm, xindf, yindf);
    bg.line(xpalm, ypalm, xmidf, ymidf);
    bg.line(xpalm, ypalm, xrinf, yrinf);  
   }
bg.pop();
}

//disegna la sfera base iniziale
function drawInit() {
  bg.push();
  bg.translate(-w/2,-h/2);
  if (predictions.length > 0){
  bg.noStroke()
   xthumb = map(predictions[0].annotations.thumb[3][0], 0, widthVideo, 0, windowWidth);
   ythumb = map(predictions[0].annotations.thumb[3][1], 0, heightVideo, 0, windowHeight);
   xpinky = map(predictions[0].annotations.pinky[3][0], 0, widthVideo, 0, windowWidth);
   ypinky = map(predictions[0].annotations.pinky[3][1], 0, heightVideo, 0, windowHeight);
    
   d0 = dist(predictions[0].annotations.indexFinger[3][0],      predictions[0].annotations.indexFinger[3][1], predictions[0].annotations.thumb[3][0], predictions[0].annotations.thumb[3][1]);
    
 bg.fill(colore);
 bg.push()
   bg.translate(xthumb,ythumb-d0/2, 0)
   bg.sphere(d0);
 bg.pop()
  }
  bg.pop();
}

//disegna una scia di sfere continue sul canvas
function drawScene() {

if (predictions.length > 0){
  noStroke()

   xthumb = map(predictions[0].annotations.thumb[3][0], 0, widthVideo, 0, windowWidth);
   ythumb = map(predictions[0].annotations.thumb[3][1], 0, heightVideo, 0, windowHeight);
   xpinky = map(predictions[0].annotations.pinky[3][0], 0, widthVideo, 0, windowWidth);
   ypinky = map(predictions[0].annotations.pinky[3][1], 0, heightVideo, 0, windowHeight);
  
//calcolo la distanza tra indice e pollice
   d0 = dist(predictions[0].annotations.indexFinger[3][0],      predictions[0].annotations.indexFinger[3][1], predictions[0].annotations.thumb[3][0], predictions[0].annotations.thumb[3][1]);
}
////////invia i dati agli altri  
socket.emit("generic_message", {x: xthumb, y: ythumb-d0/2, col: colore, d: d0});
  fill(colore);
 push()
   translate(xthumb,ythumb-d0/2, 0)
   sphere(d0);
 pop()
}

//salva un'immagine del canvas sul dispositivo
function saveImage(){
  save("myimage.png");
}

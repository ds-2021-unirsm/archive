//  ______  ____  ___  
//  __/ _ \/ __ \/ _ )
//  _/ , _/ /_/ / _  / 
//  /_/|_|\____/____/ 
//
// —
// Spatial_Being 2D 0.1 by Roberto [spatial, being, 2d, lessinterface, handpose, voicecontrols]
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



let pg;
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
let col = []
let colore = [255,255,0];
let d = []

let disegna = false;
let conta = 0;

let imgHand1;
let imgHand2;
let imgHand3;

//carico il font
function preload() {bonne = loadFont('Bonne.ttf'); 
                    imgHand3 = loadImage('Istruz3.png');
                    imgHand2 = loadImage('Istruz2.png');
                    imgHand1 = loadImage('Istruz1.png');}

function setup() {
  createCanvas(w = windowWidth, h =windowHeight);
  pg = createGraphics(w, h);
  pg.clear();
//impostazioni video / ml5
  video = createCapture(VIDEO);
  video.size(widthVideo, heightVideo);
 
//impostazioni handpose
  handpose = ml5.handpose(video, modelReady);
  handpose.on("predict", results => {predictions = results;});

  video.hide();
  
// Connessione al server su Glitch.me    
  socket = io.connect("https://spatial-being.glitch.me/");
  socket.on('connect', function() {console.log("Connected"); });
//recupera l'id del socket
  socket.on('userid', function (id) { console.log(id);});
    
//comandi vocali
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
 // translate(-w/2,-h/2)
  background(64,255,218);
  
 
//disegno lo scheletro e i keypoints della mano

  drawKeypoints();
  drawSkeleton();
  //lights();

    //se la mano è nella posizione corretta allora aumenta il conta
  if(frameCount>400 && xpalm>w/2-100 && xpalm<w/2+100 && w/2-100<xindex && xindex<w/2+100){
     conta+=0.1;
 //   console.log("sto contando " + conta)
   }  


//quando viene detto "disegna" viene avviata la scena
 if (predictions.length > 0 && disegna==true){
  drawScene();
    }
 
else if(predictions.length > 0 && disegna==false){
    drawInit();
 }
  
  

image(pg, 0, 0, w, h)
   
image(video, w-200, windowHeight-150, 200, 150);
  

// Viene ricevuto dal server
  socket.on('generic_message', function (data) {

//viene creata una sfera con i dati ricevuti
   
    stroke(0);
    fill(data.col);
    ellipse(data.x, data.y, d0);
  });
  
  
 //il rettangolo viene rimosso dopo che la mano sblocca la scena
    if(frameCount>=400 && conta<=11){
    image(imgHand3, w/2-h*3/2,0, h*3, h);
    textSize(32);
    text(floor(conta),w/2,h/2+h/10 )
    } else if(frameCount>=150 && conta<=11){
       image(imgHand2, w/2-h*3/2,0, h*3, h);

    }else if(frameCount>0 && conta<=11){
       image(imgHand1, w/2-h*3/2,0, h*3, h);

    }

 }

   function coloreBlu() {colore = [0, 127, 255];}
   function coloreViola() {colore = [143, 0, 255];}
   function coloreRosso() {colore = [255, 20, 60];}
   function coloreGiallo() {colore = [255, 255, 0];}
   function coloreArancione() {colore = [255, 102, 0];}
   function coloreVerde() {colore = [0, 255, 127];}
   function coloreBianco() {colore = [255, 255, 255];}
   function coloreNero() {colore = [55, 55, 55];}
   function coloreAzzurro() {colore = [8, 232, 222];}
   function coloreRosa() {colore = [255, 192, 203];}

//-disegna i punti della mano-//
function drawKeypoints() {
 //  pg.push();
   //pg.translate(-w/2,-h/2);
   if (predictions.length > 0){
     for (let i = 0; i < predictions.length; i += 1) {
       const prediction = predictions[i];
     for (let j = 0; j < prediction.landmarks.length; j += 1) {
       const keypoint = prediction.landmarks[j];

      let xmap = map(keypoint[0], 0, widthVideo, 0, windowWidth);
      let ymap = map(keypoint[1], 0, heightVideo, 0, windowHeight);
         noStroke();
         fill(100, 0, 255);
         ellipse(xmap, ymap, 10);
         
      }
     }
    }
 }

function drawSkeleton() {
  if (predictions.length > 0){
    let annotations = predictions[0].annotations;
    stroke(159, 0, 255);
    strokeWeight(5)
    for (let j = 0; j < annotations.thumb.length - 1; j++) {    
  ////mappatura
      let xth = map(annotations.thumb[j][0], 0, widthVideo, 0, windowWidth);
      let yth = map(annotations.thumb[j][1], 0, heightVideo, 0, windowHeight);
      let xth2 = map(annotations.thumb[j + 1][0], 0, widthVideo, 0, windowWidth);
      let yth2 = map(annotations.thumb[j + 1][1], 0, heightVideo, 0, windowHeight);
      line(xth, yth,xth2, yth2);
}
    for (let j = 0; j < annotations.indexFinger.length - 1; j++) {
  ////mappatura
      let xin = map(annotations.indexFinger[j][0], 0, widthVideo, 0, windowWidth);
      let yin = map(annotations.indexFinger[j][1], 0, heightVideo, 0, windowHeight);
      let xin2 = map(annotations.indexFinger[j + 1][0], 0, widthVideo, 0, windowWidth);
      let yin2 = map(annotations.indexFinger[j + 1][1], 0, heightVideo, 0, windowHeight);
      line(xin, yin, xin2, yin2);
    }
    for (let j = 0; j < annotations.middleFinger.length - 1; j++) {        
 
  ////mappatura
      let xmid = map(annotations.middleFinger[j][0], 0, widthVideo, 0, windowWidth);
      let ymid = map(annotations.middleFinger[j][1], 0, heightVideo, 0, windowHeight);
      let xmid2 = map(annotations.middleFinger[j + 1][0], 0, widthVideo, 0, windowWidth);
      let ymid2 = map(annotations.middleFinger[j + 1][1], 0, heightVideo, 0, windowHeight);
      line(xmid, ymid, xmid2, ymid2);
    }
    for (let j = 0; j < annotations.ringFinger.length - 1; j++) {
  
  ////mappatura
      let xrin = map(annotations.ringFinger[j][0], 0, widthVideo, 0, windowWidth);
      let yrin = map(annotations.ringFinger[j][1], 0, heightVideo, 0, windowHeight);
      let xrin2 = map(annotations.ringFinger[j + 1][0], 0, widthVideo, 0, windowWidth);
      let yrin2 = map(annotations.ringFinger[j + 1][1], 0, heightVideo, 0, windowHeight);
      line(xrin, yrin, xrin2, yrin2);
    }
    for (let j = 0; j < annotations.pinky.length - 1; j++) {
     let xpin = map(annotations.pinky[j][0], 0, widthVideo, 0, windowWidth);
      let ypin = map(annotations.pinky[j][1], 0, heightVideo, 0, windowHeight);
      let xpin2 = map(annotations.pinky[j + 1][0], 0, widthVideo, 0, windowWidth);
      let ypin2 = map(annotations.pinky[j + 1][1], 0, heightVideo, 0, windowHeight);
      line(xpin, ypin, xpin2, ypin2);
    }
    
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

    line(xrinf, yrinf, xpinfi, ypinfi);
    line(xrinf, yrinf, xmidf, ymidf);
    line(xindf, yindf, xmidf, ymidf);
    line(xindf, yindf, xthf, ythf);
    line(xpalm, ypalm, xthf, ythf);
    line(xpalm, ypalm, xpinfi, ypinfi);
        
    stroke(10, 189, 189);
    strokeWeight(1);
    line(xpalm, ypalm, xindf, yindf);
    line(xpalm, ypalm, xmidf, ymidf);
    line(xpalm, ypalm, xrinf, yrinf);  
   }
//pg.pop();
}

function drawInit() {
  //pg.push();
  //pg.translate(-w/2,-h/2);
  if (predictions.length > 0){
  noStroke()
   xindex = map(predictions[0].annotations.indexFinger[3][0], 0, widthVideo, 0, windowWidth);
   yindex = map(predictions[0].annotations.indexFinger[3][1], 0, heightVideo, 0, windowHeight);
   xthumb = map(predictions[0].annotations.thumb[3][0], 0, widthVideo, 0, windowWidth);
   ythumb = map(predictions[0].annotations.thumb[3][1], 0, heightVideo, 0, windowHeight);
   xpinky = map(predictions[0].annotations.pinky[3][0], 0, widthVideo, 0, windowWidth);
   ypinky = map(predictions[0].annotations.pinky[3][1], 0, heightVideo, 0, windowHeight);
    
//calcolo la distanza tra indice e pollice
   d0 = dist(xindex, yindex, xthumb, ythumb);
 fill(colore);
   ellipse(xthumb,ythumb-d0/2, d0);
  }
}

function drawScene() {

if (predictions.length > 0){
  
  pg.stroke(colore-50)
  xindex = map(predictions[0].annotations.indexFinger[3][0], 0, widthVideo, 0, windowWidth);
   yindex = map(predictions[0].annotations.indexFinger[3][1], 0, heightVideo, 0, windowHeight);
   xthumb = map(predictions[0].annotations.thumb[3][0], 0, widthVideo, 0, windowWidth);
   ythumb = map(predictions[0].annotations.thumb[3][1], 0, heightVideo, 0, windowHeight);
   xpinky = map(predictions[0].annotations.pinky[3][0], 0, widthVideo, 0, windowWidth);
   ypinky = map(predictions[0].annotations.pinky[3][1], 0, heightVideo, 0, windowHeight);
  
//calcolo la distanza tra indice e pollice
   d0 = dist(xindex, yindex, xthumb, ythumb);
}
////////invia i dati agli altri  
socket.emit("generic_message", {x: xthumb, y: ythumb-d0/2, col: colore, d: d0});
  
  pg.fill(colore);
  pg.ellipse(xthumb,ythumb-d0/2,d0);
}

function saveImage(){
  save("SpatialBeing.png");
}

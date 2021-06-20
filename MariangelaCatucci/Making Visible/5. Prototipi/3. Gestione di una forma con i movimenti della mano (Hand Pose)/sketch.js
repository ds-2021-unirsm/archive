// Modifica forma con interazione mano 0.1 by Mariangela Catucci [mano, forma, vertici, deformazione, handtracking]
// 2021 © Mariangela @MariangelaCatucci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// —
//
// Credits to:
// @yining_shi (twitter.com/yining_shi) for https://github.com/yining1023
// original license: MIT License 2020
//
// -
//
// Help:
// [hand moving] segue i movimenti della mano
// [pollice e indice attaccati] prendo un punto della forma
// [pollice e indice un po' distanti] muovo il punto che già ho o non prendo nessun punto
// [pollice e indice molto distanti] lascio il punto che ho preso prima o non prendo nessun punto
//
// —

let widthVideo = 640;
let heightVideo = 480;

let handpose;
let video;
let predictions = [];
let data=[];
let xindex;
let yindex;
let xthumb ;
let ythumb;
let vertici = [];
let totpunti = 32;
let qualeSposto = null
let indice = -1;

function setup() {
  createCanvas(w = windowWidth, h=windowHeight);
  video = createCapture(VIDEO);
  video.size(width, height);
  
  handpose = ml5.handpose(video, modelReady);
  handpose.on("predict", results => {predictions = results;});

  video.hide();
  
  for (let i = 0; i < totpunti; i++) {
    let v = createVector(
      100 * cos((2 * PI * i) / totpunti) + width / 2,
      100 * sin((2 * PI * i) / totpunti) + height / 2
    );
    vertici.push(v);
  }
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  background(255);

  noStroke();
  fill(0, 0, 255, 100);
  beginShape();
  let conta = 0;
  for (let p = 0; p < vertici.length; p++) {
    vertex(vertici[p].x, vertici[p].y);
  }
  endShape(CLOSE);
  if (qualeSposto != null) {
    fill(0);
    ellipse(vertici[qualeSposto].x, vertici[qualeSposto].y, 8,8);
  }
  
  drawKeypoints();
  drawSkeleton();
  qualePrendo();
  nonSposto();
  miSegue();
}
  
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    let prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      let keypoint = prediction.landmarks[j];
      fill(255, 0, 0);
      noStroke();
      let xmap = map(keypoint[0], 0, widthVideo, 0, windowWidth);
      let ymap = map(keypoint[1], 0, heightVideo, 0, windowHeight);
      push()
      translate(xmap, ymap)
      ellipse(5, 5);
      pop()
    }
  }
}

function drawSkeleton() {
  if (predictions.length > 0){
    let annotations = predictions[0].annotations;
    stroke(80);
    strokeCap(ROUND);
    strokeWeight(2)
    
    for (let j = 0; j < annotations.thumb.length - 1; j++) {    
      // mappatura del pollice
      let xth = map(annotations.thumb[j][0], 0, widthVideo, 0, windowWidth);
      let yth = map(annotations.thumb[j][1], 0, heightVideo, 0, windowHeight);
      let xth2 = map(annotations.thumb[j + 1][0], 0, widthVideo, 0, windowWidth);
      let yth2 = map(annotations.thumb[j + 1][1], 0, heightVideo, 0, windowHeight);
      line(xth, yth,xth2, yth2);
}
    for (let j = 0; j < annotations.indexFinger.length - 1; j++) {
      //mappatura dell'indice
      let xin = map(annotations.indexFinger[j][0], 0, widthVideo, 0, windowWidth);
      let yin = map(annotations.indexFinger[j][1], 0, heightVideo, 0, windowHeight);
      let xin2 = map(annotations.indexFinger[j + 1][0], 0, widthVideo, 0, windowWidth);
      let yin2 = map(annotations.indexFinger[j + 1][1], 0, heightVideo, 0, windowHeight);
      line(xin, yin, xin2, yin2);
    }
    
    for (let j = 0; j < annotations.middleFinger.length - 1; j++) {        
      // mappatura del medio
      let xmid = map(annotations.middleFinger[j][0], 0, widthVideo, 0, windowWidth);
      let ymid = map(annotations.middleFinger[j][1], 0, heightVideo, 0, windowHeight);
      let xmid2 = map(annotations.middleFinger[j + 1][0], 0, widthVideo, 0, windowWidth);
      let ymid2 = map(annotations.middleFinger[j + 1][1], 0, heightVideo, 0, windowHeight);
      line(xmid, ymid, xmid2, ymid2);
    }
    
    for (let j = 0; j < annotations.ringFinger.length - 1; j++) {
      // mappatura dell'anulare
      let xrin = map(annotations.ringFinger[j][0], 0, widthVideo, 0, windowWidth);
      let yrin = map(annotations.ringFinger[j][1], 0, heightVideo, 0, windowHeight);
      let xrin2 = map(annotations.ringFinger[j + 1][0], 0, widthVideo, 0, windowWidth);
      let yrin2 = map(annotations.ringFinger[j + 1][1], 0, heightVideo, 0, windowHeight);
      line(xrin, yrin, xrin2, yrin2);
    }
    
    for (let j = 0; j < annotations.pinky.length - 1; j++) {
      // mappatura del mignolo
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
      let xpalm = map(annotations.palmBase[0][0], 0, widthVideo, 0, windowWidth);
      let ypalm = map(annotations.palmBase[0][1], 0, heightVideo, 0, windowHeight);

      line(xrinf, yrinf, xpinfi, ypinfi);
      line(xrinf, yrinf, xmidf, ymidf);
      line(xindf, yindf, xmidf, ymidf);
      line(xindf, yindf, xthf, ythf);
      line(xpalm, ypalm, xthf, ythf);
      line(xpalm, ypalm, xpinfi, ypinfi);       
  }
}  

// indico quale punto spostare in base alla posizione della mano e alla distanza di indice e pollice 
function qualePrendo() {
  // richiamo la mappatura di indice e pollice
  if (predictions.length > 0){
    noStroke()
    xindex = map(predictions[0].annotations.indexFinger[3][0], 0, widthVideo, 0, windowWidth);
    yindex = map(predictions[0].annotations.indexFinger[3][1], 0, heightVideo, 0, windowHeight);
    xthumb = map(predictions[0].annotations.thumb[3][0], 0, widthVideo, 0, windowWidth);
    ythumb = map(predictions[0].annotations.thumb[3][1], 0, heightVideo, 0, windowHeight);
    
    // verifico di non avere nessun vertice, controllo la distanza tra indice e pollice, se sono vicini prendo un punto
    for (let p = 0; p < vertici.length; p++) {
      if(qualeSposto == null){
        if(dist(xindex,yindex, xthumb ,ythumb) < 40){
          if (dist(xindex, yindex, vertici[p].x, vertici[p].y) < 20){
            qualeSposto = p;
          }
        }
      }
    }
  }
}

// verifico la distanza tra indice e pollice per lasciare il punto che ho preso
function nonSposto() {
  // richiamo la mappatura di indice e pollice
  if (predictions.length > 0){
    xindex = map(predictions[0].annotations.indexFinger[3][0], 0, widthVideo, 0, windowWidth);
    yindex = map(predictions[0].annotations.indexFinger[3][1], 0, heightVideo, 0, windowHeight);
    xthumb = map(predictions[0].annotations.thumb[3][0], 0, widthVideo, 0, windowWidth);
    ythumb = map(predictions[0].annotations.thumb[3][1], 0, heightVideo, 0, windowHeight);      
    // verifico che la distanza sia abbastanza ampia
    if (dist(xindex,yindex, xthumb ,ythumb) > 300)
      qualeSposto = null;
   }
}

// scrivo le condizioni affinche il punto preso mi segua nei movimenti
function miSegue() {
  // richiamo la mappatura di indice e pollice
  if (predictions.length > 0){  
    xindex = map(predictions[0].annotations.indexFinger[3][0], 0, widthVideo, 0, windowWidth);
     yindex = map(predictions[0].annotations.indexFinger[3][1], 0, heightVideo, 0, windowHeight);
     xthumb = map(predictions[0].annotations.thumb[3][0], 0, widthVideo, 0, windowWidth);
     ythumb = map(predictions[0].annotations.thumb[3][1], 0, heightVideo, 0, windowHeight);

    // verifico di aver preso un punto e creo un vettore affinche il punto mi segua
    if (qualeSposto != null) {
      vertici[qualeSposto] = createVector(xindex, yindex, xthumb, ythumb);
    }
  }
}
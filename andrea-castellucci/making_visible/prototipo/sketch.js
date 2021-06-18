//   __   __ _  ____  ____  ____   __  
//  / _\ (  ( \(    \(  _ \(  __) / _\
// /    \/    / ) D ( )   / ) _) /    \
// \_/\_/\_)__)(____/(__\_)(____)\_/\_/
//  
// -
// Riflessi by Andrea [yourself, alternativeDescription, identity]
// 2021 © Andrea @AndrCastellucci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete — github.com/andrea-castellucci
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to:
//
// p5.speech.js Speech Recognition, Speech synthesis, R.Luke DuBois
// The ABILITY lab, New York University
// http://ability.nyu.edu/p5.js-speech/
// https://github.com/IDMNYU/p5.js-speech/blob/master/LICENSE
// original license: MIT License 2017
//
// P_2_3_3_01 - 
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
// original license: Apache License, Version 2.0 (the "License")
//
// Luigi @MrJ4ckpot & Daniele @Fupete for github.com/dsii-2019-unirsm + github.com/fupete
// for: https://editor.p5js.org/fupete/sketches/Mw0ugXFno
// original license: Educational purposes, MIT License, 2019, Crespina IT
// —
//
// Help:
// [microfono] rilevamento del parlato 
// [webcam] rilevamento movimenti del corpo per disegno nello spazio
// [---] ---
//
// —

//-----------------------------------------------------
// IMPOSTAZIONI INIZIALI

let c; // canvas
let graphics; // livello graphics

// dimensioni video per il rilevamento tramite PoseNet
let widthVideo = 640;
let heightVideo = 480;

// dimensioni video visualizzabile sul canvas
let wVideo= 200;
let hVideo = 150;

// impostazioni per PoseNet
let video;
let poseNet;
let pose;
let skeleton;

// impostazioni per SpeechRecognition
let lang = "it";
let speech;
let recordingavviato = true;

// coordinate per la scrittura del parlato
var x = 0;
var y = 0;

// impostazioni iniziali per la scrittura del parlato
let testo = "";
let testoSplit = "";
var stepSize = 0;
var FontSizeMin = 20;
var angleDistortion = 0.0;
// counter per scrivere una lettera alla volta
var counter = 0;

// bottoni
let b; // "start/stop detection"
let start = false; // stato bottone b
let r; // "clear all"
let s; // "export sketch"

// impostazioni e variabili per visual
let opacita = 1;
let colSfondo;

let mic; // variabili per microfono
var gui; // variabili per GUI


//-----------------------------------------------------
// PARAMETRI GUI
let parametri = {
  Video: true, // Mostra/Nasconde il video
  Scomparsa: false, // Modalità scomparsa
  Dimensione: "dist-Webcam", // Dimensione testo scritto
  Preset: "custom", // Preset visual
  Tracce: [177, 219, 231], // Colore Tracce del corpo
  Sfondo: [50, 50, 50] // Colore Background
};

//-----------------------------------------------------
// FUNZIONE GUI
window.onload = function() {
  gui = new dat.GUI();
  
  var f0 = gui.addFolder('Sketch');
  f0.add(parametri, 'Video');
  
  var f1 = gui.addFolder('Testo');
  f1.add(parametri, 'Dimensione', ['fissa', 'dist-Webcam', 'volumeMic', 'dist-Mani']);
  
  var f2 = gui.addFolder('Visual');
  f2.add(parametri, 'Scomparsa');
  f2.add(parametri, 'Preset', ['custom', 'state1', 'state2', 'state3']);
  f2.addColor(parametri, 'Tracce');
  f2.addColor(parametri, 'Sfondo'); 
}

//-----------------------------------------------------
// SETUP
function setup() {
  c = createCanvas(windowWidth, windowHeight);
  graphics = createGraphics(windowWidth, windowHeight);
  graphics.clear();
  
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
  startRec();
  
  background(50);
  b=createButton("start/stop detection");
  b.mousePressed(startDetection);
  b.id('startstop');
  
  r=createButton("clear all");
  r.mousePressed(resetCanvas);
  r.id('resetbutton');
  
  s=createButton("save canvas");
  s.mousePressed(exportCanvas);
  s.id('exportbutton');
}

//-----------------------------------------------------
// FUNZIONE PER AVVIARE IL DISEGNO DI CORPO E PAROLE
function startDetection(){
  startRec();
  if (start == false){
    start = true;
    $("#startstop").css("background-color","#e9e9e9");
    $("#startstop").css("color","#333");
  } else{
    start = false;
    $("#startstop").css("background-color","#555");
    $("#startstop").css("color","#e9e9e9");   
  }
  // rilevazione audio
  mic = new p5.AudioIn();
  mic.start();
}

//-----------------------------------------------------
// FUNZIONE PER RIMUOVERE I SEGNI GRAFICI
function resetCanvas(){
  graphics.clear();
}

//-----------------------------------------------------
// FUNZIONE PER ESPORTARE JPG DEL CANVAS
function exportCanvas(){
  saveCanvas(c, 'riflessi.jpg');  
}

//-----------------------------------------------------
// FUNZIONE PER AVVIARE IL RILEVAMENTO DELLA VOCE
function startRec() {
  console.log("Inizia a parlare");
  // Create a Speech Recognition object with callback
  speechRec = new p5.SpeechRec("it-IT", gotSpeech);
  // "Continuous recognition" (as opposed to one time only)
  let continuous = true;
  // If you want to try partial recognition (faster, less accurate)
  let interimResults = false;
  // This must come after setting the properties
  speechRec.start(continuous, interimResults);
}

//-----------------------------------------------------
// FUNZIONE PER SALVARE LE PAROLE PRONUNCIATE
function gotSpeech() {
    // Speech recognized event
    if (speechRec.resultValue && recordingavviato == true) {
      testo = testo + " " + speechRec.resultString;
      // Show user
      console.log(testo);
      testoSplit = testo.split(" ");
      testoSplit.splice(0, 1);
    }
}

//-----------------------------------------------------
// FUNZIONE PER SALVARE LE POSE DEL CORPO RILEVATE
function gotPoses(poses) {
  // console.log(poses);
  if (poses.length > 0) {
    // se è stata rilevata almeno una posa
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
    //console.log(pose)
  }
}

//-----------------------------------------------------
// CALLBACK FUNCTION PER DEBUG DI POSENET
function modelLoaded() {
  console.log("poseNet ready");
}

//-----------------------------------------------------
// DRAW
function draw() {
  colSfondo = parametri.Sfondo;
  if(colSfondo.length == 4) colSfondo.pop();
  
  background(colSfondo);
  
  translate(windowWidth, 0);
  scale(-1, 1);
  
  // placeholder --- video in attesa
  fill(70)
  noStroke();
  rect(windowWidth-wVideo-10, 10, wVideo, hVideo);
  
  let colTracceText = parametri.Tracce;
  
  if (parametri.Video) {

    graphics.image(video, windowWidth-wVideo-10, 10, wVideo, hVideo);

    $("#resetbutton").css("top","165px");
    $("#startstop").css("top","165px");
    $("#exportbutton").css("top","195px");
    $(".a").css("margin-top","225px");
    
  } else if (parametri.Video == false) {

    $("#resetbutton").css("top","10px");
    $("#startstop").css("top","10px");
    $("#exportbutton").css("top","40px");
    $(".a").css("margin-top","70px");
    graphics.fill(colSfondo);
    graphics.noStroke();
    graphics.rect(windowWidth-wVideo-10, 10, wVideo, hVideo);
  }
  
  // start detection: pronuncia "video"
  // stop detection: pronuncia "stop"
  if(testo == " disegna" || testo == " Disegna"){
    startDetection();
    testo = "";
  } else if (testo == " stop" || testo == " Stop"){
    startDetection();
    testo = "";
  } else if (testo == " salva" || testo == " Salva"){
    saveCanvas(c, 'riflessi.jpg');  
    testo = "";
  } else if (testo != "" && start == false){
    testo = "";
  } 
  
    // gestione preset visual - Preset
    if (parametri.Preset == "state1"){
      
        parametri.Sfondo = [50, 50, 50];
        parametri.Tracce = [177, 219, 231];
        background(colSfondo);
      
    } else if(parametri.Preset == "state2"){
      
        parametri.Sfondo = [177, 219, 231];
        parametri.Tracce = [100, 100, 100];
        background(colSfondo);
      
    } else if(parametri.Preset == "state3"){
      
        parametri.Sfondo = [20, 20, 20];
        parametri.Tracce = [220, 134, 51];
        background(colSfondo);
      
    } else if(parametri.Preset == "custom"){
      
        parametri.Sfondo = parametri.Sfondo;
        parametri.Tracce = parametri.Tracce;
    }

  if (pose && start) { 
    
    if(colTracceText.length < 4) colTracceText.push(10);
    
    // disegna i keypoints
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      graphics.noStroke();
      graphics.fill(colTracceText);
      
      let xmap = map(x, 0, widthVideo, 0, windowWidth);
      let ymap = map(y, 0, heightVideo, 0, windowHeight);
      graphics.ellipse(xmap, ymap, 5, 5);
    }

    // disegna lo scheletro
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      graphics.strokeWeight(1);
      graphics.stroke(colTracceText);
      
      let axmap = map(a.position.x, 0, widthVideo, 0, windowWidth);
      let aymap = map(a.position.y, 0, heightVideo, 0, windowHeight);
      let bxmap = map(b.position.x, 0, widthVideo, 0, windowWidth);
      let bymap = map(b.position.y, 0, heightVideo, 0, windowHeight);
      graphics.line(axmap, aymap, bxmap, bymap);
    }
    
    // posizione naso
    posXnose = map(pose.nose.x, 0, widthVideo, 0, windowWidth);
    posYnose = map(pose.nose.y, 0, widthVideo, 0, windowWidth);
    
    // posizione occhi
    var poseRightEyeX = map(pose.rightEye.x, 0, widthVideo, 0, windowWidth);
    var poseRightEyeY = map(pose.rightEye.y, 0, widthVideo, 0, windowWidth);
    var poseLeftEyeX = map(pose.leftEye.x, 0, widthVideo, 0, windowWidth);
    var poseLeftEyeY = map(pose.leftEye.y, 0, widthVideo, 0, windowWidth);
    // distanza tra gli occhi
    let dEye = dist(poseRightEyeX, poseRightEyeY, poseLeftEyeX, poseLeftEyeY);
    
    // gestione del testo -----------------------------------------
    var d = dist(x, y, posXnose, posYnose);
    
    if (parametri.Dimensione == "fissa"){
        graphics.textSize(FontSizeMin);
    } else if(parametri.Dimensione == "dist-Webcam"){
        graphics.textSize(dEye/3);
    } else if(parametri.Dimensione == "volumeMic"){
        micLevel = mic.getLevel();
        let micFont = int(15 + micLevel*200);
        graphics.textSize(micFont);
    } else if(parametri.Dimensione == "dist-Mani"){
        let dFont = dist( pose.leftWrist.x, pose.leftWrist.y, pose.rightWrist.x, pose.rightWrist.y);
        graphics.textSize(dFont/5);
    }
    
    var newLetter = testo.charAt(counter);
    stepSize = graphics.textWidth(newLetter);
    // fine gestione del testo -------------------------------------
    
    
    // se il contenuto di testo è vuoto le coordinate x,y
    // si aggiornano relativamente alla posizione del "nose"
    if(testo == "" && frameCount%10 == 0){
      
      x = map(pose.nose.x, 0, widthVideo, 0, windowWidth);
      y = map(pose.nose.y, 0, widthVideo, 0, windowWidth);
      
      // fa scomparire ciò che è sul canvas se l'utente non parla
      if (parametri.Scomparsa) {
        if(colSfondo.length < 4) colSfondo.push(opacita);
        graphics.background(colSfondo);
        opacita += 0.2;
      }
    // se l'utente riprende a parlare si blocca la scomparsa di ciò che è sul canvas
    } else if (testo != ""){
      opacita = 0;
    }
    
    if (d > stepSize*2 && testo != "") {
      
      var angle = atan2(posYnose - y, posXnose - x);
      
      graphics.push();
      graphics.noStroke();
      graphics.translate(x, y);
      graphics.rotate(angle + random(angleDistortion));
      graphics.scale(1, -1);
      if(colTracceText.length == 4) colTracceText.pop();
      graphics.fill(colTracceText);
      graphics.text(newLetter, 0, 0);
      graphics.pop();
      
      counter++;
      if (counter >= testo.length){
        testo = "";
        counter = 0;
      } 

      x = x + cos(angle) * stepSize;
      y = y + sin(angle) * stepSize;
    }
  }
  
  image(graphics, 0, 0);
}

//-----------------------------------------------------
// UTILITIES AGGIUNTIVE
function keyPressed() {
  if (key == "c") {
    if (gui.closed){
      gui.closed = false;
    } else {
      gui.closed = true;
    }
  } else if(key == "s"){
      saveCanvas(c, 'riflessi.jpg');    
  }
}

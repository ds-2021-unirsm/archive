//   __   __ _  ____  ____  ____   __  
//  / _\ (  ( \(    \(  _ \(  __) / _\
// /    \/    / ) D ( )   / ) _) /    \
// \_/\_/\_)__)(____/(__\_)(____)\_/\_/
//  
// -
// TextHead-SR-ControlFontSize by Andrea [yourself, words, motion]
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
// —
//
// Help:
// [microfono] rilevamento del parlato per scrittura
// [webcam] rilevamento movimenti del corpo
//
// —

let video;
let poseNet;
let pose;
let skeleton;

// Settings
let w, h;
let lang = "it";

// Speech Object
let speech;
let recordingavviato = true;

// Speech testo
let testo = "";
let testoSplit = "";
let fraseRicostruita = "";

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
  background(50);
  startRec();
}

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

  // Speech recognized event
  function gotSpeech() {
    // Something is there
    // Get it as a string
    // console.log(speechRec);
    if (speechRec.resultValue && recordingavviato == true) {
      testo = testo + " " + speechRec.resultString;
      // Show user
      console.log(testo);
      testoSplit = testo.split(" ");
      testoSplit.splice(0, 1);
    }
  }
}

function gotPoses(poses) {
  // console.log(poses);
  if (poses.length > 0) {
    // se è stata rilevata almeno una posa
    pose = poses[0].pose;
    // console.log(pose)
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log("poseNet ready");
}

function draw() {
  background(50, 50);
  image(video, 0, 0);
  
  if (pose) {
    fill(177, 219, 231);
    textAlign(CENTER);
    
    leftWristX = pose.leftWrist.x;
    leftWristY = pose.leftWrist.y;
    rightWristX = pose.rightWrist.x;
    rightWristY = pose.rightWrist.y;
    let a = (pose.leftWrist.x + pose.rightWrist.x) / 2;
    let b = (pose.leftWrist.y + pose.rightWrist.y) / 2;

    let d = dist(leftWristX, leftWristY, rightWristX, rightWristY);
    textSize(d/5);
    
    let widthText = 400;
    let heightText = 800
    push();
    translate(-widthText/2, 0);
    text(testo, pose.nose.x, pose.nose.y, widthText, heightText);
    pop();
  }
}

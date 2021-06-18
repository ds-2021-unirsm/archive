//   __   __ _  ____  ____  ____   __  
//  / _\ (  ( \(    \(  _ \(  __) / _\
// /    \/    / ) D ( )   / ) _) /    \
// \_/\_/\_)__)(____/(__\_)(____)\_/\_/
//  
// -
// TextHead-SpeechRecognition by Andrea [yourself, words, motion]
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
      // console.log(testo);
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
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log("poseNet ready");
}

function draw() {
  background(177, 219, 231);
  
  if (pose) {
    // disegna keypoints
    for (let i = 0; i < skeleton.length; i++) {
        let a = skeleton[i][0];
        let b = skeleton[i][1];
        strokeWeight(3);
        stroke(50, 60);
        line(a.position.x, a.position.y, b.position.x, b.position.y);
    }
    // disegna scheletro
    for (let i = 0; i < pose.keypoints.length; i++) {
        let x = pose.keypoints[i].position.x;
        let y = pose.keypoints[i].position.y;
        fill(50, 80);
        noStroke();
        ellipse(x, y, 3, 3);
    } 
    
    fill(20);
    noStroke();
    textAlign(CENTER);
    
    let leftEarX = pose.leftEar.x;
    let leftEarY = pose.leftEar.y;
    let rightEarX = pose.rightEar.x;
    let rightEarY = pose.rightEar.y;
    
    let d = dist(leftEarX, leftEarY, rightEarX, rightEarY);
    let dEye = dist(pose.leftEye.x, pose.leftEye.y, pose.rightEye.x, pose.rightEye.y);
    
    fill(100);
    textSize(dEye/4);
    textStyle(NORMAL);
    text(testo, pose.rightEar.x, pose.rightEar.y-d/4, d, height);
  }
}

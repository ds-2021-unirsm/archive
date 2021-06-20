//   __   __ _  ____  ____  ____   __
//  / _\ (  ( \(    \(  _ \(  __) / _\
// /    \/    / ) D ( )   / ) _) /    \
// \_/\_/\_)__)(____/(__\_)(____)\_/\_/
//
// -
// TextHead-Input by Andrea [text, yourself]
// 2021 © Andrea @AndrCastellucci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete — github.com/andrea-castellucci
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to: 
// ml5 Example - PoseNet example using p5.js for https://editor.p5js.org/ml5/sketches/PoseNet_webcam
// original license: MIT License, 2019, https://opensource.org/licenses/MIT
// —
//
// Help:
// [inputbox] type something
// [webcam] head movements
//
// —

let video;
let poseNet;
let pose;
let skeleton;

let inputext;
let indicazione;
let salva;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
  background(50);
  
  indicazione = createElement('p', '> type something...');
  indicazione.id('indicazione');
  
  inputext = createInput('');
  inputext.id('inputext');
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
  background(50, 50);
  
  if (pose) {
    fill(177, 219, 231);

    textFont('Helvetica');
    noStroke()
    
    textAlign(CENTER);
    textSize(32);
    text(inputext.value(), pose.nose.x, pose.nose.y, 300, height);
  }
}

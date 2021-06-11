//   __   __ _  ____  ____  ____   __
//  / _\ (  ( \(    \(  _ \(  __) / _\
// /    \/    / ) D ( )   / ) _) /    \
// \_/\_/\_)__)(____/(__\_)(____)\_/\_/
//
// -
// EllipseControl by Andrea [interaction, ellipse, gesture]
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
// [webcam] distance between the hands
//
// —

let video;
let poseNet;
let pose;
let skeleton;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses){
  if (poses.length > 0){
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded(){
  console.log('poseNet ready');
}

function draw() {
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0);
  if(pose){
    
    fill(177, 219, 231, 190);
    strokeWeight(3);
    stroke(90);
    
    //Calcolo punto medio
    let a = (pose.leftWrist.x + pose.rightWrist.x) / 2;
    let b = (pose.leftWrist.y + pose.rightWrist.y) / 2;
    
    // Calcolo del diametro
    let d = dist(pose.leftWrist.x, pose.leftWrist.y, pose.rightWrist.x, pose.rightWrist.y);
    
    ellipse(a, b, d);
  }
}

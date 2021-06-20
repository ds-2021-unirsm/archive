//   __   __ _  ____  ____  ____   __
//  / _\ (  ( \(    \(  _ \(  __) / _\
// /    \/    / ) D ( )   / ) _) /    \
// \_/\_/\_)__)(____/(__\_)(____)\_/\_/
//
// -
// SphereControl by Andrea [interaction, sphere, gesture]
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
let poses = [];

function setup() {
  createCanvas(640, 480, WEBGL);
  video = createCapture(VIDEO);
  video.size(width, height);

  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", function (results) {
    poses = results;
  });
  video.hide();
}

function modelReady() {
  console.log("Model Ready!");
}

function draw() {
  background(0);
  // centra il video che altrimenti partirebbe da metà essendoci WEBGL
  translate(-width / 2, -height / 2);
  // specchia il video in modo che non mi vedo al contrario
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  lights();
  drawSphere();
}

function drawSphere() {
  if (poses.length > 0) {
    pose = poses[0].pose;
    leftWristX = pose.leftWrist.x;
    leftWristY = pose.leftWrist.y;
    rightWristX = pose.rightWrist.x;
    rightWristY = pose.rightWrist.y;
    
    let a = (pose.leftWrist.x + pose.rightWrist.x) / 2;
    let b = (pose.leftWrist.y + pose.rightWrist.y) / 2;
    
    let d = dist(leftWristX, leftWristY, rightWristX, rightWristY);

    stroke(100);
    push();
    //rotate(deltaY);
    translate(a, b, 0);
    strokeWeight(1);
    fill(177, 219, 231)
    sphere(d/2.2);
    pop();
  }
}

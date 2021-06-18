//   __   __ _  ____  ____  ____   __
//  / _\ (  ( \(    \(  _ \(  __) / _\
// /    \/    / ) D ( )   / ) _) /    \
// \_/\_/\_)__)(____/(__\_)(____)\_/\_/
//
// -
// DrawSphere by Andrea [3Ddraw, nose]
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
// [webcam] head movements on x,y,z axes
//
// —

let video;
let poseNet;
let poses = [];

function setup() {
  createCanvas(640, 480, WEBGL);
  video = createCapture(VIDEO);
  video.size(width, height);
  background(100);

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
  translate(-width / 2, -height / 2);
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  
  lights();
  drawNose();
}

function drawNose() {
  if (poses.length > 0 && poses[0].pose.nose.x) {
    pose = poses[0].pose;
    noseX = pose.nose.x;
    noseY = pose.nose.y;
    
    let d = dist(pose.rightEye.x, pose.rightEye.y, pose.leftEye.x, pose.leftEye.y);

    fill (177, 219, 231)
    noStroke()
    push();
    translate(noseX, noseY, d*3);
    strokeWeight(1)
    sphere(d/3);
    pop();
  }
}

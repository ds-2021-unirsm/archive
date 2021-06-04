//   __   __ _  ____  ____  ____   __
//  / _\ (  ( \(    \(  _ \(  __) / _\
// /    \/    / ) D ( )   / ) _) /    \
// \_/\_/\_)__)(____/(__\_)(____)\_/\_/
//
// -
// DetectionOn3dBox by Andrea [detection, 3D, space]
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
let world;

function setup() {
  createCanvas(640, 480, WEBGL);
  normalMaterial();
  video = createCapture(VIDEO);
  video.size(width, height);
  background(0)
  
  world = width;

  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", function (results) {
    poses = results;
  });
  video.hide();
}

function modelReady() {
  poseNet.multiPose(video)
}

function draw() {
  background(100);
  orbitControl();
  
  translate(0, 0, -world);
  rotateY(-PI/6);
  push();
  translate(-world / 2, -world / 2, -world/2);
  
  image(video, 0, 0, width, height);
  drawSphere(); 
  pop();

  noFill();
  strokeWeight(4)
  stroke(177, 219, 231);
  box(world);
}

function drawSphere() {

  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;
    
    pose = poses[i].pose;
    noseX = pose.nose.x;
    noseY = pose.nose.y;
    
    let d = dist(pose.rightEye.x, pose.rightEye.y, pose.leftEye.x, pose.leftEye.y);

    push();
    translate(noseX+d/2, noseY+d/2, d*3);
    strokeWeight(1);
    sphere(d);
    pop();
  }
}

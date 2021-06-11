//   __   __ _  ____  ____  ____   __
//  / _\ (  ( \(    \(  _ \(  __) / _\
// /    \/    / ) D ( )   / ) _) /    \
// \_/\_/\_)__)(____/(__\_)(____)\_/\_/
//
// -
// BackgroundColorMap by Andrea [color, position]
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
// [webcam] head movements
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
    
    let d = dist(pose.rightEye.x, pose.rightEye.y, pose.leftEye.x, pose.leftEye.y);
    
    noStroke()
    fill(50, 50, 50);
    ellipse(pose.nose.x, pose.nose.y-2, 10);
    
    let xmap = map(pose.nose.x, 0, width, 0, 180);
    let ymap = map(pose.nose.y, 0, height, 150, 240);

    background(xmap, ymap, 231, 200);
  }
}

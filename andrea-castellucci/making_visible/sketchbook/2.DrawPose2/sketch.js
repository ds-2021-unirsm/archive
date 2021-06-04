//   __   __ _  ____  ____  ____   __
//  / _\ (  ( \(    \(  _ \(  __) / _\
// /    \/    / ) D ( )   / ) _) /    \
// \_/\_/\_)__)(____/(__\_)(____)\_/\_/
//
// -
// DrawPose2 by Andrea [human, pose, traces]
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
// [webcam] body movements
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
  background(177, 219, 231);
}

function gotPoses(poses){
  // console.log(poses);
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
  //image(video, 0, 0);
  if(pose){

    // disegna keypoints
    for (let i = 0; i < pose.keypoints.length; i++){
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      noStroke();
      fill(100, 50);
      ellipse(x, y, 7, 7);
      fill(100, 3);
      ellipse(x, y, 20, 20);
    }
    
    // disegna scheletro
    for (let i = 0; i < skeleton.length; i++){
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(1);
      stroke(100, 5);
      line(a.position.x, a.position.y, b.position.x, b.position.y);
    }
  }
}

//2

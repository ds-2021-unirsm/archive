//   __   __ _  ____  ____  ____   __
//  / _\ (  ( \(    \(  _ \(  __) / _\
// /    \/    / ) D ( )   / ) _) /    \
// \_/\_/\_)__)(____/(__\_)(____)\_/\_/
//
// -
// DrawOutline by Andrea [human, outline, frames]
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
  poseNet.on("pose", gotPoses);
  background(50);
}

function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log("poseNet ready");
}

function draw() {
  translate(video.width, 0);
  scale(-1, 1);
  //image(video, 0, 0);
  
  if (pose) {
    strokeWeight(1);
    stroke(177, 219, 231, 10);

    // disegna outline corpo
    for (let i = 1; i < pose.keypoints.length; i++) {
      
      let a = pose.keypoints[i];
      let b = pose.keypoints[i + 1];
      let c = pose.keypoints[i + 2];

      if(i == 1 || i == 15){
        line(a.position.x, a.position.y, b.position.x, b.position.y);
      }
      
      if (i+2 < pose.keypoints.length) {
        line(a.position.x, a.position.y, c.position.x, c.position.y);
      }
    }
    
    // disegna keypoints
    for (let i = 0; i < pose.keypoints.length; i++){
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(177, 219, 231, 10);
      ellipse(x, y, 5, 5);
    }
  }
}

//   __   __ _  ____  ____  ____   __
//  / _\ (  ( \(    \(  _ \(  __) / _\
// /    \/    / ) D ( )   / ) _) /    \
// \_/\_/\_)__)(____/(__\_)(____)\_/\_/
//
// -
// ShapeControl-TrainedModel by Andrea [shapes, gesture]
// 2021 © Andrea @AndrCastellucci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete — github.com/andrea-castellucci
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to: 
// ml5 Example - PoseNet example using p5.js for https://editor.p5js.org/ml5/sketches/PoseNet_webcam
// original license: MIT License, 2019, https://opensource.org/licenses/MIT
//
// @shiffman (https://twitter.com/shiffman) for https://www.youtube.com/watch?v=FYgYyq-xqAw&ab_channel=TheCodingTrain
// —
//
// Help:
// [webcam] body movements
// dettaglio: inquadrati a mezzo busto e porta le mani in alto per cambiare la forma davanti a te
//
// —

let video;
let poseNet;
let pose;
let skeleton;

let brain;
let poseLabel;

function setup() {
  createCanvas(640, 480, WEBGL);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);

  let options = {
    inputs: 34,
    outputs: 4,
    task: "classification",
    debug: true,
  };
  brain = ml5.neuralNetwork(options);
  const modelInfo = {
    model: "model/model.json",
    metadata: "model/model_meta.json",
    weights: "model/model.weights.bin",
  };
  brain.load(modelInfo, brainLoaded);
}

function brainLoaded() {
  console.log("pose classification ready!");
  classifyPose();
}

function classifyPose() {
  if (pose) {
    let inputs = [];
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      inputs.push(x);
      inputs.push(y);
    }
    brain.classify(inputs, gotResult);
  } else {
    setTimeout(classifyPose, 100);
  }
}

function gotResult(error, results) {
  poseLabel = results[0].label;
  //console.log(results[0].confidence);
  classifyPose();
}

function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log("poseNet ready");
}

function draw() {
  translate(-width / 2, -height / 2);
  
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0);
  drawSphere();
}

function drawSphere() {
  if (pose) {

    leftWristX = pose.leftWrist.x;
    leftWristY = pose.leftWrist.y;
    rightWristX = pose.rightWrist.x;
    rightWristY = pose.rightWrist.y;

    let a = (pose.leftWrist.x + pose.rightWrist.x) / 2;
    let b = (pose.leftWrist.y + pose.rightWrist.y) / 2;

    let d = dist(leftWristX, leftWristY, rightWristX, rightWristY);
    
    fill(177, 219, 231);

    if (poseLabel == "b") {
      stroke(100);
      push();
      translate(a, b, 0);
      strokeWeight(1);
      sphere(d / 3);
      pop();
      
    } else if (poseLabel == "m") {
      stroke(100);
      push();
      translate(a, b, 0);
      cylinder(d / 3);
      strokeWeight(1);
      pop();
      
    } else if (poseLabel == "a") {
      stroke(100);
      push();
      translate(a, b, 0);
      strokeWeight(1);
      box(d / 3);
      pop();
    }
  }
}

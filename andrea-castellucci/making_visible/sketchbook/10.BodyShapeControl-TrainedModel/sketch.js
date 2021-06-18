//   __   __ _  ____  ____  ____   __
//  / _\ (  ( \(    \(  _ \(  __) / _\
// /    \/    / ) D ( )   / ) _) /    \
// \_/\_/\_)__)(____/(__\_)(____)\_/\_/
//
// -
// BodyShapeControl-TrainedModel by Andrea [shape, yourself]
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
// dettaglio: inquadra tutto il corpo e porta le mani in alto per cambiare le forme al corpo
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
  } else{
    setTimeout(classifyPose, 100);
  }
}

function gotResult(error, results){
  poseLabel = results[0].label;
  classifyPose();
}

function gotPoses(poses) {
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
  background(100);
  
  translate(-width / 2, -height / 2);
  translate(video.width, 0);
  scale(-1, 1);
  
  noStroke();
  lights();
  drawBody();
  drawSkeleton();
}

function drawSkeleton() {
  
  if (pose) {
    // disegna lo scheletro
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(10);
      stroke(177, 219, 231);
      line(a.position.x, a.position.y, b.position.x, b.position.y);
    }
  }
}

function drawBody() {

  if (pose && poseLabel == "b") {
    // distanza tra gli occhi
    // determina i diametri di tutti i box
    fill(177, 219, 231)
    
    let d = dist(
      pose.rightEye.x,
      pose.rightEye.y,
      pose.leftEye.x,
      pose.leftEye.y
    );

    //Calcolo punto medio tra le spalle
    let aShoulder = (pose.leftShoulder.x + pose.rightShoulder.x) / 2;
    let bShoulder = (pose.leftShoulder.y + pose.rightShoulder.y) / 2;
    
    //Calcolo punto medio tra le anche
    let aHip = (pose.leftHip.x + pose.rightHip.x) / 2;
    let bHip = (pose.leftHip.y + pose.rightHip.y) / 2;
    
    //Calcolo punto medio tra i punti media di Shoulder e Hip per trovare la pancia
    let aTummy = (aShoulder + aHip) / 2;
    let bTummy = (bShoulder + bHip) / 2;
    
    //Disegna testa
    push();
    stroke(0);
    strokeWeight(1.5);
    translate(pose.nose.x, pose.nose.y, 0);
    rotateX(frameCount * 0.03);
    rotateZ(frameCount * 0.03);
    box(d * 1.8);
    pop();
    //Disegna collo
    push();
    translate(aShoulder, bShoulder, 0);
    box(d * 1.5);
    pop();
    //Disegna spalla sinistra
    push();
    translate(pose.leftShoulder.x, pose.leftShoulder.y, 0);
    box(d * 1.3);
    pop();
    //Disegna spalla destra
    push();
    translate(pose.rightShoulder.x, pose.rightShoulder.y, 0);
    box(d * 1.3);
    pop();
    /*
    //Disegna pancia
    push();
    translate(aTummy, bTummy, 0);
    box(d * 2.5);
    pop();
    */
    //Disegna bacino
    push();
    translate(aHip, bHip, 0);
    box(d * 1.5);
    pop();
    //Disegna anca sinistra
    push();
    translate(pose.leftHip.x, pose.leftHip.y, 0);
    box(d * 1.3);
    pop();
    //Disegna anca destra
    push();
    translate(pose.rightHip.x, pose.rightHip.y, 0);
    box(d * 1.3);
    pop();
    //Disegna gomito destro
    push();
    translate(pose.rightElbow.x, pose.rightElbow.y, 0);
    box(d * 1.3);
    pop();
    //Disegna gomito sinistro
    push();
    translate(pose.leftElbow.x, pose.leftElbow.y, 0);
    box(d * 1.3);
    pop();
    //Disegna polso destro
    push();
    translate(pose.rightWrist.x, pose.rightWrist.y, 0);
    box(d * 1.1);
    pop();
    //Disegna polso sinistro
    push();
    translate(pose.leftWrist.x, pose.leftWrist.y, 0);
    box(d * 1.1);
    pop();
    //Disegna ginocchio destro
    push();
    translate(pose.rightKnee.x, pose.rightKnee.y, 0);
    box(d * 1.1);
    pop();
    //Disegna ginocchio sinistro
    push();
    translate(pose.leftKnee.x, pose.leftKnee.y, 0);
    box(d * 1.1);
    pop();
    //Disegna caviglia destro
    push();
    translate(pose.rightAnkle.x, pose.rightAnkle.y, 0);
    box(d * 1.1);
    pop();
    //Disegna caviglia sinistro
    push();
    translate(pose.leftAnkle.x, pose.leftAnkle.y, 0);
    box(d * 1.1);
    pop();
  } else if (pose && poseLabel == "c"){
    // distanza tra gli occhi
    // determina i diametri di tutti i box
    let d = dist(
      pose.rightEye.x,
      pose.rightEye.y,
      pose.leftEye.x,
      pose.leftEye.y
    );

    //Calcolo punto medio tra le spalle
    let aShoulder = (pose.leftShoulder.x + pose.rightShoulder.x) / 2;
    let bShoulder = (pose.leftShoulder.y + pose.rightShoulder.y) / 2;
    
    //Calcolo punto medio tra le anche
    let aHip = (pose.leftHip.x + pose.rightHip.x) / 2;
    let bHip = (pose.leftHip.y + pose.rightHip.y) / 2;
    
    //Calcolo punto medio tra i punti media di Shoulder e Hip per trovare la pancia
    let aTummy = (aShoulder + aHip) / 2;
    let bTummy = (bShoulder + bHip) / 2;
    
    //Disegna testa
    push();
    stroke(0);
    strokeWeight(1);
    translate(pose.nose.x, pose.nose.y, 0);
    rotateY(frameCount * 0.02);
    cylinder(d * 1.5);
    pop();
    //Disegna collo
    push();
    translate(aShoulder, bShoulder, 0);
    sphere(d * 1.2);
    pop();
    //Disegna spalla sinistra
    push();
    translate(pose.leftShoulder.x, pose.leftShoulder.y, 0);
    sphere(d * 1.2);
    pop();
    //Disegna spalla destra
    push();
    translate(pose.rightShoulder.x, pose.rightShoulder.y, 0);
    sphere(d * 1.2);
    pop();
    /*
    //Disegna pancia
    push();
    translate(aTummy, bTummy, 0);
    sphere(d * 2.5);
    pop();
    */
    //Disegna bacino
    push();
    translate(aHip, bHip, 0);
    sphere(d * 1.5);
    pop();
    //Disegna anca sinistra
    push();
    translate(pose.leftHip.x, pose.leftHip.y, 0);
    sphere(d * 1.3);
    pop();
    //Disegna anca destra
    push();
    translate(pose.rightHip.x, pose.rightHip.y, 0);
    sphere(d * 1.3);
    pop();
    //Disegna gomito destro
    push();
    translate(pose.rightElbow.x, pose.rightElbow.y, 0);
    sphere(d * 1.3);
    pop();
    //Disegna gomito sinistro
    push();
    translate(pose.leftElbow.x, pose.leftElbow.y, 0);
    sphere(d * 1.3);
    pop();
    //Disegna polso destro
    push();
    translate(pose.rightWrist.x, pose.rightWrist.y, 0);
    sphere(d * 1.1);
    pop();
    //Disegna polso sinistro
    push();
    translate(pose.leftWrist.x, pose.leftWrist.y, 0);
    sphere(d * 1.1);
    pop();
    //Disegna ginocchio destro
    push();
    translate(pose.rightKnee.x, pose.rightKnee.y, 0);
    sphere(d * 1.1);
    pop();
    //Disegna ginocchio sinistro
    push();
    translate(pose.leftKnee.x, pose.leftKnee.y, 0);
    sphere(d * 1.1);
    pop();
    //Disegna caviglia destro
    push();
    translate(pose.rightAnkle.x, pose.rightAnkle.y, 0);
    sphere(d * 1.1);
    pop();
    //Disegna caviglia sinistro
    push();
    translate(pose.leftAnkle.x, pose.leftAnkle.y, 0);
    sphere(d * 1.1);
    pop();
  }
}

// Creazione grafiche che seguono i movimenti del corpo 0.1 by Mariangela Catucci [tracking corpo, sistema di particelle, colori, forme, dinamicità]
// 2021 © Mariangela @MariangelaCatucci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
//
// —
//
// Credits: 
// @shiffman (twitter.com/shiffman) for https://thecodingtrain.com/
// original license: MIT License 2019
//
// —
//
// Help:
// [movimenti del corpo] sistema di particelle che segue i movimenti del corpo
//
// —

let video;
let poseNet;
let pose;
let particella = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
}

function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
  }
}

function modelLoaded() {
  console.log("poseNet ready");
}

function draw() {
  image(video, 0, 0,width,height);

  if (pose) {
    let conta = 0;
    for (let p of particella) {
      p.update();
      p.disegna();
      if (p.vita <= 0) {
        particella.splice(conta, 1);
      }
      conta++;
    }
    
    if (particella.length < 50) {
      for (let i = 0; i < pose.keypoints.length; i++) {
        let nuovaparticella = new particle(
          pose.keypoints[i].position.x,
          pose.keypoints[i].position.y
        );
        particella.push(nuovaparticella);
      }
    }
  }
}
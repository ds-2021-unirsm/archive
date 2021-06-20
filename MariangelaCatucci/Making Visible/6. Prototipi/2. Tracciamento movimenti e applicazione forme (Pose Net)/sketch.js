// Creazione grafiche che seguono i movimenti del corpo 0.1 by Mariangela Catucci [tracking corpo, sistema di particelle, colori, forme, dinamicità]
// 2021 © Mariangela @MariangelaCatucci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
//
// —
//
// Credits to:
// PoseNet by E. Nickles, C. Valenzuela, M. Man, D. Oved
// @EllenNickles (ellennickles.site/)
// @oveddan (twitter.com/oveddan)
// @c_valenzuelab (twitter.com/c_valenzuelab)
// @mayaonthenet (twitter.com/mayaonthenet)
// in collaboration with Google Researchers 
// for (github.com/oveddan)
// for (github.com/tensorflow/tfjs-models)
// for (github.com/cvalenzuela)
// for (https://github.com/mayaman)
// original license: MIT License 2018
//
// Credits to: 
// @shiffman (twitter.com/shiffman) for https://thecodingtrain.com/
// original license: MIT License 2019
//
// —
//
// Help:
// [movimenti del corpo] sistema di particelle che segue i movimenti del corpo
// [polsi vicini] cambia forma del sistema di particelle
// —

let video;
let poseNet;
let pose;
let particella_ellipse = [];
let particella_triangle = [];

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
    for (let p of particella_ellipse) {
      p.update();
      p.disegna();
      if (p.vita <= 0) {
        particella_ellipse.splice(conta, 1);
      }
      conta++;
    }
   part_ellipse();
  }
  
  if (pose) {
    let conta = 0;
    for (let n of particella_triangle) {
      n.update();
      n.disegna();
      if (n.vita <= 0) {
        particella_triangle.splice(conta, 1);
      }
      conta++;
    }
   part_triangle();
  }
}

//creo la funzione che gestisce le particelle che di base si creano sul corpo
function part_ellipse(){  
  if (particella_ellipse.length < 50) {
    for (let i = 0; i < pose.keypoints.length; i++) {
      if (pose.rightWrist.x - pose.leftWrist.x <= -150) {
        let nuovo_ellipse = new particle_ellipse(
          pose.keypoints[i].position.x,
          pose.keypoints[i].position.y
        );
        particella_ellipse.push(nuovo_ellipse);
      }
    }
  } 
}

//verifico la vicinanza tra i polsi e creo un nuovo sistema di particelle
function part_triangle(){ 
  if (particella_triangle.length < 50) {
    for (let i = 0; i < pose.keypoints.length; i++) {
      if (pose.rightWrist.x - pose.leftWrist.x > -150) {
        let nuovo_triangle = new particle_triangle(
          pose.keypoints[i].position.x,
          pose.keypoints[i].position.y
        );
        particella_triangle.push(nuovo_triangle);
      }
    }
  } 
}

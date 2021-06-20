// — 
//█▄▀ ▄▀█ █▀█ █▀█ ▄▀█
//█░█ █▀█ █▀▀ █▀▀ █▀█
//
// DeepFool_WebCam by kaappa
// 2021 © Carmen Ianiro, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/kaaaappa
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to: 
// https://editor.p5js.org/ml5/sketches/PoseNet_webcam
// https://editor.p5js.org/fupete/sketches/WUY1jA4jn
// —

let img;
let video;
let capture;
let k = 0;
let pos;
let censura;
let fiori;
let poseNet;
let poses = [];

//Interfaccia GUI
let parametri = {
  Negativo: false,
};

window.onload = function () {
  var gui = new dat.GUI(); //Crea la GUI
  gui.add(parametri, "Negativo");
};

function setup() {
  pos = createCanvas(250, 430);
  video = createCapture(VIDEO);
  video.size(width, height);

  capture = createCapture(VIDEO);
  video.hide();
  capture.hide();
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", function (results) {
    poses = results;
  });

  
}

function draw() {
  pos.position(windowWidth / 2 - width / 2, 140);

  image(video, 0, 0, width, height);
  video.hide();
  //console.log("x: " + mouseX, "y: " + mouseY);


  if(parametri.Negativo) {
    invert();
  }

    console.warn = () => {};
    console.error = () => {};
  

}

//Carica PoseNet quando il video è caricato
function imageReady() {
  let options = {
    minConfidence: 0.1,
  };
  // assegna PoseNet all'immagine
  poseNet = ml5.poseNet(modelReady);
  // This sets up an event that listens to 'pose' events
  poseNet.on("pose", function (results) {
    poses = results;
    console.log(poses);
    
  });
}


//Rintraccia pose
function modelReady() {
  poseNet.singlePose(img);
  k = 1;
}


function invert() {
  censura = createGraphics(width, height);
  censura.noStroke();
  censura.fill(0);
  censura.beginShape();
  censura.rect(0, 0, width, poses[0].pose.leftShoulder.y-30);
  censura.rect(0, poses[0].pose.rightHip.y + 100, width, height);
  censura.rect(0, 0, poses[0].pose.rightShoulder.x - 30, height);
  censura.rect(poses[0].pose.leftShoulder.x + 30, 0, width, height);
  censura.endShape(CLOSE);

  //immagine di partenza
  //image(video, 0, 0);
  //video.hide();
  //la duplico
  let a = get();
  
  a.mask(censura);
  filter(INVERT);
  image(a, 0, 0);
}

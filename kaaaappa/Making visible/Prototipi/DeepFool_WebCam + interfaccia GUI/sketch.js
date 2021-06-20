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
let k;
let pos;
let censura;
let fiori;
let poseNet;
let poses = [];

//Interfaccia GUI
let parametri = {
  PuntatoreOcchio: false,
  OcchiSuiCapezzoli: false,
  Disegno: false,
  Negativo: false,
  Save: function () {
    save();
  },
};

window.onload = function () {
  var gui = new dat.GUI(); //Crea la GUI
  gui.add(parametri, "PuntatoreOcchio"); // Tendina: inserire array di valori
  gui.add(parametri, "OcchiSuiCapezzoli");
  gui.add(parametri, "Disegno");
  gui.add(parametri, "Negativo");
  gui.add(parametri, "Save");
};

function setup() {
  pos = createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  capture = createCapture(VIDEO);
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", function (results) {
    poses = results;
  });

  video.hide();
  capture.hide();
}

function draw() {
  pos.position(windowWidth / 2 - width / 2, 100);

  image(video, 0, 0, width, height);
  //console.log("x: " + mouseX, "y: " + mouseY);

  if (
    parametri.PuntatoreOcchio == false &&
    parametri.OcchiSuiCapezzoli == false &&
    parametri.Disegno == false &&
    parametri.Negativo == false &&
    parametri.Pennello == false &&
    parametri.Fiori == false
  ) {
    select("#status").html("Seleziona un effetto!");
    //cursor("default");
    cursor("pointer/2.png");
  } else if (parametri.Disegno) {
    select("#status").html("Effetto sketch");
    sketch();
  } else if (parametri.Negativo) {
    select("#status").html("Effetto negativo");
    invert();
  } else if (parametri.OcchiSuiCapezzoli) {
    select("#status").html("Occhi su capezzoli");
    occhiSuCapezzoli()
  } else if (parametri.PuntatoreOcchio) {
    select("#status").html("Effetto occhio");
    occhi();
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
}

function occhi() {
  shapeSx = createGraphics(width, height);
  for (k = 0; k < poses.length; k++) {
    shapeSx.noStroke();
    shapeSx.fill(255, 255, 0);
    shapeSx.circle(poses[k].pose.rightEye.x, poses[k].pose.rightEye.y, 70);

    //immagine di partenza
    image(video, 0, 0);

    //la duplico
    let a = get();

    a.mask(shapeSx);

    image(
      a,
      mouseX - poses[k].pose.rightEye.x,
      mouseY - poses[k].pose.rightEye.y
    );
    //console.log("arriva quii");
  }
}

function occhiSuCapezzoli() {
  occhiodestro = createGraphics(width, height);
  for (let w = 0; w < poses.length; w++) {
    occhiodestro.noStroke();
    occhiodestro.fill(255, 255, 0);
    occhiodestro.circle(poses[w].pose.rightEye.x, poses[w].pose.rightEye.y, 70);

    occhiosinistro = createGraphics(width, height);
    occhiosinistro.noStroke();
    occhiosinistro.fill(255, 255, 0);
    occhiosinistro.circle(poses[w].pose.leftEye.x, poses[w].pose.leftEye.y, 70);

    //immagine di partenza
    image(video, 0, 0);

    //la duplico
    let a = get();
    let b = get();

    a.mask(occhiodestro);
    b.mask(occhiosinistro);

    image(
      a,
      poses[w].pose.rightShoulder.x - poses[w].pose.rightEye.x + 20,
      poses[w].pose.rightShoulder.y - poses[w].pose.rightEye.y + 90
    );
    image(
      b,
      poses[w].pose.leftShoulder.x - poses[w].pose.leftEye.x - 20,
      poses[w].pose.leftShoulder.y - poses[w].pose.leftEye.y + 90
    );
    // console.log(poses);
  }
}


function invert() {
  censura = createGraphics(width, height);
  censura.noStroke();
  censura.fill(0);
  censura.beginShape();
  censura.rect(0, 0, width, poses[0].pose.leftShoulder.y);
  censura.rect(0, poses[0].pose.rightHip.y + 100, width, height);
  censura.rect(0, 0, poses[0].pose.rightShoulder.x - 30, height);
  censura.rect(poses[0].pose.leftShoulder.x + 30, 0, width, height);
  censura.endShape(CLOSE);

  //immagine di partenza
  image(video, 0, 0);

  //la duplico
  let a = get();

  a.mask(censura);
  filter(INVERT);
  image(a, 0, 0);
}

function sketch() {
  censura = createGraphics(width, height);
  censura.noStroke();
  censura.fill(0);
  censura.beginShape();
  censura.rect(0, 0, width, poses[0].pose.leftShoulder.y);
  censura.rect(0, poses[0].pose.rightHip.y + 100, width, height);
  censura.rect(0, 0, poses[0].pose.rightShoulder.x - 30, height);
  censura.rect(poses[0].pose.leftShoulder.x + 30, 0, width, height);
  censura.endShape(CLOSE);

  //immagine di partenza
  image(video, 0, 0);

  //la duplico
  let a = get();

  a.mask(censura);
  filter(POSTERIZE, 10);
  filter(GRAY);
  image(a, 0, 0);
}

function save() {
  img.save(parametri.foto + "_uncensored", "jpg");
}

// —
// █▄▀ ▄▀█ █▀█ █▀█ ▄▀█
// █░█ █▀█ █▀▀ █▀▀ █▀█
//
// DeepFool_Voice Control by kaappa
// 2021 © Carmen Ianiro, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm
// github.com/ds-2021-unirsm — github.com/kaaaappa
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to:
// https://editor.p5js.org/ml5/sketches/PoseNet_webcam
// https://editor.p5js.org/ml5/sketches/SoundClassification_speechcommand
// https://teachablemachine.withgoogle.com/train/audio
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
const options = { probabilityThreshold: 0.7 };
let comando;
let fedele;
let comandoPrecedente = "Rumore di sottofondo";
let s = false;
let ben = false;
let n = false;

let classifier;

// Teachable Machine model URL:
let soundModel = "https://teachablemachine.withgoogle.com/models/PZzEi35mF/";

function preload() {
  // Load the model
  classifier = ml5.soundClassifier(soundModel + "model.json");
  classifier.classify(gotResult);
}

function setup() {
  pos = createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  select("#status").html("Comandi vocali: <br> -Bianco e Nero <br> -Occhi <br> -Negativo <br> -Scatta <br> -RIcarica");
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

  if (comando == "Occhi" && fedele > 0.5) {
    s = true;
  } else if (comando == "Scatta" && fedele > 0.4) {
    comando = "Rumore di sottofondo";
    salvala();
  } else if (comando == "BeN" && fedele > 0.5) {
    ben = true;
  } else if (comando == "Ricarica" && fedele > 0.6) {
    s = false;
    ben = false;
    n = false;
  } else if (comando == "Negativo" && fedele > 0.5) {
    n = true;
  }

  if (s == true) {
    occhiSuCapezzoli();
  }

  if (ben == true) {
    filter(GRAY);
  }

  if (n == true) {
    invert();
  }

  console.warn = () => {};
  console.error = () => {};
}

// The model recognizing a sound will trigger this event
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  comando = results[0].label;
  fedele = results[0].confidence;
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  //console.log(results);
  // Show the first label and confidence
  if (comando !== "Rumore di sottofondo"){
  console.log(results[0].label);
  console.log(results[0].confidence);
}

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

function occhiSuCapezzoli() {
  clear();

  occhiodestro = createGraphics(width, height);
  for (let w = 0; w < poses.length; w++) {
    occhiodestro.noStroke();
    occhiodestro.fill(255, 255, 0);
    occhiodestro.circle(
      poses[w].pose.rightEye.x,
      poses[w].pose.rightEye.y,
      (poses[w].pose.leftEye.x - poses[w].pose.rightEye.x) / 1.001
    );

    occhiosinistro = createGraphics(width, height);
    occhiosinistro.noStroke();
    occhiosinistro.fill(255, 255, 0);
    occhiosinistro.circle(
      poses[w].pose.leftEye.x,
      poses[w].pose.leftEye.y,
      (poses[w].pose.leftEye.x - poses[w].pose.rightEye.x) / 1.001
    );

    //immagine di partenza
    image(video, 0, 0);

    //la duplico
    a = get();
    b = get();

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

function salvala() {
  save(pos,"_uncensored", "jpg");
}

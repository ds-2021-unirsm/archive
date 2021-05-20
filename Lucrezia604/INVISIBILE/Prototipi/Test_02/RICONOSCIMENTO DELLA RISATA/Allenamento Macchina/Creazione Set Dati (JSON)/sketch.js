// Webcam Carichimento Dati [Facemesh]
// Realizza un file json con i dati del rilevamento facciale
// Laboratorio di Design dei Sistemi Interattivi, a.a. 2020/2021, prof. Daniele Tabellini, Design UNIRSM

let facemesh;
let video;
let predictions = [];
let inp;
let b1;
let b2;

let data=[];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  facemesh = ml5.facemesh(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new predictions are made
  facemesh.on("predict", results => {
    predictions = results;
    //console.log(predictions)
  });

  // Hide the video element, and just show the canvas
  video.hide();
  inp=createInput();
  b1=createButton("Salva Pos");
  b1.mousePressed(salvaPosizione);
  b2=createButton("Salva Dato");
  b2.mousePressed(salvaDato)
}
function salvaDato() {
  saveJSON(data,"sorrisi.json")
}
function salvaPosizione(){
  let arr=[];
  for (let i = 0; i < predictions.length; i += 1) {
    const keypoints = predictions[i].scaledMesh;

    // Draw facial keypoints.
    for (let j = 0; j < keypoints.length; j += 1) {
      const [x, y] = keypoints[j];

      arr.push(x);
      arr.push(y);
      
    }
  }
  data.push({array:arr,
            label:inp.value()});
  console.log(data);
  
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints
  drawKeypoints();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const keypoints = predictions[i].scaledMesh;

    // Draw facial keypoints.
    for (let j = 0; j < keypoints.length; j += 1) {
      const [x, y] = keypoints[j];

      fill(0, 255, 0);
      ellipse(x, y, 5, 5);
    }
  }
}

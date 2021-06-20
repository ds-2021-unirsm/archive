// -
// Allenare FaceMesh 0.1 by Lucrezia Nediani [Sorriso, FaceMesh]
// 2021 © Lucrezia Nediani, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/Lucrezia604 — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// —
// Help:
// Allenare FaceMesh a riconoscere il sorriso
// [tasto "Raccogli Data"] raccoglie il dato
// —

let facemesh;
let video;
let predictions = [];
let data;

let indovina;


// Step 2: set your neural network options
const options = {
  task: 'classification',
  input:42,
  debug: true
}

// Step 3: initialize your neural network
const nn = ml5.neuralNetwork(options);


function preload(){
  data=loadJSON("risata.json");
 
}



function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  facemesh = ml5.facemesh(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new predictions are made
  facemesh.on("predict", results => {
    predictions = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
  
  consol.log(dataobj);
  
  for (let el in dataobj)
      data.push(dataobj[el]);
  
  console.log(data);
  
  
  // Step 4: add data to the neural network
data.forEach(item => {
  const inputs = item.punti;
  const output = {
    label: item.label 
  };

  nn.addData(inputs, output);
});

// Step 5: normalize your data;
nn.normalizeData();

// Step 6: train your neural network
const trainingOptions = {
  epochs: 32,
  batchSize: 12
}
nn.train(trainingOptions, finishedTraining); 
      indovina=createButton("Indovina");
  indovina.mousePressed(classify);
}

function finishedTraining(){
  console.log("Modello Trainato!");
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

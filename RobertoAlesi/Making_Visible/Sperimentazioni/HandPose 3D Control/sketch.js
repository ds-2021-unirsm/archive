//  ______  ____  ___  
//  __/ _ \/ __ \/ _ )
//  _/ , _/ /_/ / _  / 
//  /_/|_|\____/____/ 
//
// -
// HandPose_3D 0.1 by Roberto [hand, pose, cube, sphere, 3d, nointerface]
// 2021 © Roberto @ciunart, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm
// github.com/ds-2021-unirsm — github.com/fupete — github.com/RobertoAlesi
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to: 
// bomanimc (https://github.com/bomanimc) for https://learn.ml5js.org/#/reference/handpose
// https://github.com/ml5js/ml5-library/tree/main/examples/p5js/Handpose
// original license: MIT License
// —
// 
// Hand gesture:
// [rock] -> cambia forma in cubo
// [aperta] -> cambia forma in sfera
// [chiusa] -> cambia colore
// [pinch] -> controlla la dimensione
// —

let handpose;
let video;
let predictions = [];
let dataobj;
let data=[];
let stop;
let d;
let d1;
let handres;
let r;
let g;
let b;
let particella=[];
let ruota;

let xindex;
let yindex;
let xthumb ;
let ythumb;
let xpinky;
let ypinky;
let opacita = 255;

const options = {
  task: 'classification',
  inputs:42,
  debug: true
}

// Step 3: initialize your neural network
const nn = ml5.neuralNetwork(options);

function preload(){dataobj=loadJSON("mano.json","json");}

function setup() {
  createCanvas(w = 640, h=480, WEBGL);
  video = createCapture(VIDEO);
  video.size(width, height);
  

  handpose = ml5.handpose(video, modelReady);
  handpose.on("predict", results => {predictions = results;});

  video.hide();
  
  //console.log(dataobj);
  
  for (let el in dataobj)
      data.push(dataobj[el]);
  
 // console.log(data);

  
  data.forEach(item => {
      const inputs =item.punti;
      const output = {
        label: item.label
      };
      nn.addData(inputs, output);
    });

    // Step 5: normalize your data;
  nn.normalizeData();

    // Step 6: train your neural network
    const trainingOptions = {
      epochs: 70,
      batchSize: 70
    }
    nn.train(trainingOptions, finishedTraining);
  


}


function classify(){
  let arr=[];
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    //console.log(predictions)
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      arr.push(keypoint[0]);
      arr.push(keypoint[1]);
    } }
  const input = arr;
  nn.classify(input, handleResults);
}
// Step 9: define a function to handle the results of your classification
function handleResults(error, result) {
    if(error){
      console.error(error);
      return;
    } 
 //console.log(result[0].label);  // {label: 'red', confidence: 0.8};
  handres= result[0].label;
}
function finishedTraining(){
  console.log("Modello Trainato!");
}
function modelReady() {
  console.log("Model ready!");
}

function draw() {
  background(0);
  translate(-w/2, -h/2)
 // image(video, 0, 0, width, height);
  lights();

  
//Disegna la griglia
    push()
    stroke(255)
  strokeWeight(1);
  //  translate(width/2, height/2)
    rotateX(PI/2);
  for (var i = 0; i < width/2; i += 10) {
  	line(i, 0, i, height/2);
  	line(width/2, i, 0, i);
  }
  pop()
    
    
 // mousePressed();
  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
  drawScene();
  indicepollice();
}

function indicepollice() {   
  if (predictions.length > 0){
    for (let i=0;i<10;i++){
      let nuovaparticella=new particle(xindex,yindex);
      particella.push(nuovaparticella);
     
    }
  let conta=0;
  for(let p of particella){
      p.update();
      p.disegna();
    if (p.vita<=0){
      particella.splice(conta,1);
    }
    conta++;
  }

   
 }
}

////////////////////////disegna i punti della mano//////////////////////////////
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      fill(100, 0, 255);
      noStroke();
      push()
      translate(keypoint[0], keypoint[1])
      sphere(5);
      pop()
    }
    classify();
  }
 
}


function drawSkeleton() {
  if (predictions.length > 0){
    let annotations = predictions[0].annotations;
    stroke(122, 0, 180);
    strokeWeight(5)
    for (let j = 0; j < annotations.thumb.length - 1; j++) {
      line(annotations.thumb[j][0], annotations.thumb[j][1], annotations.thumb[j + 1][0], annotations.thumb[j + 1][1]);
}
    for (let j = 0; j < annotations.indexFinger.length - 1; j++) {
      line(annotations.indexFinger[j][0], annotations.indexFinger[j][1], annotations.indexFinger[j + 1][0], annotations.indexFinger[j + 1][1]);
    }
    for (let j = 0; j < annotations.middleFinger.length - 1; j++) {
      line(annotations.middleFinger[j][0], annotations.middleFinger[j][1], annotations.middleFinger[j + 1][0], annotations.middleFinger[j + 1][1]);
    }
    for (let j = 0; j < annotations.ringFinger.length - 1; j++) {
      line(annotations.ringFinger[j][0], annotations.ringFinger[j][1], annotations.ringFinger[j + 1][0], annotations.ringFinger[j + 1][1]);
    }
    for (let j = 0; j < annotations.pinky.length - 1; j++) {
      line(annotations.pinky[j][0], annotations.pinky[j][1], annotations.pinky[j + 1][0], annotations.pinky[j + 1][1]);
    }
    
    line(annotations.ringFinger[0][0], annotations.ringFinger[0][1], annotations.pinky[0][0], annotations.pinky[0][1]);
    line(annotations.ringFinger[0][0], annotations.ringFinger[0][1], annotations.middleFinger[0][0], annotations.middleFinger[0][1]);
  line(annotations.indexFinger[0][0], annotations.indexFinger[0][1], annotations.middleFinger[0][0], annotations.middleFinger[0][1]);
    line(annotations.indexFinger[0][0], annotations.indexFinger[0][1], annotations.thumb[0][0], annotations.thumb[0][1]);
      line(annotations.palmBase[0][0], annotations.palmBase[0][1], annotations.thumb[0][0], annotations.thumb[0][1]);
        line(annotations.palmBase[0][0], annotations.palmBase[0][1], annotations.pinky[0][0], annotations.pinky[0][1]);
    
    
    stroke(0, 250, 0);
    strokeWeight(1);
      line(annotations.palmBase[0][0], annotations.palmBase[0][1], annotations.indexFinger[0][0], annotations.indexFinger[0][1]);
    line(annotations.palmBase[0][0], annotations.palmBase[0][1], annotations.middleFinger[0][0], annotations.middleFinger[0][1]);
    line(annotations.palmBase[0][0], annotations.palmBase[0][1], annotations.ringFinger[0][0], annotations.ringFinger[0][1]);

}
}


function drawScene() {
if (predictions.length > 0){
  noStroke()
    xindex = predictions[0].annotations.indexFinger[3][0];
    yindex = predictions[0].annotations.indexFinger[3][1];
    xthumb = predictions[0].annotations.thumb[3][0];
    ythumb = predictions[0].annotations.thumb[3][1];
    xpinky = predictions[0].annotations.pinky[3][0];
    ypinky = predictions[0].annotations.pinky[3][1];
    
    d = dist(xindex, yindex, xthumb, ythumb);
    d1= dist(xindex, yindex, xpinky, ypinky);
    
    //console.log(d)
    //console.log(d1)
    ruota = map(d1, -105,105,-PI/2,PI/2)
}

fill(r,g,b);
if( handres == "skere"){
  push()
  translate(xthumb,ythumb, 0)
  rotateY(ruota);
  box(d);
  pop()
}else if( handres == "aperta"){
   push()
   translate(xthumb,ythumb, 0)
   rotateY(ruota);
   sphere(d);
   pop()
}else if( handres == "pugno"){
  r = random(255);
  g = random(255);
  b = random(255);
} 
}

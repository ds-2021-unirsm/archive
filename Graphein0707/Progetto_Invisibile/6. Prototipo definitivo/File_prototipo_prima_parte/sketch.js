// -
// Prototipo parte uno 0.1 by Gaia Andruccioli [JSON, video, posenet]
// 2021 © Gaia Andruccioli, Daniele @Fupete, Irene @iretrtr and the course DS-2021 at DESIGN.unirsm,
// github.com/ds-2021-unirsm — github.com/fupete - github.com/Graphein0707
// Educational purposes, MIT License, 2021, San Marino
// —
//
// Help:
// Start ▶ button for start recording the frame of the video
// Save ⇓ button for save the positions in JSON format
//

let video;
let videos = [];
let poseNet;
let poses = [];
let data = [];
let data1 = [];
let data2 = []; 
let indice = 0;

function preload() {
  grease = loadImage("img/grease.jpg");
  odissea = loadImage("img/2001.jpg");
  shine = loadImage("img/shine.jpg");
}

function setup() {
  createCanvas(854, 360);
  
  button = createImg("img/shine.jpg");
  button.position(40, 110);
  button.mousePressed(videorec);

  button2 = createImg("img/grease.jpg");
  button2.position(310, 110);
  button2.mousePressed(videorec2);

  button3 = createImg("img/2001.jpg");
  button3.position(580, 110);
  button3.mousePressed(videorec3);
  
  textStyle(BOLD);
  textSize(35);
  text("Ready Made di gesti 🎞️", 30, 50);
  textStyle(NORMAL);
  textSize(20);
  text("Scegli il film 👇", 30, 80);

  fill(119, 136, 153);
  textStyle(BOLDITALIC);
  textSize(13);

  text1 = "Shining, Stanley Kubrick";
  text2 = "Grease, Randal Kleiser";
  text3 = "2001: Space Odissey, Stanley Kubrick";

  //shine
  videos[0] = createVideo("videos/shine.mp4");
  videos[0].size(640, 360);
  videos[0].hide();
  //grease
  videos[1] = createVideo("videos/scena.mp4");
  videos[1].size(854, 358);
  videos[1].hide();
  //2001
  videos[2] = createVideo("videos/2001.mp4");
  videos[2].size(640, 360);
  videos[2].hide();
  
  rec = createButton("Start ▶");
  rec.mousePressed(iniziaJson);
  rec.hide();

  salva = createButton("Save ⇓");
  salva.mousePressed(salvadati);
  salva.hide();
}

//shine
function videorec() {
  for (let i = 0; i < videos.length; i++) {
    background(255);
    text1 = "";
    text2 = "";
    text3 = "";
    videos[i].stop();
    videos[i].hide();
    button.hide();
    button2.hide();
    button3.hide();
  }
  indice = 0;
  salva.show();
  rec.show();
}

//grease
function videorec2() {
  for (let i = 0; i < videos.length; i++) {
    background(255);
    text1 = "";
    text2 = "";
    text3 = "";
    videos[i].stop();
    videos[i].hide();
    button.hide();
    button2.hide();
    button3.hide();
  }
  indice = 1;
  salva.show();
  rec.show();
}

//2001
function videorec3() {
  for (let i = 0; i < videos.length; i++) {
    background(255);
    text1 = "";
    text2 = "";
    text3 = "";
    videos[i].stop();
    videos[i].hide();
    button.hide();
    button2.hide();
    button3.hide();
  }
  indice = 2;
  salva.show();
  rec.show();
}

function salvadati() {
  data2.push({type: [data,data1]});
  //ta2.push({ });
  saveJSON(data2, "dataset.json");
}

function iniziaJson() {
  videos[indice].play();
  videos[indice].loop();

  poseNet = ml5.poseNet(videos[indice], modelReady);
  poseNet.on("pose", function (results) {
    poses = results;
  });
}

function modelReady() {
  console.log("Model Loaded");
}

function draw() {
  image(videos[indice], 0, 0);
  drawKeypoints();
  
  textStyle(ITALIC);
  textSize(13);
  text(text1, 30, 355);
  text(text2, 300, 355);
  text(text3, 570, 355);
}

function drawKeypoints() {
  if (poses.length == 0) return;
  let arr = [];
  let arr2 = [];
  let t = frameCount / 60;

  
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;
    arr.push({pos: poses[i].skeleton});
    arr2.push({pos: poses[i].pose.keypoints});
    
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];

      fill(255, 0, 0);
      noStroke();
      ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
     }
  }
  
  if (frameCount % 60 == 0) 
    {
      data.push({ punti: arr });
      data1.push({ faccia: arr2 });
    }
  
}

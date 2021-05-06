let video;

let poseNet;
let canvas;

// variabili
let noseY = 0;
let noseX = 0;
let wristRX = 0; //polso
let wristRY= 0;//polso


function setup() {
  
    canvas = createCanvas(640, 480);
    video = createCapture(VIDEO);
	video.hide();
    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', gotPoses);

 
}

function loaded() {
    console.log("modello pronto!");
}

function gotPoses(poses) {
	if (poses.length > 0) {

        let nx = poses[0].pose.keypoints[0].position.x;
		let ny = poses[0].pose.keypoints[0].position.y;
		noseX = lerp(noseX, nx, 0.5);
      noseY = lerp(noseY, ny, 0.5);
        
        // colori comandati dal polso
       
        let wrx = poses[0].pose.keypoints[10].position.x;
		let wry = poses[0].pose.keypoints[10].position.y;
		wristRX = lerp(noseX, wrx, 0.5);
        wristRY = lerp(noseY, wry, 0.5);
}
}

function modelReady() {
	console.log("model ready!");
}

function draw() {

    // disegna ellisse sul naso
	image(video, 0, 0);
    ellipse(noseX, noseY, 80);

 

 //utilizzare il polso per mappare il colore del naso, il polso utilizza la grandezza del canvas

    if ((wristRX < (windowWidth/2)) && (wristRY < (windowHeight/2)))  {
        r = random(255);
        g = random(255);
        b = random(255);
        fill(r, g , b);
    }
  
}




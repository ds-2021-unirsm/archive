let video;
let poseNet;
let pose;
let skeleton;

function setup() {
  createCanvas(1920, 1080);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  console.log(poses); 
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}


function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  image(video, 0, 0);
  let d = random(10, 20);

  if (pose) {
    /*t eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
    fill(255, 0, 0);
    ellipse(pose.nose.x, pose.nose.y, d);
    fill(0, 0, 255);
    ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
    ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);*/
    
/*for (let i = 0; i < pose.keypoints.length; i++) {
*/    let x = pose.nose.x;
      let y = pose.nose.y;
      fill(255,0,0,50);
      noStroke();
      ellipse(x,y,200, 200);
//  }
    
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(100);
      stroke(255,0,0, 50);
      line(a.position.x, a.position.y,b.position.x,b.position.y);     
    }
  }
}
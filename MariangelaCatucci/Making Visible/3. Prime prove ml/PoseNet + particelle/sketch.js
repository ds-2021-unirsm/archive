let video;
let poseNet;
let pose;
let particella = [];

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
    console.log(poses[0]);
  }
}

function modelLoaded() {
  console.log("poseNet ready");
}

function draw() {
  image(video, 0, 0);

  if (pose) {
    /*let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y)*/

    let conta = 0;
    for (let p of particella) {
      p.update();
      p.disegna();
      if (p.vita <= 0) {
        particella.splice(conta, 1);
      }
      conta++;
    }
    //console.log(particella.length);
    if (particella.length < 200) {
      for (let i = 0; i < pose.keypoints.length; i++) {
        let nuovaparticella = new particle(
          pose.keypoints[i].position.x,
          pose.keypoints[i].position.y
        );
        particella.push(nuovaparticella);
      }
    }
  }
}

/*fill(255, 0, 0);
    ellipse(pose.nose.x, pose.nose.y, 64);
    
    fill(0, 0, 255);
    ellipse(pose.rightWrist.x, pose.rightWrist.y, 64);
    ellipse(pose.leftWrist.x, pose.leftWrist.y, 64);
    
    for (let i = 0; i < pose.keypoints.length; i++){
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0, 255, 0);
      ellipse(x, y, 20, 20);*/

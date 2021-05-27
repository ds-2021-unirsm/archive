//PoseNet con camminatori
let video;
let poseNet;
let quanti = 100; // n elementi
let c = []; // camminatori

let pose;

let t = 3;

let d = 10;

let img = []; //array da cui estrerre le img
let img1;
let img2;
let img3;
let img4;
let img5;

function preload() {
  img1 = loadImage("img/c.arac.png");
  img2 = loadImage("img/c.blu.png");
  img3 = loadImage("img/c.gialla.png");
  img4 = loadImage("img/c.rosa.png");
  img5 = loadImage("img/c.verde.png");
  imgs = [img1, img2, img3, img4, img5];
}

function modelLoaded() {
  console.log("poseNet ready");
}

function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
    console.log(poses);
  }
}

function setup() {
  createCanvas(640,480);
  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);

  // crea n oggetti di classe Camminatore nell'area definita
  for (var i = 0; i < quanti; i++) {
    c.push(new arms(random(d,width-d), //coordinate x
        random(d, height + d), //coordinate y
        i,//nome
      )
    );
  }
}

function draw() {
  image(video, 0, 0, width, height);
  
  if (pose) {
    
    // per tutti i camminatori chiama i diversi metodi utili
    for (var l = 0; l < quanti; l++) {
      c[l].move();     
      if(c[l].x < pose.leftShoulder.x &&
         c[l].x > pose.rightShoulder.x &&
         c[l].y > pose.leftShoulder.y &&
         c[l].y < pose.leftShoulder.y+400) {
        
      noStroke();
      fill(200, map(c[l].speed, 1, 3, 0, 255), 200);
      //ellipse(c[l].x, c[l].y, d);
      image(c[l].can, c[l].x, c[l].y, 20, 20);
      } else {
      noStroke();
      noFill();
      ellipse(c[l].x, c[l].y, d); 
        
      }
        
    /*  else if(pose.score > 0.2){
      c[l].move();
     
      if(c[l].x > pose.leftShoulder.x &&
         c[l].x < pose.rigthHip.x &&
         c[l].y > pose.leftShoulder.y &&
         c[l].y < pose.rigthHip.y) {
        
      noStroke();
      fill(200, map(c[l].speed, 1, speedMax, 0, 255), 200);
      ellipse(c[l].x, c[l].y, d);
      } else {
      noStroke();
      noFill();
      ellipse(c[l].x, c[l].y, d);
      
      }
    }*/
  }
}

}
function arms(x, y, _id, can) {
  // costruttore
  this.id = _id;
  this.x = x;
  this.y = y;
  this.dirX = 1;
  this.dirY = 1;
  this.speed = random(1, t);
  let nr = int(random(0, 4));
  this.can = imgs[nr];
  

  // metodo move
  this.move = function (x, y) {
    if (noise(1) >= 0.5) this.dirX *= 1;
    if (noise(1) >= 0.5) this.dirY *= 1;

    this.x += this.speed * this.dirX;
    this.y += this.speed * this.dirY;

    if (this.x <= d || this.x >= width - d) {
      this.dirX *= -1;
    }

    if (this.y <= d || this.y >= height - d) {
      this.dirY *= -1;
    }
  };
}

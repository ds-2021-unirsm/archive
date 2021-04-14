let x, y;
var walkers = [];

function preload() {
  song = loadSound('alibi.mp3');
}

function setup() {
  song.loop();
  createCanvas(windowWidth, windowHeight);
  blendMode(ADD);
  frameRate(120);
  colorMode(HSB, 130, 160, 124, 1000);
  background(0);

  mic = new p5.AudioIn();
  mic.start();
  amplitude = new p5.Amplitude();
  amplitude.setInput(song);

}


function draw() {

  // se l'ampiezza è maggiore di 0.008 crea walker
  let level = amplitude.getLevel();
  if (level > 0.00009 && !rumore) {
    var punto = new walker();
    walkers.push(punto);
    //rumore = true;
  }
  if (level < 0.00009) {
    rumore = false;
  }


  for (var i = 0; i < walkers.length; i++) {
    walkers[i].walk();
    walkers[i].display();
  }
}

//walker function
function walker() {
  this.T = random(0, 1000);
  this.t2 = random(1200, 2000);
  this.miclevel = amplitude.getLevel();
  //visualizzare
  this.display = function() {

    this.miclevel = lerp(this.miclevel, amplitude.getLevel(), 0.06);
    this.micSize = map(this.miclevel, 0, 1, 1, 20);
    this.col1 = map(this.x, 0, width, 0, 360);

    fill(this.col1, 40, 100, 90);
    noStroke();
    ellipse(this.x, this.y, this.micSize, this.amplitude);
  }
  //noise xy
  this.walk = function() {
    this.x = noise(this.t2);
    this.x = map(this.x, 0, 1, 0, width);
    this.y = noise(this.T);
    this.y = map(this.y, 0, 1, 0, height);
    this.T = this.T + 0.003;
  }
}
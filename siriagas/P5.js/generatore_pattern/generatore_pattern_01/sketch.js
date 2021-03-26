//generatore di pattern Siria Gasperoni

function setup() {
  createCanvas(600,600 )
  colorMode(HSB, 360, 100, 100, 100);

  background(230,80,90);

}

function draw() {
fill(frameCount %100, 100,100);
noStroke();
circle(frameCount *2 % 900, frameCount * 40% 600, frameCount % 20);

}
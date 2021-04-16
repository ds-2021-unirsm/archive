//table of random digits

var x
var y
var n = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
var randomNum = "";

function setup() {
  createCanvas(w=windowWidth, h=windowHeight);
  textFont("Roboto", 18);
  noLoop();
}

function draw() {
  background(255);

  for (x = 20; x < 400; x += 40) {
    for (y = 40; y < 300; y += -40) {
      push();
      text ("TABLE OF RANDOM DIGITS", 310, 40);
      translate(x, y);
      numeri();
      pop();
    }
  }
}

function numeri() {
  for (var i = 0; i < 5; i++) {
    randomNum = random(n) + random(n) + random(n) + random(n) + random(n);
    fill(0);
    text(randomNum, x, y);
    y += 18;

  }
}
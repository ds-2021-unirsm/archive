// -
//
// TABLE OF RANDOM DIGITS by Lucilla Cesaroni 
// 2021 Lucilla @LucillaCesaroni, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm - github.com/fupete - github.com/LucillaCesaroni 
// Educational purposes, MIT License, 2021, San Marino
//
// —

var w, h;
var x, y;
var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
var randomNum = "";

function setup() {
  createCanvas(w = windowWidth, h = windowHeight);
  textAlign(CENTER);
  noLoop();
}

function draw() {
  background(255);

  textStyle(NORMAL);
  textFont("Verdana", 18);
  text('TABLE OF RANDOM DIGITS', w / 2, 50);
  text('161', w - 40, 50);

  textFont("Georgia", 18);
  textStyle(BOLD);

  for (x = 20; x < w; x += 45) {
    for (y = 60; y < h; y -= 25) {
      push();
      translate(x, y);
      matrice();
      pop();
    }
  }
}

function matrice() {
  for (var i = 0; i < 5; i++) {
    randomNum = random(numbers) + random(numbers) + random(numbers) + random(numbers) + random(numbers);
    fill(0);
    text(randomNum, x, y);
    y += 20; // interlinea tra i numeri
  }
}

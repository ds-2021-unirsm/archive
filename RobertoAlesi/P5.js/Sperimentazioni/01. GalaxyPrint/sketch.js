//  ______  ____  ___  _______  __________ ______ ____ ______________
//  __/ _ \/ __ \/ _ )/ __/ _ \/_  __/ __ \ _/ _ |_/ /__/ __/ __/  _/
//  _/ , _/ /_/ / _  / _// , _/ / / / /_/ / / __ |/ /__/ _/_\ \_/ /
//  /_/|_|\____/____/___/_/|_| /_/  \____/ /_/ |_/____/___/___/___/
//
// -
// Galaxy_print 0.1 by Roberto [10print, galaxy]
// 2021 © Roberto @ciunart, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete — github.com/RobertoAlesi
// Educational purposes, MIT License, 2021, San Marino
// —

function setup() {
  createCanvas(w = windowWidth, h = windowHeight);
  frameRate(1);
    background(0);
}

function draw() {
  background(0);
  
  noFill();
  strokeWeight(1);

  let start = random(1, 50)
  let end = random(start, 300)

  for (var j = start; j < end; j++) {
    if (random(0, 1) < 0.5) {
      noFill();
    } else {
      fill(j, map(j, start, end, 0, 255), 255, map(j, start, end, 0, 255));
    }

    if (random(0, 1) < 0.5) {
      stroke(255, map(j, start, end, 0, 255), 255);
    } else {
      noStroke();
    }

    ellipse(w / 2 + cos(j) * j, h / 2 + sin(j) * j, j / start, j / start);
  }

}

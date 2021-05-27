//  ______  ____  ___  _______  __________ ______ ____ ______________
//  __/ _ \/ __ \/ _ )/ __/ _ \/_  __/ __ \ _/ _ |_/ /__/ __/ __/  _/
//  _/ , _/ /_/ / _  / _// , _/ / / / /_/ / / __ |/ /__/ _/_\ \_/ /
//  /_/|_|\____/____/___/_/|_| /_/  \____/ /_/ |_/____/___/___/___/
//
// -
// Fonte_sonora 0.1 by Roberto [fonte, sonora]
// 2021 © Roberto @ciunart, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete — github.com/RobertoAlesi
// Educational purposes, MIT License, 2021, San Marino
// —
//
// Help:
// Da ascoltare con le cuffie
// [mouseY] volume
// [mouseX] panning L/R
//
// —

var talker = {};
var soundFile;
var init = 0;
var amp;

function preload() {
  soundFormats('mp3', 'ogg');
  soundFile = loadSound('Sound.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  mouseX = width/2;
  mouseY = 0;
  soundFile.loop();
  amp = new p5.Amplitude();
}

function draw() {
  background(0);
  
  textSize(32);
fill(255)
  text('L', 100, 200);
  text('R', width-100, 200);
  
  talker.x = constrain(mouseX, 0, width);
  talker.y = constrain(mouseY, 0, height);
  fill(204, 255, 255);
  noStroke();
  ellipse(talker.x, talker.y, 100, 100);
  var panning = map(talker.x, 0, width, 1.0, -1.0);
  var volume = map(talker.y, 0, height, 0, 1.0);
  var vol = amp.getLevel();
  soundFile.pan(panning);
  soundFile.setVolume(volume);
   
  
 
  var r = map(volume, 0, 2, 0, 255);
  var g = map(panning, -1, 1, 0, 255);
  var b = map(vol, 0, 0.0001, 0, 255);
  
  fill(r, g, b, 50);
  noStroke();
  ellipse(width/2, height, vol * 650);
  
  
  ellipse(width/2, height, vol * 1300);
  ellipse(width/2, height, vol * 4000);
}

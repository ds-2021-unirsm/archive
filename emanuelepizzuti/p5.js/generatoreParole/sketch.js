//  ____ ____
// | ___|  _ |
// | ___|  __|
// |____|_|
// ___________
//
// wordGenerator by emanuelepizzuti [words]
// 2021 © emanuelepizzuti, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// —
// [mouse] click to generate a new word
// ___________

var w, h;
let iniziale = ["a", "e", "i", "o", "u"];
let primaSillaba = ["ba", "be", "bi", "bo", "bu", "pa", "pe", "pi", "po", "pu"];
let secSillaba = ["bb", "cc", "dd", "ff", "gg", "ll", "mm", "rr", "zz"];
let randomParola = "";
var x;
var y;
let mouse;

// lunghezza della parola
// let min = 1;
// let max = 2;
// let lunghezza;

var voice = new p5.Speech(); // new P5.Speech object

function setup() {
  createCanvas(w = windowWidth, h = windowHeight);
  background(235);

  // noLoop();
  // y = 40;
  // x = 20;

  mouse = false;
}

function draw() {
  textAlign(CENTER, CENTER);

  fill(200);
  textFont("monospace", 36);
  text("[CLICK to create a new word!]", width / 2, 40);

  textFont("monospace", 72);
  //lunghezza della parola
  lunghezza = Math.floor(random(min, max));

  if (mouse == true) {
    background(235);
    fill(20);
    //parola
    randomParola = random(iniziale) + random(primaSillaba) + random(secSillaba) + random(iniziale);
    text(randomParola, w / 2, h / 2);

    voice.setPitch(0.5)
    voice.setLang('it-IT');
    voice.speak(randomParola);
  }

  mouse = false;

}

function mousePressed() {
  mouse = true;
}

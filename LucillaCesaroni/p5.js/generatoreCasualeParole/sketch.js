//         ___       ___  ___     
//        |\  \     |\  \|\  \    
//        \ \  \    \ \  \\\  \   
//         \ \  \    \ \  \\\  \  
//          \ \  \____\ \  \\\  \ 
//           \ \_______\ \_______\
//            \|_______|\|_______|
                                  
// -
//
// Generatore casuale di parole by Lucilla Cesaroni [words, random, speech]
// 2021 Lucilla @LucillaCesaroni, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm - github.com/fupete - github.com/LucillaCesaroni 
// Educational purposes, MIT License, 2021, San Marino
//
// —
//
// Credits/Thanks to: 
// p5.speech.js Speech Recognition, Speech synthesis, R.Luke DuBois
// The ABILITY lab, New York University for
// http://ability.nyu.edu/p5.js-speech/
// https://github.com/IDMNYU/p5.js-speech/blob/master/LICENSE
// original license: MIT License 2017
//
// —
//
// Help:
// [c] saveCanvas
// [mouse] refresh
//
// —

let w, h;
let x = 0;
let y = 0;

let vocaleConsonante = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let vocali = ["a", "e", "i", "o", "u"];
let consonanti = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"];
let randomParola = "";

// lunghezza della parola
let min = 1;
let max = 4;
let lunghezza;

let size = 60; // pt parola iniziale 
let colore = 0;

var voice = new p5.Speech(); // new P5.Speech object

let mouse = false;

function setup() {
  c = createCanvas(w = windowWidth, h = windowHeight);
  textAlign(CENTER, CENTER);
  colorMode(HSB, 360, 100, 100);
  background(10);

  //scrive la prima parola al centro
  x = w / 2;
  y = h / 2;

  scriviParola();
}

function draw() {

  x = random(0, w);
  y = random(0, h);

  // ogni 120 secondi scrivi una parola
  if (frameCount % 120 == 0) {
    push();
    size = random(10, size + 20);
    scriviParola(); // chiamo la funzione
    pop();
  }

  // pulisci il background quando clicchi
  if (mouse == true) {
    background(10);
  }
  mouse = false;

}

//premi tasto, refresh
function mousePressed() {
  mouse = true;
}

//premi tasto, screen del poster
function keyPressed() {
  saveCanvas(c, 'Poster', 'jpg');
}

// funzione che scrive la parola
function scriviParola() {

  //lunghezza della parola
  lunghezza = Math.floor(random(min, max));

  var h = 360 * noise(colore + 205);
  var s = 100; //saturazione
  var b = 100;

  fill(h, s, b);
  textFont("Raleway", size);
  textStyle(BOLD);

  //con cosa inizio?
  randomParola = random(vocaleConsonante);

  //per la lunghezza metto vocali e consonanti > max 8 lettere perche ne inserisco due alternate..
  for (let i = 0; i < lunghezza; i++) {
    let vocale_estratta = random(vocali);
    randomParola += vocale_estratta;
    let consonante_estratta = random(consonanti);
    randomParola += consonante_estratta;
  }
  text(randomParola, x, y);

  colore += 0.2;
  
  // modifica della voce
  voice.setLang('it-IT');
  voice.setPitch(2.0);
  
  voice.speak(randomParola);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);  
  background(10);
}

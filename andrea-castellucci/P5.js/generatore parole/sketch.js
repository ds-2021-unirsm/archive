// Generatore di parole in lingua Andreana
// Sketch di Andrea Castellucci

// Regole della lingua Andreana:
//   - Tutte le parole devono iniziare con la "A" e finire con "A" o "E"
//   - Esistono solo le seguenti consonanti: n,c --- d,b,p --- r,t
//     le consonanti scelte derivano da somiglianza estetica alle consonanti "ndr"  
//   - Esistono solo le vocali "a" o "e"

// Sketch di Andrea Castellucci

var array_vocali = ["a", "e"];
var array_consonanti = ["n", "c", "d", "b", "p", "r", "t", "nd", "dr", "pr", "nt", "rd"];

var n;
var vocale;
var consonante;
var parola;

var voce = new p5.Speech(); // new P5.Speech object

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(10);
  fill(150);
  textAlign(CENTER, CENTER);

  textSize(20);
  text("click per generare e ascoltare parole in Andreano", width / 2, height / 2);


  textSize(130);
  textStyle(BOLD);
}

function mousePressed() {
  background(10);

  newWord();
  text(parola, width / 2, height / 2);
}

function newWord() {
  parola = "";
  n = random(1, 3);

  parola += array_vocali[0];

  // estraggo parola
  for (var i = 0; i < n; i++) {
    consonante = array_consonanti[int(random(0, array_consonanti.length))];
    vocale = array_vocali[int(random(0, array_vocali.length))];
    parola += (consonante + vocale);
  }

  voce.setLang('it-IT');
  voce.setPitch(2.0);

  voce.speak(parola);
}

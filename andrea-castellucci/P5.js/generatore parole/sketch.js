//   __   __ _  ____  ____  ____   __
//  / _\ (  ( \(    \(  _ \(  __) / _\
// /    \/    / ) D ( )   / ) _) /    \
// \_/\_/\_)__)(____/(__\_)(____)\_/\_/
//
// -
// Generatore-parole-Andreano by Andrea [landscapes, horizon]
// 2021 © Andrea @AndrCastellucci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete — github.com/andrea-castellucci
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to: 
// p5.speech.js Speech Recognition, Speech synthesis, R.Luke DuBois
// The ABILITY lab, New York University for
// http://ability.nyu.edu/p5.js-speech/
// https://github.com/IDMNYU/p5.js-speech/blob/master/LICENSE
// original license: MIT License 2017
// —
//
// Help:
// [mouse.click] nuova parola
//
// —

// REGOLE DELLA LINGUA ANDREANA:
//   - Tutte le parole devono iniziare con la "A" e finire con "A" o "E"
//   - Esistono solo le seguenti consonanti: n,c --- d,b,p --- r,t
//     le consonanti scelte derivano da somiglianza estetica alle consonanti "ndr"  
//   - Esistono solo le vocali "a" o "e"

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

// -
// Generatore di parole casuali 0.1 by Gaia Andruccioli [parole, casuale]
// 2021 © Gaia Andruccioli, Daniele @Fupete, Irene @iretrtr and the course DS-2021 at DESIGN.unirsm,
// github.com/ds-2021-unirsm — github.com/fupete - github.com/Graphein0707
// Educational purposes, MIT License, 2021, San Marino
// —

var sillabe = ["ba", "be", "bi", "bo", "bu", "ca", "ce", "ci", "co", "cu", "da", "de", "di", "do", "du", "fa", "fe", "fi", "fo", "fu", "ga", "ge", "gi", "go", "gu", "la", "le", "li", "lo", "lu", "ma", "me", "mi", "mo", "mu", "na", "ne", "ni", "no", "nu", "pa", "pe", "pi", "po", "pu", "ra", "re", "ri", "ro", "ru", "sa", "se", "si", "so", "su", "ta", "te", "ti", "to", "tu", "va", "ve", "vi", "vo", "vu", "za", "ze", "zi", "zo", "zu"];

var doppia = ["ll", "tt", "nn", "pp", "ss", "zz", "dd", "ff", "rr", "xx"];

var randomSillaba = "";

function setup() {
  createCanvas(w = windowWidth, h = windowHeight);
  textFont("Roboto", 150);
}

function draw() {
  translate(60, 170);

  if (frameCount % 30 == 0) {
    randomSillaba = random(sillabe) + random(doppia);
    background(random(255), random(100), random(120));
  }

  fill(255);
  text(randomSillaba, 0, 0);
}

//random words

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
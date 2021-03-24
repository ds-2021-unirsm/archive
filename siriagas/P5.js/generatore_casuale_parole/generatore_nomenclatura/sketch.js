// Gioco: individua la nomenclatura corretta Siria Gasperoni

var pref = ["anidride clor", "acido clor", "ossido ferr", "anidridesolfor", ];


var suff = ["oso", "ico", "ipo", "ica", "osa"];

var parola = "";

function setup() {

  createCanvas(windowWidth, windowHeight);

  fill(255);
  textAlign(CENTER);
  textSize(windowHeight / 15);

  nomenclatura();
}

function draw() {


  if (mouseIsPressed) {
    nomenclatura();

  }
}

function nomenclatura() {

  background(random(100, 255), random(100, 255), random(100, 255));
  parola = "";
  for (var i = random(1); i > 0; i--) {
    var r = floor(random(pref.length));
    parola += pref[r];
  }
  var r = floor(random(suff.length));
  parola += suff[r];
  print(parola);
  text(parola, width / 2, height / 2);
}
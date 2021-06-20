// -
// simple UI interface example [GUI]
// 2019 © Daniele @Fupete 
// github.com/fupete
// Educational purposes, MIT License, 2019, Crespina IT
// —
// Credits/Thanks to: 
// @lo-th (github.com/lo-th) for the simple javascript ui https://github.com/lo-th/uil
// original license: MIT License here https://github.com/lo-th/uil/blob/gh-pages/LICENSE
// —

let gui = new UIL.Gui({ // interfaccia
  css: 'right:0; top:0;',
  bg: '#7777aa', // to update new version
  w: 300
});


//crea un array di colori, toglie il trattino e mette l'asterisco
let colori = "1200ff-0092ff-00fff8-fff655-fffcd9".split("-").map(a => "#" + a)

let w = [];
let nWalkers = 20;
let world = 700;

let diametroEllisse = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);

  setupGui(); // < init interfaccia

  background(0);
  noStroke();

  for (let i = 0; i < nWalkers; i++) {
    w.push(new Walker());
  }
}

function draw() {
  translate(windowWidth / 2, windowHeight / 2)
  rotate(frameCount / TWO_PI)
  translate(-world / 2, -world / 2)

  for (let i = 0; i < nWalkers; i++) {
    w[i].move();
    w[i].display();

  }
}

function Walker(_id) {
  this.id = _id;
  this.x = 0;
  this.y = 0;
  this.t = random(100);
  this.tIncr = random(-1, 2) * 0.001;

  this.move = function() {
    this.x = noise(this.t) * world;
    this.y = noise(this.t + 25) * world;
    this.t += this.tIncr;
  }

  this.display = function() {
    //più questo numero è alto più tempo ci mette a cambiare colore
    let cambioColore = 70
    //color restituisce un numero intero, ovvero il modulo del numero di frame / 70
    let color1 = (int(frameCount / cambioColore)) % 5
    let color2 = (int(frameCount / cambioColore) + 1) % 5
    let ratio = (frameCount / cambioColore) * 0.01

    this.d = random(1, 5);
    ellipse(this.x, this.y, diametroEllisse);

    //lerpColor prende due colori di riferimento e ne trova un terzo compreso tra essi
    //in questo caso vengono presi due colori dall'array colori
    fill(lerpColor(color(colori[color1]), color(colori[color2]), ratio));
    noStroke();
  }

}


function setupGui() {

  // Visore frame per secondo...
  gui.add('fps', {
    res: 60
  });
 
  // SLIDER diametro cerchio con funzione callback
  gui.add('slide', {
    name: 'Diametro',
    value: 1,
    min: 1,
    max: 30,
    callback: cambiaDiametroEllisse
  });


  // GRUPPO 
  gui_gr1 = gui.add('group', {
    name: 'Testo'
  });
  var list = ['Testo A', 'Testo B', 'Testo C', 'Testo D', 'Testo E'];
  gui_gr1.add('list', {
    name: 'Testo',
    value: 'Testo C',
    list: list,
    w: 200,
    callback: cambiaTesto
  });
  gui_gr1.add('slide', {
    name: 'TextSize',
    value: Math.random().toFixed(3),
    min: 16,
    max: 80,
    precision: 2,
    h: 50,
    callback: cambiaDimTesto
  });
  gui_gr1.add('slide', {
    name: 'TextYPos',
    value: Math.random().toFixed(3),
    min: 50,
    max: 400,
    precision: 2,
    w: 100,
    callback: cambiaYTesto
  });
  gui_gr1.add('circular', {
    name: 'TextYPos',
    value: Math.random().toFixed(3),
    min: 50,
    max: 400,
    precision: 2,
    w: 100,
    callback: cambiaYTesto
  });
  gui_gr1.add('knob', {
    name: 'TextYPos',
    value: Math.random().toFixed(3),
    min: 50,
    max: 400,
    precision: 2,
    w: 75,
    callback: cambiaYTesto
  });

  // pulsante
  gui.add('button', {
    name: 'Reset',
    fontColor: '#ffffff',
    h: 70
  }).onChange(function(v) {
      clear();
  background(0);
  });

}

var cambiaDiametroEllisse = function(valore) {
  diametroEllisse = valore;
}

var cambiaMostraQuadrato = function(valore) {
  mostraQuadrato = !mostraQuadrato;
}

var cambiaColoreQuadrato = function(valore) {
  let r = map(valore[0], 0, 1, 0, 255);
  let g = map(valore[1], 0, 1, 0, 255);
  let b = map(valore[2], 0, 1, 0, 255);
  coloreQuadrato = color(r, g, b);
}

var cambiaTesto = function(valore) {
  testo = valore;
}

var cambiaDimTesto = function(valore) {
  textSize(valore);
}

var cambiaYTesto = function(valore) {
  yTesto = valore;
}

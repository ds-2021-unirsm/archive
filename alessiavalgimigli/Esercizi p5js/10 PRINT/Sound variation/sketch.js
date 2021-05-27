// -
// cerchi sonori 0.1 by Alessia Valgimigli [suono, slider]
// 2021 © Alessia Valgimigli, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to:
// @Yiting Liu (https://yitingliu.com/) for https://openprocessing.org/sketch/926914
// —

let gui = new UIL.Gui({ // interfaccia
  css: 'right:0; top:0;',
  bg: '#143CFF', // to update new version
  w: 250
});

let x = 0;
let y = 0;
let spacing=20; //diametro ellisse
let speed=4;
let transposeS=4;
let polySynth;
let pitches = ["C", "D", "E", "F", "G", "A", "B"];
let octaves = [3, 4, 5];


function setup() {
  createCanvas(400, 400);
  background(19, 56, 240);

  setupGui();
  
  //crea un array di suoni dalla libreria
  polySynth = new p5.PolySynth();
}

function playSynth(freq) {
  userStartAudio();

  // dur --> durata della nota
  let dur = 1;
  //time --> variabile che stabilisce quando il suono ha inizio
  let time = 0.3;
  //vel --> velocity inteso come volume del suono da 0 a 1
  let vel = 0.1;

  for (let i = 0; i < 4; i++) {
    let note = random(pitches) + random(octaves) + transposeS;
    polySynth.noteAttack(note, 0.1);
  }
}

function draw() {
  frameRate(speed);

  //Mescola i pixel nella finestra di visualizzazione secondo la modalità definita --> ADD = somma di A (source pixel) e B (pixel già presenti nel canvas)
  blendMode(ADD);
  let r = random(30, 255);
  let g = random(30, 255);
  let b = (r + g) / random(1, 5);

  if (random(1) > 0.5) {
    strokeWeight(random(3));
    stroke(r, g, b);
    noFill();
    ellipse(x, y, spacing);
    
    //la frequenza viene definita da 440 (frequenza che identifica il LA) moltiplicata dalla x dell'elemento, il tutto diviso dal valore dato dallo splider dello spazio
    playSynth((440*x) / spacing);
  } else {
    fill(r, g, b);
    strokeWeight(random(20));
    stroke(r, g, b, 50);
    ellipse(x, y, spacing);
    playSynth((440 * y) / spacing);
  }

  x += spacing;

  //se esce dalla larghezza della pagina rinizia una nuova linea
  if (x > width) {
    x = 0;
    y += spacing;
  }

  //se esce dalla lunghezza della pagina azzera e ricomincia dall'inizio
  if (y > height) {
    y = 0;
    x = 0;
    clear();
    background(19, 56, 240);
  }
}

function setupGui() {
  
    gui.add('slide', {
    name: 'Speed',
    value: 4,
    min: 1,
    max: 30,
    callback: cambiaSpeed
  });
  
    gui.add('slide', {
    name: 'Transpose',
    value: 4,
    min: 1,
    max: 30,
    callback: cambiaTran
  });
  
      gui.add('slide', {
    name: 'Space',
    value: 20,
    min: 1,
    max: 30,
    callback: cambiaSpace
  });
  
}

let cambiaSpeed = function(valore) {
  speed = valore;
}

let cambiaTran = function(valore) {
  transposeS = valore;
}

let cambiaSpace = function(valore) {
  spacing = valore;
}

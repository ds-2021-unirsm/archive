let x, y;

var walkers = [];

// OGGETTO PARAMETRI
// Inserire i parametri che si vogliono modificare, e i loro valori iniziali
let parametri = {
bgColor: [102, 0, 204],
  colore: 100, // Slider: inserire valore all'avvio dello sketch 
  diametro: 10,
  


  

  stroke: function() { // Pulsante chiama funzione: scrivere la funzione che si intende richiamare
    weirdStroke = random(0.001, 0.1);
    weirdColor = [random(255)];
  }

};

// FUNZIONE GUI
// Inserire i parametri e il loro range se presente.
// Si possono aggiungere sezioni nascoste dichiarandole con il metodo .addFolder();
window.onload = function() {

  var gui = new dat.GUI();
  gui.add(parametri, 'colore', 0, 500); // Slider: inserire valore inferiore e maggiore

  var evento1 = gui.add(parametri, 'diametro', 0.0001, 50); // EVENTO: Viene chiamata una funzione al variare del parametro

  evento1.onChange(function() { // La funzione viene chiamata mentre si cambia il valore del diametro
    colore = random(HSB);
  });



}

function preload() {
  song = loadSound('song.mp3');
}

function setup() {
  song.loop();
  createCanvas(windowWidth, windowHeight);
 // blendMode(ADD);
  frameRate(120);
  colorMode(HSB, 170, 180, 124,1000 );
  background(0);

  mic = new p5.AudioIn();
  mic.start();
  amplitude = new p5.Amplitude();
  amplitude.setInput(song);

}


function draw() {

  // se l'ampiezza è maggiore di 0.008 crea walker
  let level = amplitude.getLevel();
  if (level > 0.00009 && !rumore) {
    var punto = new walker();
    walkers.push(punto);
    //rumore = true;
  }
  if (level < 0.00009) {
    rumore = false;
  }


  for (var i = 0; i < walkers.length; i++) {
    walkers[i].walk();
    walkers[i].display();
  }
}

//walker function
function walker() {
  this.T = random(0, 1000);
  this.t2 = random(1200, 2000);
  this.miclevel = amplitude.getLevel();
  //visualizzare
  this.display = function() {

    this.miclevel = lerp(this.miclevel, amplitude.getLevel(), 0.06);
    this.micSize = map(parametri.diametro, 1, 1, 1, 10);
    this.micSize = (parametri.diametro);
    this.col1 = map(this.x, 0, width, 0, 360);

    fill(parametri.colore, 100, 100, 90);

    ellipse(this.x, this.y, this.micSize, this.amplitude);
  }
  //noise xy
  this.walk = function() {
    this.x = noise(this.t2);
    this.x = map(this.x, 0, 1, 0, width);
    this.y = noise(this.T);
    this.y = map(this.y, 0, 1, 0, height);
    this.T = this.T + 0.004;
  }
}
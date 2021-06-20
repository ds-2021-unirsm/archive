// reference: https://openprocessing.org/sketch/926914

let x = 0;
let y = 0;
let spacing;
let speed;
let polySynth;

function setup() {
  createCanvas(400, 400);

  //slider speed
  speed = createSlider(1, 200, 30, 2);
  createDiv('speed').child(speed);

  //slider transpose
  transposeS = createSlider(0, 3, 1, 0.2);
  createDiv('transpose').child(transposeS);

  //slider spacing
  spacing = createSlider(10, 300, 20, 5);
  createDiv('spacing').child(spacing);
  
  //crea un array di suoni dalla libreria
  polySynth = new p5.PolySynth();

  background(19, 56, 240);

}

function playSynth(freq) {
  userStartAudio();
  
  // dur --> durata della nota
  let dur = 1;
  //time --> variabile che stabilisce quando il suono ha inizio
  let time = 0.3;
  //vel --> velocity inteso come volume del suono da 0 a 1
  let vel = 0.1;

  let octVal = 3;
  let octave = (freq % 25) + 24 * octVal;
  //transpose --> assume il valore dello slider transpose
  let transpose = transposeS.value();
  //pow moltiplica un numero per se stesso tante volte quanto viene indicato nel secondo valore
  note = pow(2, (octave + transpose - 49) / 12) * 440;
  
  //**** il calcolo della variabile octave e quello di note devo ancora analizzarli per capirne il significato


  //genera tre suoni con valori diversi
  //polySynth.play(note, vol, time, dur);
  polySynth.play(note / 3, vel, time += 1 / 3, dur / 2);
  polySynth.play(note / 6, vel, time, dur / 8);
  polySynth.play(note / 9, vel, time -= 1 / 3, dur / 4);

}


function draw() {
  
  frameRate(speed.value());
  
  //Mescola i pixel nella finestra di visualizzazione secondo la modalità definita --> ADD = somma di A (source pixel) e B (pixel già presenti nel canvas)
  blendMode(ADD);
  let r = map(mouseX, 0, width, 30, 255);
  let g = map(mouseY, 0, height, 30, 255);
  let b = (r + g) / random(1, 5);


  if (random(1) > 0.5) {
    
    strokeWeight(random(3))
    stroke(r, g, b);
    noFill();
    ellipse(x, y, spacing.value());
    playSynth(440 * x / spacing.value());
    
  } else {
    
    fill(r, g, b);
    strokeWeight(random(20));
    stroke(r, g, b, 50);
    ellipse(x, y, spacing.value());
    playSynth(440 * y / spacing.value());

  }
  
  x += spacing.value();
  
  //se esce dalla larghezza della pagina rinizia una nuova linea
  if (x > width) {    
    x = 0;
    y += spacing.value();    
  }
  
  //se esce dalla lunghezza della pagina azzera e ricomincia dall'inizio
  if (y > height) {
    y = 0;
    x = 0;  
    clear();
    background(19, 56, 240);
  }
}
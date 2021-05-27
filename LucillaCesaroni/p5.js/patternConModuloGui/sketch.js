//         ___       ________     
//        |\  \     |\   ____\    
//        \ \  \    \ \  \___|    
//         \ \  \    \ \  \       
//          \ \  \____\ \  \____  
//           \ \_______\ \_______\
//            \|_______|\|_______|
                                  
// -
//
// Pattern con modulo & simple GUI interface 0.2 by Lucilla Cesaroni [GUI]
// 2021 Lucilla @LucillaCesaroni, Daniele @Fupete & Luigi @MrJ4ckpot and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm - github.com/fupete - github.com/LucillaCesaroni 
// Educational purposes, MIT License, 2021, San Marino
//
// —
//
// Credits/Thanks to: 
// https://editor.p5js.org/fupete/sketches/WUY1jA4jn for original code
//
// —
//
// Help:
// [c] save canvas
//
// —

let parametri = {

  coloreSfondo: 0, // Slider: valore all'avvio dello sketch 

  diametroEllisse: 0, // Slider: valore all'avvio dello sketch 
  coloreEllisse: [40, 0, 255],

  ruotoQuadrati: 180,
  mostraQuadrati: true,

  weird: function() { // Pulsante chiama funzione: scrivere la funzione che si intende richiamare
    weirdStroke = random(0.5, 4);
  },

  stamp: function() {
    saveCanvas(c, 'Poster', 'jpg');
  }

};

window.onload = function() {

  var gui = new dat.GUI();

  // colore di sfondo
  var evento1 = gui.add(parametri, 'coloreSfondo', 0, 255); // Slider: inserire valore min e max
  // evento che ti dice che sto cambiando lo sfondo e mi cambia il colore dello stroke del quadrato
  evento1.onChange(function() { // La funzione viene chiamata MENTRE si cambia il valore
    coloreQuadrati = random(255);
  });
  evento1.onFinishChange(function() { // La funzione viene chiamata DOPO aver cambiato il valore
    alert("Hai cambiato anche il colore dello stroke dei quadrati!");
  });

  // ellisse
  var f0 = gui.addFolder('Ellisse');
  f0.add(parametri, 'diametroEllisse', 0, 30);
  f0.addColor(parametri, 'coloreEllisse');

  // quadrati
  var f1 = gui.addFolder('Quadrati');
  f1.add(parametri, 'ruotoQuadrati', 0, 360);
  f1.add(parametri, 'mostraQuadrati');

  gui.add(parametri, 'weird'); // Pulsante chiama funzione: non aggiungere nulla
  gui.add(parametri, 'stamp');

}

let w, h;
let d = 50; // grandezza del cerchio esterno
let d2 = 15; //diametro max cerchio
let angle = 0;
let coloreQuadrati
let weirdStroke = 1;

function setup() {
  c = createCanvas(w = windowWidth, h = windowHeight);
  rectMode(CENTER);
  ellipseMode(CENTER);
  angleMode(DEGREES);

  coloreQuadrati = 255; // all'inizio i quadrati sono bianchi
  //colorMode(HSB, 360, 100, 100);
}

function draw() {
  background(parametri.coloreSfondo);
  for (x = 20; x < w; x += 50) {
    for (y = 30; y < h; y += 55) {
      push();
      translate(x, y);
      rotate(angle);
      noFill();
      strokeWeight(weirdStroke);
      stroke(coloreQuadrati);
      if (parametri.mostraQuadrati) {
        rect(0, 0, d);
        rect(0, 0, d - 12);
        rect(0, 0, d - 25);
        rect(0, 0, d - 35);
      }

      angle = parametri.ruotoQuadrati;

      pop();
    }
  }
  for (x = 20; x < w; x += 50) {
    for (y = 30; y < h; y += 55) {
      if (x % 4 == 0 && y % 2 == 0) {
        // Scale the mouseX value from 0 to w to a range between 0 and 255
        let color = parametri.coloreEllisse;
        // Scale the mouseX value from 0 to h to a range between 10 and 300
        let scale = parametri.diametroEllisse;

        fill(color);
        noStroke();
        ellipse(x, y, scale);
      } else {
        ellipse(x, y, 0);
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

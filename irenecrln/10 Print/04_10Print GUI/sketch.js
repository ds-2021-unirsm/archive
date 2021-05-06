/*╔════════════               ════════════╗
    
     ✹ UNIRSM 
     ✹ Corso di Design dei sistemi
     ✹ Studentessa: Irene Carlino
     ✹ Prof. Daniele Tabellini
     ✹ Corso di Laurea Magistrale in Design
     ✹ Anno Accademico 2020/21
     ✹ GUI Credits: 2019 © Luigi @MrJ4ckpot & Daniele @Fupete 
     
//╚════════════               ════════════╝*/

var x = 0;
var y = 0;
var sizer = 30;
let coloreSfondo;

let parametri = {
  background: [255, 255, 255],
  coloreRect: [211, 184, 245],
  coloreStella: [116, 255, 92],
  diametroRect: 23,
  punteStella: 7,
}

window.onload = function() {
  var gui = new dat.GUI();

  var coloreSfondo =
    gui.addColor(parametri, 'background');


  var f1 = gui.addFolder('Rect'); // Crea una tendina
  f1.addColor(parametri, 'coloreRect'); // valore dentro la tendina

  var f1 = gui.addFolder('Stella');
  f1.addColor(parametri, 'coloreStella');


  gui.add(parametri, 'diametroRect', 0, 50);
  gui.add(parametri, 'punteStella', 4, 12);

}



function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(5); // x frame al secondo
  background(parametri.background);
}

function draw() {
  background(parametri.background);
  rectMode(CENTER);
  //width e height serve per farlo disegnare lungo l'altezza e la larghezza del canvas 
  for (var i = 0; i < width; i += sizer) {
    for (var j = 0; j < height; j += sizer) {


      if (random(1) < 0.5) {
        noStroke();
        fill(parametri.coloreRect);
        rect(x + i, y + j, (parametri.diametroRect), (parametri.diametroRect)); //il valore del seno è sempre compreso tra 1 e -1
      } else {
        //se esce un numero minore di 2 
        noStroke();
        fill(parametri.coloreStella);
        star(x + i, y + j, 8, 10, (parametri.punteStella)); //l'ultimo valore equivale al numero delle punte della stella 
      }
      //noLoop();
    }
  }

  function star(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius2 * noise(0.01 * frameCount + 500);
      let sy = y + sin(a) * radius2 * noise(0.01 * frameCount + 500);
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }

}
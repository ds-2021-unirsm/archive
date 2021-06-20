// -
// 4 mondi 0.1 by Alessia Valgimigli [walkers, vettori]
// 2021 © Alessia Valgimigli, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// —
// Help:
// [mouse] click: vengono generati nuovi camminatori
// interfaccia gui: viene modificata la quantità di camminatori che si generano al click
// -

let walkers = [];
let n_walkers = 20;
let macchia1;
let macchia2;
let macchia3;
let macchia4;

let w;
let h;

let gui = new UIL.Gui({ // interfaccia
  css: 'right:0; top:0;',
  bg: '#7777aa', // to update new version
  w: 200
});

function setup() {
  createCanvas((w = windowWidth), (h = windowHeight));

   setupGui();
  
  macchia1 = createVector(width / 4, height / 4);
  macchia2 = createVector(width - width / 5, height - height/5);
  macchia3 = createVector(width - width / 5, height / 4);
  macchia4 = createVector(width / 4, height - height/5);
}

function draw() {
  background(0);
  for (let el of walkers) {
    el.seek();
    el.update();
    //  goccia[i].noise();
    el.display();
  }
}

function mousePressed() {
  let estrazione = [1, 2, 3, 4];
  if (random(estrazione) == 1) {
    //let parola_bold = createP(misoginia[m]);
    //console.log("parola bold: " + parola_bold);
    //parola_bold.style('color', '#ff0000');
    for (let a = 0; a < n_walkers; a++) {
      walkers.push(
        new Walker(
          width / 2,
          height / 2,
          //ad ogni target aggiungo un vettore random in modo da variare leggermente la traiettoria tra una goccia e l'altra
          p5.Vector.add(
            macchia1,
            createVector(random(-100, 100), random(-100, 100))
          )
        )
      );
    }
  } else if (random(estrazione) == 2) {
    for (let a = 0; a < n_walkers; a++) {
      walkers.push(
        new Walker(
          width / 2,
          height / 2,
          p5.Vector.add(
            macchia2,
            createVector(random(-100, 100), random(-100, 100))
          )
        )
      );
    }
  } else if (random(estrazione) == 3) {
    for (let a = 0; a < n_walkers; a++) {
      walkers.push(
        new Walker(
          width / 2,
          height / 2,
          p5.Vector.add(
            macchia3,
            createVector(random(-100, 100), random(-100, 100))
          )
        )
      );
    }
  } else if (random(estrazione) == 4) {
    for (let a = 0; a < n_walkers; a++) {
      walkers.push(
        new Walker(
          width / 2,
          height / 2,
          p5.Vector.add(
            macchia4,
            createVector(random(-100, 100), random(-100, 100))
          )
        )
      );
    }
  }
}

function setupGui() {  
   gui.add('slide', {
    name: 'Quantità',
    value: 20,
    min: 10,
    max: 100,
    callback: cambiaNwalkers
  });
}

var cambiaNwalkers = function(valore) {
  n_walkers = valore;
}

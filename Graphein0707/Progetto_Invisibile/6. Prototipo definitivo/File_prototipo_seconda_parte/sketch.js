// -
// Prototipo parte due 0.1 by Gaia Andruccioli [JSON, video, posenet, graphic, blur, skeleton, movement, GUI]
// 2021 © Gaia Andruccioli, Daniele @Fupete, Irene @iretrtr and the course DS-2021 at DESIGN.unirsm,
// github.com/ds-2021-unirsm — github.com/fupete - github.com/Graphein0707
// Educational purposes, MIT License, 2021, San Marino
// —
//
// Help:
// 🎥 for choose a graphic film
// [GUI] change the view of movement
//
let pose = [];
let frame;
let movimento;
let index = 0;
let timer = 0;
let Globaltimer = 0;
let riproduci;
let text1;
let text2;
var gui = new dat.GUI();
let blurFI = true;

let parametri = {
  tempo: 30,
  movimento: 0,
  mostratraiettoria: false,
  mostrastickyman: false,
  blur: false,
  traiettoria: false,
  silhouette: false,
  stickyman: false,
};

gui.hide();
var tra = gui.addFolder("traiettoria");
tra.add(parametri, "mostratraiettoria");
tra.add(parametri, "movimento", 0, 100);
gui.add(parametri, "blur");
var sil = gui.addFolder("stickyman");
sil.add(parametri, "mostrastickyman");
sil.add(parametri, "tempo", 0, 30);
gui.add(parametri, "silhouette");

function preload() {
  //carico le immmagini > bottoni
  bianco = loadImage("img/bianco.png");
  rosso = loadImage("img/rosso.png");
  arancio = loadImage("img/arancio.png");

  //carico i 3 JSON
  pose = loadJSON("grease.json");
  pose1 = loadJSON("shine.json");
  pose2 = loadJSON("2001.json");
}

function setup() {
  createCanvas(1520, 358);
  background(0);

  text1 = "Indovina il film";
  text2 = "Scegli una 🎥";

  //rendo le immagini cliccabili
  img1 = createImg("img/bianco.png");
  img1.position(560, 200);
  img1.mousePressed(odissea);

  img2 = createImg("img/arancio.png");
  img2.position(720, 200);
  img2.mousePressed(shine);

  img3 = createImg("img/rosso.png");
  img3.position(880, 200);
  img3.mousePressed(grease);

  //tasto torna indietro
  img4 = createImg("img/freccia.png");
  img4.position(20, 20);
  img4.mousePressed(freccia);
  img4.hide();
  
  //console.log(Object.keys(pose).length);
  frame = Object.keys(pose).length; //pose[0].type[1].length;
}

//grease output
function grease() {
  background(0);
  text1 = "";
  text2 = "";
  img1.hide();
  img2.hide();
  img3.hide();
  img4.show();
  gui.show();
  riproduci = pose;
  frame = riproduci[0].type[1].length;
}

//shine output
function shine() {
  background(0);
  text1 = "";
  text2 = "";
  img1.hide();
  img2.hide();
  img3.hide();
  img4.show();
  gui.show();
  riproduci = pose1;
  frame = riproduci[0].type[1].length;
}

//odissea output
function odissea() {
  background(0);
  text1 = "";
  text2 = "";
  img1.hide();
  img2.hide();
  img3.hide();
  img4.show();
  gui.show();
  riproduci = pose2;
  frame = riproduci[0].type[1].length;
}

//tasto torna indietro
function freccia() {
  background(0);
  noStroke();
  parametri.movimento = false;
  parametri.blur = false;
  parametri.mostratraiettoria = false;
  parametri.silhouette = false;
  parametri.mostrastickyman = false;

  text1 = "Indovina il film";
  text2 = "Scegli una 🎥";
  img1.show();
  img2.show();
  img3.show();
  img4.hide();
  gui.hide();
}

function draw() {
  //testi iniziali
  fill(255);
  textSize(50);
  text(text1, 600, 90);

  textSize(30);
  text(text2, 680, 130);

  if (parametri.mostratraiettoria) {
    background(0);

    for ( let j = 0; j < riproduci[0].type[1][index].faccia[index].pos.length; j++
    ) {
      for (let k = 0; k < riproduci[0].type[1][index].faccia.length; k++) {
        beginShape();
        for (let i = 0; i < frame; i++) {
          noFill();
          strokeWeight(1);
          stroke(255, 0, 0);
          incr = parametri.movimento;
          print(riproduci[0].type[1][i].faccia[index].pos[k].position.x);
          curveVertex(riproduci[0].type[1][i].faccia[k].pos[j].position.x + i * incr, riproduci[0].type[1][i].faccia[k].pos[j].position.y
          );
        }
        endShape();
      }
    }
  } else if (parametri.blur) {
    if (blurFI == true) {
      background(0);
      noStroke();
      blurFI = false;
    }

    translate(330, 0);
    filter(BLUR, 3);
    index++;
    if (index >= frame) index = 0;
    for (let i = 0; i < riproduci[0].type[1][index].faccia.length; i++) {
      for (let j = 0; j < riproduci[0].type[1][index].faccia[i].pos.length; j++
      ) {
        fill(255, 102, 0, 70);
        //print(riproduci[0].type[1][index].faccia[i].pos[j].position.x);
        ellipse(
          riproduci[0].type[1][index].faccia[i].pos[j].position.x,
          riproduci[0].type[1][index].faccia[i].pos[j].position.y, 20, 20
        );
        noStroke();
      }
    }
  } else if (parametri.silhouette) {
    translate(330, 0);
    background(0);
    if (frameCount % 20 == 0) {
      index++;
      if (index >= frame) index = 0;
    }

    //print(riproduci[0]);

    for (let i = 0; i < riproduci[0].type[1][index].faccia.length; i++) {
      let skeleton = riproduci[0].type[1][index].faccia[i];

      for (let j = 1; j < skeleton.pos.length - 1; j++) {
        let partA = skeleton.pos[j];
        let partB = skeleton.pos[j - 1];

        strokeWeight(8);
        stroke(255, 255, 0, 60);

        if (j != 16 && j != 0) {
          line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
        }
      }
    }
  } else if (parametri.mostrastickyman) {
    translate(330, 0);
    background(0);
    for (let i = 0; i < riproduci[0].type[0][timer].punti.length; i++) {
      //let skeleton = poses[i].skeleton;
      for (let j = 0; j < riproduci[0].type[0][timer].punti[i].pos.length; j++
      ) {
        let partA = riproduci[0].type[0][timer].punti[i].pos[j][0];
        let partB = riproduci[0].type[0][timer].punti[i].pos[j][1];
        let keypoint = riproduci[0].type[1][timer].faccia[i].pos[j].position;

        fill(252, 118, 106);
        noStroke();
        ellipse(keypoint.x, keypoint.y, 5, 5);

        strokeWeight(2);
        stroke(252, 118, 106, 80);
        line(partA.position.x, partA.position.y, partB.position.x, partB.position.y
        );
      }
    }

    Globaltimer = (Globaltimer + 1) % 1000;

    if (timer >= riproduci[0].type[0].length - 1) timer = 0;
    else {
      if (!(Globaltimer % int(parametri.tempo))) timer++;
    }
  }

  if (blurFI == false && !parametri.blur) {
    blurFI = true;
  }
  
  if((!parametri.blur) && (!parametri.stickyman) &&(!parametri.silhouette) && (!parametri.traiettoria))
  {
    index = 0;
  }
}

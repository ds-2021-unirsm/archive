// — 
//█▄▀ ▄▀█ █▀█ █▀█ ▄▀█
//█░█ █▀█ █▀▀ █▀▀ █▀█
//
// DeepFool_WebCam by kaappa
// 2021 © Carmen Ianiro, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/kaaaappa
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to: 
// https://editor.p5js.org/ml5/sketches/PoseNet_webcam
// https://editor.p5js.org/ml5/sketches/BodyPix_Image
// https://editor.p5js.org/fupete/sketches/WUY1jA4jn
// —


let img;
let shape;
let censura;
let fiori;
let cxSx;
let cySx;
let cdSx;
let cxDx;
let cyDx;
let cdDx;
let sposta1x;
let sposta1y;
let sposta2x;
let sposta2y;
let contatore = 0;
let contatore1 = 0;
let contatore2 = 0;
let capezzolo = 0;
let refresh = 0;
let bodypix;
let pix = 0;
let t = 0;
let segmentation;
let comando_vecchio;
let input;
let scegli;
let y = 400;
let w = 500;
let poseNet;
let poses = [];


//Interfaccia GUI
let parametri = {
  foto: "Seleziona una foto", //Menù a tendina: inserire valore all'avvio dello sketch
  RicaricaImmagine: function () {
    refresh_immagine();
  },
  Clone: false,
  Figura: function () {
    colorChange();
  },
  Sfondo: function () {
    colorChangeBack();
  },
  Disegno: false,
  Negativo: false,
  Fiori: false,
  Pennello: false,
  Save: function () {
    save();
  },
};

window.onload = function () {
  var gui = new dat.GUI(); //Crea la GUI
  var f1 = gui.addFolder("Foto");
  f1.add(parametri, "foto", [
    "02",
    "04",
    "05",
    "07",
    "08",
    "09",
    "10",
    "12",
    "17",
    "19",
    "20",
    "22",
  ]);
  gui.add(parametri, "RicaricaImmagine"); // Tendina: inserire array di valori
  gui.add(parametri, "Clone");
  gui.add(parametri, "Disegno");
  gui.add(parametri, "Negativo");
  gui.add(parametri, "Fiori");
  gui.add(parametri, "Pennello");
  gui.add(parametri, "Figura");
  gui.add(parametri, "Sfondo");
  gui.add(parametri, "Save");
};

function setup() {
  //createCanvas(width, height);
  select("#status").html("Seleziona una foto!");
  frameRate(1);
}

function draw() {
  
  //console.log("x: " + mouseX, "y: " + mouseY);

  //Ricarica l'immagine solo se il comando da tendina cambia
  if (comando_vecchio != parametri.foto && comando_vecchio != undefined) {
    cambio_immagine();
    console.log("Comando vecchio: " + comando_vecchio);
  }
  // console.log("Comando vecchio fuori: " + comando_vecchio);
  comando_vecchio = parametri.foto;

  preload();

  if (parametri.Fiori) {
    select("#status").html("Applica i fiori...");
    cursor('pointer/2.png');
    
  } else if (
    parametri.foto != "Seleziona una foto" &&
    parametri.Disegno == false &&
    parametri.Negativo == false &&
    parametri.Clone == false &&
    parametri.Pennello == false &&
    pix == 1
  ) {
    select("#status").html("Seleziona un effetto!");
    cursor('default');
    pix = 0;
  } else if (parametri.Pennello) {
    select("#status").html("Utilizza il pennello...");
     cursor('pointer/2.png');
  } else if(parametri.Clone == true && capezzolo == 0) {
    select("#status").html("Seleziona <br> il primo punto..");
    cursor('pointer/2.png');
  } else if (parametri.Clone == true && capezzolo == 1) {
    select("#status").html("Seleziona <br> il secondo punto..");
    cursor('pointer/2.png');
  } else if (parametri.Clone == true && capezzolo == 3) {
    select("#status").html("Sposta <br> il primo punto..");
    cursor('pointer/2.png');
  } else if (parametri.Clone == true && capezzolo == 4) {
    select("#status").html("Sposta <br> il secondo punto..");
    cursor('pointer/2.png');
  }

  if (parametri.Disegno == true && contatore1 == 0) {
    select("#status").html("Effetto sketch...");
    sketch();
    contatore1 = 1;
  } else if (parametri.Disegno == false && contatore1 == 1) {
    refresh_immagine();
    contatore1 = 0;
  }

  if (parametri.Negativo == true && contatore2 == 0) {
    select("#status").html("Effetto sketch...");
    invert();
    contatore2 = 1;
  } else if (parametri.Negativo == false && contatore2 == 1) {
    refresh_immagine();
    contatore2 = 0;
  }

  if (parametri.Clone == true && capezzolo == 2) {
    if (poses[0].pose.leftShoulder.x - poses[0].pose.rightShoulder.x < 80) {
      cdDx = 20;
      cd = 20;
    } else {
      cdDx = 20;
      cd = 20;
    }
    toppa();
  } else if (parametri.Clone == true && capezzolo == 5) {
    toppa();
  } else if (parametri.Clone == false && capezzolo == 6) {
    refresh_immagine();
    capezzolo = 0;
  }

  console.warn = () => {};
  console.error = () => {};
}

function preload() {
  if(parametri.Fiori){
  let i = int(random(0, 8));
  fiori = loadImage("flower/flower" + i + ".png")}
}

function mousePressed() {
  if (parametri.Fiori) {
    let fx = 50;
    let fy = (fx * fiori.height) / fiori.width;
    let i = int(random(0, 8));
    image(fiori, mouseX - 30, mouseY - 30, fx, fy);
    tint(255, 150);
    // console.log("Fiore applicato");
  }

  if (parametri.Clone == true && capezzolo == 0) {
    cxDx = mouseX;
    cyDx = mouseY;
    capezzolo = 1;
  } else if (parametri.Clone == true && capezzolo == 1) {
    cx = mouseX;
    cy = mouseY;
    capezzolo = 2;
  } else if (parametri.Clone == true && capezzolo == 3) {
    sposta1x = mouseX;
    sposta1y = mouseY;
    capezzolo = 4;
  } else if (parametri.Clone == true && capezzolo == 4) {
    sposta2x = mouseX;
    sposta2y = mouseY;
    capezzolo = 5;
  }
}

function mouseDragged() {
  
  if (parametri.Pennello) {
    noStroke();
    var r = 255 * noise(t+10);
    var g = 255 * noise(t+15);
    var b = 255 * noise(t+20);
    fill(r, g, b, 130);
    circle(mouseX, mouseY, random(15,20));
    t = t + 0.01;
  }
}

function cambio_immagine() {
  select("#status").html("Modello in <br> caricamento...");
  console.log("Parametri: " + parametri.foto);
  //carico l'immagine con parametri selezionati dalla tendina

  img = createImg("data/" + parametri.foto + ".jpg", function () {
    //regolo grandezza dell'immagine
    if (img.height >= img.width) {
      w = 400;
      y = (w * img.height) / img.width;
    } else if (img.height < img.width) {
      y = 500;
      w = (y * img.width) / img.height;
    }

    let pos = createCanvas(w, y);
    background(0);
    pos.position(windowWidth / 2 - w / 2, 100);

    image(img, 0, 0, w, y);
    img.size(w, y);
    imageReady();
    bodypix = ml5.bodyPix();
    bodypix.segment(img, gotResults);
  });

  //imgNipples = loadImage("data/" + parametri.foto + ".jpg");

  partiConPoseNet();
  img.hide();
  frameRate(1);
}

function partiConPoseNet() {
  console.log(poses);
  if (poses.length > 0) {
    console.log("Arriva a PoseNet!!");
  }
}

function refresh_immagine() {
  select("#status").html("Modello in <br> caricamento...");
  console.log("Parametri: " + comando_vecchio);
  //carico l'immagine con parametri selezionati dalla tendina

  img = createImg("data/" + comando_vecchio + ".jpg", function () {
    //regolo grandezza dell'immagine
    if (img.height >= img.width) {
      w = 400;
      y = (w * img.height) / img.width;
    } else if (img.height < img.width) {
      y = 500;
      w = (y * img.width) / img.height;
    }

    let pos = createCanvas(w, y);
    background(0);
    pos.position(windowWidth / 2 - w / 2, 100);

    image(img, 0, 0, w, y);
    img.size(w, y);
    imageReady();

    contatore = 0;

    bodypix = ml5.bodyPix();
    bodypix.segment(img, gotResults);
    //contatore1 = 0;
  });
  //imgNipples = loadImage("data/" + parametri.foto + ".jpg");

  partiConPoseNet();
  img.hide();
  frameRate(1);
}

//Carica PoseNet quando l'immagine è caricata
function imageReady() {
  let options = {
    minConfidence: 0.1,
  };
  //console.log("Entra in ImageReady!!");
  // assegna PoseNet all'immagine
  poseNet = ml5.poseNet(modelReady);
  // This sets up an event that listens to 'pose' events
  poseNet.on("pose", function (results) {
    poses = results;
    console.log(poses);
  });
}

//Rintraccia pose
function modelReady() {
  if (
    parametri.foto != "Seleziona una foto" &&
    parametri.Disegno == false &&
    parametri.Clone == false &&
    pix == 1
  ) {
    select("#status").html("Seleziona un effetto!");
    pix = 0;
  }
  poseNet.singlePose(img);
}

function toppa() {
  image(img, 0, 0, w, y);
  let c = get();
  let d = get();

  if (capezzolo == 2) {
    //Se le pose sono state rilevate
    if (poses != undefined && contatore == 0) {
      //Carico immagine selezionata)
      image(img, 0, 0, w, y);

      //Faccio una copia con get()
      image(c, 0, 0);
      image(d, 0, 0);

      NipDx = createGraphics(w, y);
      NipSx = createGraphics(w, y);

      NipSx.fill(0, 0, 255);
      NipSx.beginShape();
      NipSx.circle(cx, cy, cd);
      NipSx.endShape(CLOSE);

      NipDx.fill(255, 0, 0);
      NipDx.beginShape();
      NipDx.circle(cxDx, cyDx, cdDx);
      NipDx.endShape(CLOSE);

      capezzolo = 3;

      //console.log("cap3");
    }
  } else if (capezzolo == 5) {
    //Posizione shape
    //image(NipSx, sposta1x, sposta1y, w, y);
    //image(NipDx, sposta2x, sposta2y, w, y);

    c.mask(NipSx);
    d.mask(NipDx);

    image(c, sposta2x - cx, sposta2y - cy);
    image(d, sposta1x - cxDx, sposta1y - cyDx);

    //console.log("capUltimo");
    capezzolo = 6;
  }
}

function sketch() {
  censura = createGraphics(w, y);
  censura.noStroke();
  censura.fill(0);
  censura.beginShape();
  censura.rect(0, 0, w, poses[0].pose.leftShoulder.y);
  censura.rect(0, poses[0].pose.rightHip.y + 100, w, y);
  censura.rect(0, 0, poses[0].pose.rightShoulder.x - 30, y);
  censura.rect(poses[0].pose.leftShoulder.x + 30, 0, w, y);
  censura.endShape(CLOSE);

  //immagine di partenza
  image(img, 0, 0);
  //la duplico
  let a = get();

  a.mask(censura);
  filter(POSTERIZE, 10);
  filter(GRAY);
  image(a, 0, 0);
}

function invert() {
  censura = createGraphics(w, y);
  censura.noStroke();
  censura.fill(0);
  censura.beginShape();
  censura.rect(0, 0, w, poses[0].pose.leftShoulder.y);
  censura.rect(0, poses[0].pose.rightHip.y + 100, w, y);
  censura.rect(0, 0, poses[0].pose.rightShoulder.x - 30, y);
  censura.rect(poses[0].pose.leftShoulder.x + 30, 0, w, y);
  censura.endShape(CLOSE);

  //immagine di partenza
  image(img, 0, 0);
  //la duplico
  let a = get();

  a.mask(censura);
  filter(INVERT);
  image(a, 0, 0);
}

function gotResults(err, result) {
  if (err) {
    //console.log(err);
    return;
  }
  segmentation = result;
  console.log(segmentation);
  pix = 1;
}

function colorChange() {
  background(85, 204, 0, 50);
  image(segmentation.personMask, 0, 0, w, y);
}

function colorChangeBack() {
  background(187, 153, 0, 100);
  image(segmentation.backgroundMask, 0, 0, w, y);
}

function save() {
  img.save(parametri.foto + "_uncensored", "jpg");
}

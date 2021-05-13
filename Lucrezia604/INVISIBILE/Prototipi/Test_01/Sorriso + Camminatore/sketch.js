// Rilevamento del sorriso tramite il FaceTraking [Facemesh]
// Sorriso come attivatore di movimento di Camminatori che disegnano
// Laboratorio di Design dei Sistemi Interattivi, a.a. 2020/2021, prof. Daniele Tabellini, Design UNIRSM


let facemesh;  //Variabile facemesh
let video;     //Varibile video webcam
let predictions = [];   //variabile dati rilevamento viso
let smile;              //Variabile rilevamento sorriso

//variabili camminatori
let quadrati = []; // < array di linee
let n = 3; // < numero linee iniziali
let xoff1 = 0;
let xoff2 = 100;

function setup() {
  createCanvas(640, 960);   //crea l'area di stampa
  video = createCapture(VIDEO);  //cattura il video dalla webcam
  video.size(640, 480);          //definisce  la grandezza del video

  facemesh = ml5.facemesh(video, modelReady);   //passa il video a face mesh

  // Setta l'aggiornamento dei dati dal facemesh
  facemesh.on("predict", results => {
    predictions = results;
  });

  // nasconde il secondo elemento video
  video.hide();
  
  // costruisce i camminatori
  for (let i=0; i<n; i++) {
    quadrati.push(new Astronave(i));
  }
}

//stampa in console la scritta model ready a modello pronto
function modelReady() {
  console.log("Model ready!");
}

function draw() {
   
  image(video, 0, 0, 640, 480); //stampa il video

  drawKeypoints();  // stampa i punti rilavati da face mesh
  
  smile = getsmile();   //rileva il sorriso
 
  push();
  
  translate(0); //permette la scia dei camminatori
  
  //se smile > 65 allora i camminatori si spostano
  if(smile > 65) {
     
      // muove i camminatori
      for (var i=0; i<quadrati.length; i++) {
        quadrati[i].spostati();
      }
  }
  
    //mostro i camminatori
    for (var i=0; i<quadrati.length; i++) {
      quadrati[i].mostrati(); 
    }
  pop();
  
  print(smile);  //stampa il valore di smile nella console
}

// Stampa i punti del modello della viso
function drawKeypoints() {
  //recupera i punti per ogni viso
  for (let i = 0; i < predictions.length; i += 1) {
    const keypoints = predictions[i].scaledMesh;

    // stampa i punti del viso
    for (let j = 0; j < keypoints.length; j += 1) {
      const [x, y] = keypoints[j];

      fill(0, 255, 0);
      ellipse(x, y, 5, 5);
    }
  }  
}

//calcola la distanza dei punti della bocca
function getsmile(){
 
  let right = [];
  let left = []; 
  
  //recupera i punti per ogni viso
  for (let i = 0; i < predictions.length; i += 1) {
    const keypoints = predictions[i].scaledMesh;

  let [x, y] = keypoints[61];   //punto sinistro

  right[0] = x;
     
  [x, y] =  keypoints[291];      //punto destro
  left[0] = x;
   
  } 
  return (left[0] - right[0])   //restituisce la distanza dei due punti
}

// definizione della classe quadrato
function Astronave(_id) {

  // posizione iniziale del camminatore
  this.id = _id;
  let x = width/2 + random (-width/5,width/5);
  let y = ((height*1)/4) + random (-height/10,height/10);

  // funzionalità
  //stampa del quadrato
  this.mostrati = function() {
    strokeWeight(1);
    stroke(random(1000), 255, random(800));
    noFill();
    rect(this.x,this.y, 80, 80);
  }

  //movimento casuale del quadratro
  this.spostati = function() {
    let vel = random(0.001);
    
    this.x =  map(noise(x + xoff1), 0, 1, 0, width);
    this.y =  map(noise(y + xoff2), 0, 1, height/2, height);
  
    xoff1 += vel;
    xoff2 += vel;
  }
}

// -
// GRAFICA GENERATIVA _ Risata 0.1 by Lucrezia Nediani [Grafica generativa, FaceMesh]
// 2021 © Lucrezia Nediani, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/Lucrezia604 — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// —
// Help:
// [movimento sopracciglia] cambio colore
// [sorriso] regola la velocità di rotazione e il cambio delle forme
// [tono di voce] regola la dimensione delle forme
// [comando vocale] per accendere dire "Avvia" e per spegnere "Rimuovi"
// —


let facemesh;  //Variabile facemesh
let video;     //Varibile video webcam
let predictions = [];   //variabile dati rilevamento viso
let fattore = [];  //variabile per lo scale del canvas
let smile = 0;              //Variabile rilevamento sorriso
let keypoints;  //variabile dei punti del viso
let naso, occhiodx, occhiosx,bocca; // variabili delle classi
let attivazione = 0; //decide se il filtro è visibile o no
let Go = 0;     //avvio rotazione forme   
let frame = 0;  //variabile velocita
let formecasuali = 0;   //variabile cambio forme e colore casuali
let FormeSimili = 3 //variabile che gestisce i primi tre cambi di forma
let attesa = 10;    //ritarda la presa del sorriso per dare il tempo a facemesh di calibrarsi
let attesacolore = 50
let mic;   //variabile che gestisce il microfono

function setup() {
  createCanvas(windowWidth, windowHeight);   //crea l'area di stampa
  
  angleMode(DEGREES);  //imposta gli angoli in gradi
  colorMode(RGB);      //imposta la gestione di colori al tipo HSB
  
  video = createCapture(VIDEO);  //cattura il video dalla webcam
  video.size((windowHeight/3)*4, windowHeight);          //definisce  la grandezza del video
  fattore[0] = ((windowHeight/3)*4) / 640;  //fattore di scala della x
  fattore[1] = windowHeight/480;  //fattore di scala della y

  //creo le classi
  naso = new nose();   
  occhiodx = new eye();
  occhiosx = new eye();
  bocca = new mouth();
  
  facemesh = ml5.facemesh(video, modelReady);   //passa il video a face mesh

  // Setta l'aggiornamento dei dati dal facemesh
  facemesh.on("predict", results => {
    predictions = results;
  });

  //comandi vocali
  //inizializza il registratore vocale
  var foo = new p5.Speech();
  speechRec = new p5.SpeechRec(gotSpeech);
  let continuous = true;
  let interimResults = true;
  
  // inizializza il lettore del testo
  speechRec.start(continuous, interimResults);
  
  function gotSpeech(speech){
    
    //se viene detto avvia attiva il filtro
    if (speech.text.includes("Avvia") || speech.text.includes("Avvia") ) 
    {
      attivazione = 1;
    }
    
    //se viene detto Rimuovi disattiva il filtro
    if (speech.text.includes("Rimuovi") || speech.text.includes("Rimuovi") ) 
    {
      attivazione = 0
    }  
        
  }
  
  
  mic = new p5.AudioIn();   //creo la classe microfono
  mic.start();  //faccio partire la registrazione
  
  // nasconde il secondo elemento video
  video.hide();
  
}

//stampa in console la scritta model ready a modello pronto
function modelReady() {
  //console.log("Model ready!");
}

function draw() {
  
  translate((windowWidth - ((windowHeight/3)*4))/2, 0);   //centro lo schermo
  
  //let sound;
  image(video, 0, 0, (windowHeight/3)*4, windowHeight); //stampa il video

  FindKeypoints(); //prende da facemesh i punti della faccia
  //drawKeypoints();

  //se non c'è un viso non compare niente
  if(predictions.length)
  {
    if(attivazione == 1)
    {
      smile = getsmile();   //rileva il sorriso
      //getblink();
      geteyebrow();
      sound = getsound();   //rileva il suono
   
      //aggirno l'intensita del suono delle classi
      occhiosx.AggiornaSuono(sound);
      occhiodx.AggiornaSuono(sound);
      naso.AggiornaSuono(sound);
      bocca.AggiornaSuono(sound);
    
      if(formecasuali < 90)
        formecasuali = formecasuali +1;
    
      //cambio forma ogni 90 cicli
      if(formecasuali == 90 && smile > 0.33)
      {
        if(FormeSimili)
        {
          occhiosx.CambiaTipo(occhiosx.tipo + 1);
          occhiodx.CambiaTipo(occhiodx.tipo + 1);   
          naso.CambiaTipo(naso.tipo + 1);
          bocca.CambiaTipo(bocca.tipo + 1);
          FormeSimili = FormeSimili - 1;
        }
        else
        {
          occhiosx.CambiaTipo(int(random(3)));
          occhiodx.CambiaTipo(int(random(3)));   
          naso.CambiaTipo(int(random(3)));
          bocca.CambiaTipo(int(random(3)));         
        }
        formecasuali = 0;
      }    
    
      //esegue i controlli sul viso
      controllaforme();

      scale(fattore[0], fattore[1]);  //faccio lo scale delle forme alla nuova finestra  
    
      //stampa le forme sul viso
      stampaforme();

      //se ho sorriso almeno una volta le forme girano
      if(Go == 1)
      {    
        //map aumenta in modo omogeneo il valore del sorriso
        frame = frame + map(smile, 0.24, 0.37, 0.3, 2);
        
        occhiodx.CambiaVelocità(frame);
        occhiosx.CambiaVelocità(frame);
        naso.CambiaVelocità(frame);
      }

      //se smile > 0.33 allora le forme iniziano a ruotare
      if(smile > 0.33) {
        if(Go == 0)
        {
          Go = 1;
        }
      }
    }
  }

}

// trova i punti del modello della viso
function FindKeypoints() {
  //recupera i punti per ogni viso
  for (let i = 0; i < predictions.length; i += 1) {
    keypoints = predictions[i].scaledMesh;
  }
     
}

//calcola la distanza dei punti della bocca
function getsmile(){
 
  let right = [];
  let left = []; 
  let Normal = [];
  let temp1;
  let temp2;
  let Norm1;
  let Norm2;
  
  //recupera i punti per ogni viso
  if(predictions.length && attesa <= 0)
    {
    //for (let i = 0; i < predictions.length; i += 1) {
    //  keypoints = predictions[i].scaledMesh;
    //}
    let [x, y] = keypoints[61];   //punto sinistro

    right[0] = x;
    right[1] = y;    
     
    [x, y] =  keypoints[291];      //punto destro
    left[0] = x;
    left[1] = y;
    
    [x, y] =  keypoints[10];      //punto destro  
    Normal[0] = x;
    Normal[1] = y;
    
    [x, y] =  keypoints[152];      //punto destro  
    Normal[2] = x;
    Normal[3] = y;    
    
  
    temp1 = createVector(left[0],left[1]);
    temp2 = createVector(right[0],right[1]);
  
    Norm1 = createVector(Normal[0],Normal[1]);
    Norm2 = createVector(Normal[2],Normal[3]);  
  
    Norm1 = Norm1.dist(Norm2);
    
    temp1 = temp1.dist(temp2);
  
    return (temp1/Norm1)   //restituisce la distanza dei due punti
    }
  else
    attesa = attesa -1;
}

//prende la voce dal microfono
function getsound()
{
  //prende la voce solo se le forme girano
  if(Go == 1)
    {
      let vol = mic.getLevel();
      //cambia il volume in grandezza in pixel
      vol = map(vol*8, 0, 1, 0, 35 * (fattore[0] * 0.55));
      return vol;
    }
  return 0;
}

//prende lo spostamento delle sopracciglia
function geteyebrow()
{
  let temp1;
  let temp2;
  let temp3;
  let temp4;
  let Normal = [];
  let Norm1;
  let Norm2;  
  
  if(predictions.length && attesacolore == 0)
    {

      let [x,y,z] = keypoints[52];
      let [j,i,p] = keypoints[282];
      let [l,o,m] = keypoints[4];
      
      temp1 = (x + j)/2;
      temp2 = (y + i)/2;
      temp4 = (z + p)/2;
      temp1 = createVector(temp1, temp2, temp4);
      temp3 = createVector(l,o,m);
      
      [x, y, z] =  keypoints[10];      //punto destro  
      Normal[0] = x;
      Normal[1] = y;
      Normal[2] = z;
    
      [x, y, z] =  keypoints[152];      //punto destro  
      Normal[3] = x;
      Normal[4] = y;
      Normal[5] = z;     
      
      Norm1 = createVector(Normal[0],Normal[1], Normal[2]);
      Norm2 = createVector(Normal[3],Normal[4], Normal[5]);  
      
      Norm1 = Norm1.dist(Norm2);
      temp1 = temp1.dist(temp3);
      
      if( ((temp1/Norm1) > 0.36) )
        {
          occhiodx.RandomColor();
          occhiosx.RandomColor();
          bocca.RandomColor();
          naso.RandomColor();
          attesacolore = 50;         
        }
      
    }
  else if(predictions.length)
    attesacolore = attesacolore - 1;  
}

function controllaforme()
{
  //se non c'è un viso non faccio niente
  if(predictions.length)
  {  
    //calcolo le dimensioni delle forme rispetto alla grandezza del viso
    let [x,y] = keypoints[175];
    let [j,i] = keypoints[151];  
    
    occhiodx.Cambiagrandezza((y-i)/5);
    occhiosx.Cambiagrandezza((y-i)/5); 
    naso.Cambiagrandezza((y-i)/8);
    bocca.Cambiagrandezza((y-i)/3);
    //fine calcolo grandezza
   
    // posizione occhio destro
    [x,y] = keypoints[230];
    [j,i] = keypoints[223];
    occhiodx.Aggiornaposizione(x ,y);
    
  
    // posizione occhio sinistro
    [x,y] = keypoints[450];
    [j,i] = keypoints[443];
    occhiosx.Aggiornaposizione(x,y);
    
    
    // posizione naso
    [x, y] = keypoints[19];
    naso.Aggiornaposizione(x,y);
    
    // posizione bocca superiore
    [x,y] = keypoints[13];
    bocca.Aggiornaposizione1(x,y);  
    
    // posizione bocca inferiore
    [x,y] = keypoints[14];
    bocca.Aggiornaposizione2(x,y); 
  }
}

//stampa le forme
function stampaforme(){
    if(predictions.length)
    {
      
      //occhio destro
      occhiodx.stampaocchio();
      
      //occhio destro
      occhiosx.stampaocchio(); 
      
      //naso
      naso.stampanaso();      
      
      bocca.stampabocca();
    }
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
    
    if(predictions.length)
    {
      // Draw facial keypoints.
      for (let j = 0; j < keypoints.length; j += 1) {
        const [x, y] = keypoints[j];

        fill(0, 255, 0);
        noStroke();
        ellipse(x, y, 5, 5);
      }
    }
   
}

// -
// DISTORSORE VOCALE 0.1 by Lucrezia Nediani [Grafica generativa, FaceMesh]
// 2021 © Lucrezia Nediani, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/Lucrezia604 — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// —
// Help:
// [registra] registra la voce
// [riproduci] riproduce la voce distorta
// [reverse] riproduce la voce distorta in reverse
// [velocità] regola la velocità di riproduzine
// [balance] 
// —


let mic;  //variabile microfono
let attivo;  //indica se la registrazione è attiva
let registrazione;  //variabile del recorder
let suono;  //variabile dell'audio registrato
let b1;  //bottone registra
let b2;  //bottone Riproduci
let b3;  //bottone reverse
let s1;  //variabile slider

function setup() {

  attivo = 0;   //controlla lo stato del microfono
  Rev = 0;
  
  createCanvas(windowWidth, windowHeight);
  
  mic = new p5.AudioIn();   //crea l'input dal microfono

  mic.start(); //attiva il microfono
  
  registrazione = new p5.SoundRecorder();   //crea il registratore
  registrazione.setInput(mic);  //setta l'input del registratore
  
  suono = new p5.SoundFile();   //crea il suono dove registriamo.
  
  b1=createButton("Registra");    //crea bottone registra
  b1.mousePressed(Registra);    //chiama la funzione alla pressione del pulsante  
  b1.position(windowWidth/2 - 170, (windowHeight/2) + 130);
  
  b2=createButton("Riproduci");   //crea bottone Riproduci
  b2.mousePressed(Riproduci)    //chiama la funzione alla pressione del pulsante  
  b2.position(windowWidth/2 - 40, (windowHeight/2) + 130);
  
  b3=createButton("Reverse");   //crea bottone Riproduci
  b3.mousePressed(Reverse)    //chiama la funzione alla pressione del pulsante  
  b3.position(windowWidth/2 + 90, (windowHeight/2) + 130);
  
  textSize(20);
  textAlign(CENTER);

  
  s1 = createSlider(0.1,1.9,1.0,0);  //crea lo slider della velocità
  s1.position(windowWidth/2 - 70,(windowHeight/2) - 50);

  s2 = createSlider(-1.0,1.0,0.0,0);  //crea lo slider del pan
  s2.position(windowWidth/2 - 70,(windowHeight/2) + 70);

  
}

//fa partire la registrazione del suono
function Registra(){
  if(attivo == 0)
    {
      attivo = 1;  //disalbilito il pulsante se la registrazione è già partita
      registrazione.record(suono);   //fa partire la registrazione
      b1.html('Stop Registrazione');
      b1.mousePressed(StopRegistra);
    }
}

//ferma la registrazione del suono
function StopRegistra(){
  if(attivo == 1)
    {
      attivo = 0; //disalbilito il pulsante se la registrazione si è fermata
      registrazione.stop();   //ferma la registrazione
      b1.html('Registra');
      b1.mousePressed(Registra);
    }
}
 //riproduce il suono registrato
function Riproduci(){
  suono.connect();   //connette il suono alle casse del pc
  suono.rate(s1.value());   //aumenta la velocità del suono (e quindi cambia la tonalità)
  
  if(Rev)  //se richiesto inverte il suono
    suono.reverseBuffer();
  
  suono.pan(s2.value()); //pan del suono
  
  suono.play(); //fa partire il suono;
  
  b2.html('Ferma Riproduci');
  b2.mousePressed(FermaRiproduci);    //chiama la funzione alla pressione del pulsante 
  
}

 //Ferma il suono registrato
function FermaRiproduci(){
  suono.disconnect();   //disconnette il suono alle casse del pc
  suono.stop(); //ferma il suono;
  b2.html('Riproduci');
  b2.mousePressed(Riproduci) 
  
}

//setta la variabile di inversione
function Reverse(){
  if(Rev == 0){
    Rev = 1;
    b3.html('Stop Reverse');
  }
  else{
    Rev = 0;
    b3.html('Reverse');
  }
}

function draw(){
  
  background(220);
  fill(51);
  text('Velocità', windowWidth/2, (windowHeight/2) - 70);
  
  text('+', windowWidth/2 + 75, (windowHeight/2) - 35);
  text('-', windowWidth/2 - 85, (windowHeight/2) - 37);
  
  
  text('Balance', windowWidth/2, (windowHeight/2) + 30);
  
  text('d', windowWidth/2 + 80, (windowHeight/2) + 85);
  text('s', windowWidth/2 - 88, (windowHeight/2) + 85);  
  
  if(!suono.isPlaying())  //resetta il suono alla fine riproduzione
    FermaRiproduci();
  
}

// Distorsione vocale [sound reference p5.js]
// La voce viene modificata
// Laboratorio di Design dei Sistemi Interattivi, a.a. 2020/2021, prof. Daniele Tabellini, Design UNIRSM

// From --> 


let mic;
let attivo;
let registrazione;
let suono;
let b1;
let b2;

function setup() {

  attivo = 0;   //controlla lo stato del microfono
  
  mic = new p5.AudioIn();   //crea l'input dal microfono

  mic.start(); //attiva il microfono
  
  registrazione = new p5.SoundRecorder();   //crea il registratore
  registrazione.setInput(mic);  //setta l'input del registratore
  
  suono = new p5.SoundFile();   //crea il suono dove registriamo.
  
  b1=createButton("Registra");    //crea bottone registra
  b1.mousePressed(Registra);    //chiama la funzione alla pressione del pulsante  
  b2=createButton("Stop Registrazione");   //crea bottone Stop Registrazione
  b2.mousePressed(StopRegistra);   //chiama la funzione alla pressione del pulsante  
  b3=createButton("Riproduci");   //crea bottone Riproduci
  b3.mousePressed(Riproduci)    //chiama la funzione alla pressione del pulsante  
  b4=createButton("Ferma Riproduci");   //crea bottone Riproduci
  b4.mousePressed(FermaRiproduci);    //chiama la funzione alla pressione del pulsante  
}

//fa partire la registrazione del suono
function Registra(){
  if(attivo == 0)
    {
      attivo = 1;  //disalbilito il pulsante se la registrazione è già partita
      registrazione.record(suono);   //fa partire la registrazione
    }
}

//ferma la registrazione del suono
function StopRegistra(){
  if(attivo == 1)
    {
      attivo = 0; //disalbilito il pulsante se la registrazione si è fermata
      registrazione.stop();   //ferma la registrazione
    }
}
 //riproduce il suono registrato
function Riproduci(){
  suono.connect();   //connette il suono alle casse del pc
  suono.rate(2.0);   //aumenta la velocità del suono (e quindi cambia la tonalità)
  suono.play(); //fa partire il suono;
  
}

 //Ferma il suono registrato
function FermaRiproduci(){
  suono.disconnect();   //disconnette il suono alle casse del pc
  suono.stop(); //ferma il suono;
 
}
// -
// CAMBIO CURSORE 0.1 by Lucrezia Nediani 
// 2021 © Lucrezia Nediani, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/Lucrezia604 — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// https://p5js.org/reference/#/p5/cursor
// —
// Help:
// [registra] dicendo "cambio" si cambia immagine del cursore
// [clicca] con il clic del mouse si avrà un suono corrispondente all'immagine
// —

//https://p5js.org/reference/#/p5/cursor
var arr;
var i = 0;
var attesa = 20;
let mySound1, mySound2, mySound3;

function preload(){
  
  soundFormats('mp3', 'ogg');  
  
  //carico i suoni
  mySound1 = loadSound('Trombetta.mp3');
  mySound2 = loadSound('Batteria.mp3');
  mySound3 = loadSound('Chitarra.mp3');  
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  arr = ['tromba.png', 'batteria.png', 'chitarra.png']; //immagini cursore

  arr2 = [mySound1, mySound2, mySound3]; //suoni 
  
  //comandi vocali
  var foo = new p5.Speech();
  speechRec = new p5.SpeechRec(gotSpeech);
  let continuous = true;
  let interimResults = true;
  
  //inizializzo il lettore del testo
  speechRec.start(continuous, interimResults);
  
  function gotSpeech(speech){
    
    //se viene detto cambia cambia la forma del cursore
    if ((speech.text.includes("Cambia") || speech.text.includes("cambia")) && attesa <= 0 ) 
    {  
      i++;
      attesa = 20;
      //print (attivazione)
    }
  
  }  
  
}

//alla pressione del mouse il cursore produce un suono
function Pressed() {
  
  if(!arr2[i].isPlaying())  //evita che il suono sia suonato continuamente
    arr2[i].play();
  
  return false
}

//al rilascio del mouse ferma i suoni
function mouseReleased() {
  
  let j;
  
  //ferma tutti i suoni 
  for(j = 0; j < arr2.length; j++){
    
    arr2[j].stop();
  }
  
  return false
}

function draw() {
  background(255)   //schermo bianco

  //evita il cambio continuo del cursore per fluttuazioni del riconoscimento vocale
  if(attesa > 0)   
    attesa = attesa - 1;
  
  cursor(arr[i]);   //cambia il cursore
  
  //se siamo arrivati in fondo torno all'inizio
  if(i >= arr.length){
    i=0;
  }
  
  if(mouseIsPressed)
    Pressed();
  
}


// -
// INSEGUIMENTO CURSORE 0.1 by Lucrezia Nediani [reference p5.js]
// 2021 © Lucrezia Nediani, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/Lucrezia604 — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// —
// Help:
// insegui il quadrato col cursore per farlo suonare
// —

let pos = [];  //posizione quadrato
let dim = 30;  //dimensione del quadrato
let fadeDist = 200;  //distanza entro la quale si attiva il suono
let vel = [];  //velocità orizzontale e verticale del quadrato
let volume;  //volume del suono
let Vmax;  // velocità massima
let Vmin;  //velocità minima
let mySound;  //variabile oggetto suono

function preload(){
   soundFormats('mp3', 'ogg');  
  
   mySound = loadSound('Trombetta.mp3');   //carico il suono
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  rectMode(CENTER);  //stampo il quadrato dal centro
  
  //posizione iniziale
  pos[0] = windowWidth/2;
  pos[1] = windowHeight/2;
  
  //velocità iniziale
  vel[0] = round(random(5,15));
  vel[1] = round(random(5,15));
  
  Vmax = 8;
  Vmin = 3;
}

function draw() {
  background(220);
  
  muovi();  //muovo il quadrato
  
  rect(pos[0], pos[1], dim);  //disegno il quadrato
  
  //se il quadrato è colpito suono il suono
  if(colpito())
    {
      if(!mySound.isPlaying())
        mySound.play();
    }
  else
    mySound.stop();  //altrimenti fermo il suono
  
}

function muovi(){
  
  //sposto il quadrato in base alla velocità 
  pos[0] = pos[0] + vel[0];  
  pos[1] = pos[1] + vel[1];
  
  //controllo se tocca i bordi in X 
  if((pos[0] >= (windowWidth - dim/2)) || (pos[0] <= (0 + dim/2)) )
    {
      if(pos[0] >= windowWidth - dim/2)  //bordo destro
        {
          pos[0] = windowWidth - 1 - dim/2;  //metto sul bordo
          vel[0] = round(random(-Vmax,-Vmin) + 1)  //velocità opposta
        }
      else  //bordo sinistro
        {
          pos[0] = dim/2 + 1;   //metto sul bordo
          vel[0] = round(random(Vmin,Vmax) - 1) //velocità opposta
        }
    }

  //controllo se tocca i bordi in Y
  if( (pos[1] >= (windowHeight - dim/2))|| (pos[1] <= (0 + dim/2) ) )
    {
      if(pos[1] >= windowHeight - dim/2) //bordo basso
        {
          pos[1] = windowHeight - 1 - dim/2;  //metto sul bordo
          vel[1] = round(random(-Vmax,-Vmin) + 1)  //velocità opposta
        }
      else //bordo alto
        {
          pos[1] = dim/2 + 1;  //metto sul bordo
          vel[1] = round(random(Vmin,Vmax) - 1)  //velocità opposta
        }
    }  
  
}

function colpito(){
  
  let x = 0;
  let y = 0;
  
  //controllo se sono vicino in x
  if( (mouseX <= (pos[0] + dim/2 + fadeDist)) && (mouseX >= (pos[0] - fadeDist - dim/2)) )
    x = 1;
  
  //controllo se sono vicino in y
  if( (mouseY <= (pos[1] + fadeDist + dim/2)) && (mouseY >= (pos[1] - fadeDist- dim/2)) )
    y = 1;
  
  //calcolo la distanza dal cursore
  volume = abs(dist(mouseX, mouseY, pos[0], pos[1]));
  
  //mappo la distanza in un valore di volume sonoro
  if(volume >= (dim) )
    volume = map(volume, dim + fadeDist, dim , 0.2,1.0);
  else
    volume = 1.0;
  
  mySound.setVolume(volume);  //setto il volume
  
  //dico se il quadrato è colpito o no
  if( x == 1 && y == 1)
    return true;
  else
    return false;
  
}
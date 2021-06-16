// The RiTa lib is included in index.html
// The text files are files in the project

let lines, markov;
let x = 85, y = 255;
title="Rock Poem";

citazione1="You can't always get what you want, but if you try sometimes, you might find, you get what you need."

citazione2="Excuse me while I kiss the sky"

let cit=[];



function preload() {
//il testo deve essere abbastanza lungo, perchè sennò la macchina avrà problemi ad apprendere lo stile di scrittura 
  txt1 = loadStrings('rolling_stones.txt');//crea variabili con dentro le stringhe
 
  txt2 = loadStrings('kiss.txt');
  
  txt3 = loadStrings('motley_crue.txt');
  
  txt4 = loadStrings('deep_purple.txt');
  
  txt5 = loadStrings('guns_n_roses.txt');
  cit=[ txt1, txt2, txt3, txt4, txt5];
  //console.log(cit);
  
  fiamme = loadImage("fiamme.png");
}



function setup() {

  createCanvas(800, 600);
  textFont('Alfa Slab One', 16);
  textLeading(21);//questo è il kerning
  textAlign(LEFT);
  

  
  lines = ["click to (re)generate"];
  
  // create a markov model w' n=4
  markov = RiTa.markov(2);//n di scelte dei token successivi, aumenta la complessità della frase

  // load text into the model
  markov.addText(random(cit)); //Math
  markov.addText(random(cit));

  drawText();
}

function drawText() {
  background(50, 30, 40);
  //image(fiamme, 0, 0, 800, 600);
  fill(220);
  textFont('Roboto', 18);
  text(lines.join(' '), x, y, 420, 440);
  textSize(55);
  textFont('Alfa Slab One');
  text("Rock Poem", 80, 150);
  //fill(255, 204, 0);
  //line(80, 140, 520, 140);
  
}

function mouseClicked() {
lines = markov.generate(4); //n di linee
  drawText();
}

  
 





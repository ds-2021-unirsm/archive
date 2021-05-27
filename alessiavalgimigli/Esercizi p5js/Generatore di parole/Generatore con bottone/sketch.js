// -
// Generatore di parole 0.1 by Alessia Valgimigli [generatore, parole]
// 2021 © Alessia Valgimigli, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// —

let dizionario = ["pallone", "astuccio", "penna", "bottiglia", "padella", "sale", "ciotola", "tavolo", "finestra", "casa", "cellulare", "bicchiere", "montagna", "tramonto", "codice", "università", "divano", "viola", "prato", "correre", "saltare", "inginocchiarsi", "lavare", "pulire", "studiare", "percorrere"];

let lettere = [];
let parolaNuova = [];
let parolafinale = [];
let button;

function setup() {
  createCanvas(windowWidth, windowHeight);
  button = createButton('GENERA LA PAROLA');
  let colButton = color(0,61,255);
  let colText = color(255);
  button.position(270, 300);
  button.mousePressed(generaParola);
  button.style("background-color", colButton);
  button.style("color", colText);
}

function draw() {
  background(255);
  translate(windowWidth / 2, windowHeight / 2);
  textSize(30);
  textAlign(CENTER);

  //estrae una parola
  let estrazione = random(dizionario);
  print("parola estratta: " + estrazione);
  text(estrazione, 0, 0);
  
  //separa le lettere della parola
  let separazione = split(estrazione, "");
  print("queste sono le lettere separate: "+ separazione); 
  
   for (let i = 0; i <= separazione.length - 1; i++) {
    append(parolaNuova, separazione[i]);
    //mescola gli elementi dell'array
    parolaNuova = sort(parolaNuova, separazione.length - 1);

    //toglie le virgole
    let separator = "";
    parolaFinale = join(parolaNuova, separator);
  }
  
  print("sono la parola nuova: " + parolaFinale);
  noLoop();

}

function generaParola() {
 text(parolaFinale, 0, 130);
}

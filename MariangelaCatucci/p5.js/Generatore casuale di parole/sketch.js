// Generatore di parole 0.1 by Mariangela Catucci [parole, colore, frasi]
// 2021 © Mariangela @MariangelaCatucci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// —

var button;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(225, 0, 0, 10);
  
  button = createButton('Nome');
  button.position((windowWidth/2) - ((windowWidth/2)/2), windowHeight/2);
  button.mousePressed(nomi);
  
  button = createButton('Verbo');
  button.position((windowWidth/2) , windowHeight/2);
  button.mousePressed(verbi);

  button = createButton('Complemento');
  button.position((windowWidth/2) + ((windowWidth/2)/2), windowHeight/2);
  button.mousePressed(complementi);
  
  button = createButton('Reset');
  button.position(windowWidth/2, (windowHeight/2) + 200);
  button.mousePressed(reset);
  
}

function nomi(){
  let elenco_nomi = ['Gatto', 'Alberto', 'Bicchiere', 'Giovanni', 'Estate', 'Piatto', 'Albero','Chiara', 'Vaso', 'Acqua', 'Computer', 'Balcone', 'Scatola', 'Tonno', 'Luigi', 'Piazza', 'Anna', 'Angela', 'Carlo'];
  let nome = random(elenco_nomi);
  textSize(18);
  textAlign(LEFT);
  text(nome, (windowWidth/2) - ((windowWidth/2)/2), (windowHeight/2) - 100); 
  textFont('arial')
}

function verbi(){
  let elenco_verbi = ['sarà', 'è', 'mangia', 'beve', 'si lava', 'fa', 'è andato/a', 'salito/a', 'vedrà', 'cammina', 'scrive', 'consuma', 'presenterà', 'ha cucinato', 'ha fatto', 'piange', 'aveva provato', 'nuota'];
  let verbo = random(elenco_verbi);
  textSize(18);
  textAlign(LEFT);
  text(verbo, (windowWidth/2), (windowHeight/2) - 100);
  textFont('arial')
}

function complementi(){
  let elenco_complementi = ['sera', 'cosa', 'pane', 'domani', 'sopra', 'sotto', 'felice', 'nero', 'acido', 'interessante', 'brutto', 'importante', 'trsite', 'incomprensibile'];
  let complemento = random(elenco_complementi);
  textSize(18);
  textAlign(LEFT);
  text(complemento, (windowWidth/2) + ((windowWidth/2)/2), (windowHeight/2) - 100);
  textFont('arial')
}

function reset () {
 background(random(255),random(255), random(255));
}

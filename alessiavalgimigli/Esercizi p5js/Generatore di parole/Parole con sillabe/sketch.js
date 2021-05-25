// -
// Generatore di parole con sillabe 0.1 by Alessia Valgimigli [generatore, parole]
// 2021 © Alessia Valgimigli, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// —

let sillabe = ["ba", "be", "bi", "bo", "bu", "ca", "ce", "ci", "co", "cu", "cra", "cre", "cri", "cro", "cru", "che", "chi", "da", "de", "di", "do", "du", "fa", "fe", "fi", "fo", "fu", "ga", "ge", "gi", "go", "gu", "ghe", "ghi", "gra", "gre", "gri", "gro", "gru", "la", "le", "li", "lo", "lu", "ma", "me", "mi", "mo", "mu", "na", "ne", "ni", "no", "nu", "pa", "pe", "pi", "po", "pu", "pra", "pre", "pri", "pro", "pru", "qu", "ra", "re", "ri", "ro", "ru", "sa", "se", "si", "so", "su", "ta", "te", "ti", "to", "tu", "tra", "tre", "tri", "tro", "tru", "va", "ve", "vi", "vo", "vu", "za", "ze", "zi", "zo", "zu",  ];

let parola=[];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  translate(windowWidth/2, windowHeight/2);
  textSize(30);
  textAlign(CENTER);

  let numeroSillabe = random(1, 5);
   // let estrazione = random(sillabe);
  
  for (var s=0; s<=numeroSillabe; s++) {
    let estrazione = random(sillabe);
    
    //inserisce la parola nell'array
    append(parola, estrazione);
  }
  
  let separatore = "";
  
  //unisco le diverse stringhe dell'array in un'unica stringa
  //il separatore mi permette di non avere virgole tra una sillaba e l'altra
  let parolaComposta = join(parola, separatore);
  
  //stampo la parola
  text(parolaComposta, 0, 0);  

  noLoop();
}


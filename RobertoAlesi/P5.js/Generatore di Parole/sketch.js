// -
// Generatore_di_parole 0.1 by Roberto [generatore, parole]
// 2021 © Roberto @ciunart, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete — github.com/RobertoAlesi
// Educational purposes, MIT License, 2021, San Marino
// —

var consonanti = ["b", "c", "d", "f", "g", "h", "l", "m", "n", "p", "q", "r", "s", "t", "v", "z"];
var vocali = ["a", "e", "i", "o", "u"];
var estrazione;
var parola = "";
var stock = [];
var voce = new p5.Speech('it-IT');


function setup() {
  createCanvas(windowWidth, windowHeight);

  textSize(30);
}

function draw() {

  background(0);

  //ogni 60 frame scrive una nuova parola
  if (frameCount % 10 == 0) {
    parola = "";
    var sillabe = int(random(1, 5));
    for (var i = 0; i < sillabe; i++) {
      quale = int(random(consonanti.length - 1)); //estraggo una consonante a caso e metto meno uno per farlo rimanere all'interno dellarray, visto che inizia a contare da zero
      parola += consonanti[quale];
      quale = int(random(vocali.length - 1));
      parola += vocali[quale];
    }
    stock.push(parola);

    voce.setLang('it-IT');
    voce.setPitch('2');
    voce.speak(parola);
  }



  fill(255);
  var posy = 0;
  textAlign(LEFT);

  var x = 0;
  for (y = 0; y < stock.length; y++) {
    text(stock[y], x, posy + 25);
    posy += 30;
    if (posy >= windowHeight) {
      x += 150;
      posy = 0;
    }

  }
  
  noStroke();
  fill(255);
  rect(0, windowHeight / 2 - 50, windowWidth, 80);

  fill(0);
  textAlign(CENTER);
  text(parola, width / 2, height / 2);

}

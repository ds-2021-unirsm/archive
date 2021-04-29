var consonanti = ["b", "c", "d", "f", "g", "h", "l", "m", "n", "p", "q", "r", "s", "t", "v", "z"];
var vocali = ["a", "e", "i", "o", "u"];
var estrazione;
var parola = "";
var stock = [];


function setup() {
  createCanvas(windowWidth, windowHeight);

  textAlign(CENTER);
  textSize(30);
}

function draw() {
  background(220);

  //ogni 60 frame scrive una nuova parola
  if (frameCount % 60 == 0) {
    parola = "";
    var sillabe = int(random(1, 5));
    for (var i = 0; i < sillabe; i++) {
      quale = int(random(consonanti.length - 1)); //estraggo una consonante a caso e metto meno uno per farlo rimanere all'interno dellarray, visto che inizia a contare da zero
      parola += consonanti[quale];
      quale = int(random(vocali.length - 1));
      parola += vocali[quale];
    }
    stock.push(parola);

    //console.log(stock);
  }

  text(parola, width / 2, height / 2);
  

  var posy = 0;
  textAlign(LEFT);
  
    var x=0;
    for (y = 0; y < stock.length; y++) 
    {
      text(stock[y], x, posy + 25);
      posy += 30;
      if(posy>=windowHeight)
        {
        x+=150;
        posy=0;
        }
        
    }
  
}
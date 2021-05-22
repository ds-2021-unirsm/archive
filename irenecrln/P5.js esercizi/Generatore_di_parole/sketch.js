var consonanti = ["b", "c", "d", "f", "g", "h", "l", "m", "n", "p", "q", "r", "s", "t", "v", "z"];
var vocali = ["a", "e", "i", "o", "u"];
var estrazione;
var parola = "";
var stock = [];
margin=320;

function preload() {
  frank = loadFont('FranklinGothic.ttf');
  
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);
  textSize(20);
  textFont(frank);
  
  //myDiv = createDiv('Vocabolario Dadaista 👁👄👁');
  //myDiv.position(0, 0);
  //myDiv.style('z-index', 10);
  
}

function draw() {
  background(255);
  //ogni 60 frame scrive una nuova parola
  if (frameCount % 60 == 0) {
    parola = "";
    var sillabe = int(random(1, 5));
    for (var i = 0; i < sillabe; i++) {
      quale = int(random(consonanti.length - 1)); //estraggo una consonante a caso e metto meno uno per farlo rimanere all'interno dell'array, visto che inizia a contare da zero
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
  
  noStroke();
  fill(217, 181, 232,60);
  
  rect(margin, windowHeight / 2 - 50, 170, 80);

  fill(0);
  textAlign(CENTER);
  text(parola, width / 2, height / 2);
  
}

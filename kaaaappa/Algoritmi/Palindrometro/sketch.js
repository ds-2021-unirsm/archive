let result;
let parola;
let invertita;
let lettere;
let a = 0;
function preload() {
  result = loadStrings("bifronte.txt");
}

function setup() {
  
  parola = random(result);
  createCanvas(650, 500);
  background(0);
  
  

  fill(0, 102, 153);
  textSize(75);
  textFont("Gotham");
  textStyle(BOLD);
  textAlign(CENTER);
  text("Palindrometro", 10, 50, 650, 500);
  lettere = parola.split("");
  for (let i= 0; i < lettere.length; i++){
    a++
  }
  print(a);
  print(lettere);
  
  invertita = parola.split("").reverse().join("");
  //line(56, 125, 85, 75);
  
  input = createInput();
  input.position(50, 350);

  button = createButton("aggiungilo");
  button.position(input.x + input.width, 350);
  button.mousePressed(aggiungi);

  risultato = createElement('h2', parola+" "+invertita);
  risultato.position(50, 200);

}

function aggiungi() {
  const x = input.value();
  y = x.split("").reverse().join("");
  risultato.html(parola+x+"  "+y+invertita);
  input.value('');
}

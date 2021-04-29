let consonanti = ['b','c','d','f','g','h','l','n','p','qu','r','s','t','v','z'];
let vocali = ['a','e','i','o','u'];
let cost
let onomatopea = "";
let parola = "";
let val1;
let val2;
let val3;

function setup() {
  background(255);
  createCanvas(windowWidth, windowHeight);
  textFont("Arial", 100);
  textAlign(CENTER);
}

function draw() {
  background(val1, val2, val3);
  
  if (frameCount % 100 == 0) {
  val1 = random(200,255);
  val2 = random(200,255);
  val3 = random(200,255);
  parola = random(consonanti) + random(vocali) + random(consonanti) + random(vocali);
  cost = random(consonanti) + random(vocali);
  onomatopea = cost + cost;
  }
  noStroke();
  fill(val1, val2, val3);
  rect(0,0,width/2,height);
  fill(val3, val2 + 10, val1);
  rect(width/2,0,width/2,height);
  fill(0);
  text(" | ", width/2 , height/2);
  text(parola, width/2/2 , height/2);
  text(onomatopea, width/2+width/2/2, height/2);
}
let objectDetector;

let img;
let objects = [];
let status;
parole=[];

/////////////rita
let  grammar, lines, json, r;

function preload() {
  //font = loadFont("Resagokr.otf");
  img = loadImage('images/cat.JPG');
  json = loadJSON("haiku.json");
}


function setup() {
  createCanvas(640, 420);
  objectDetector = ml5.objectDetector('cocossd', modelReady);
  
  textSize(10);
  grammar = RiTa.grammar(json);//segue le regole date dal json caricato, quindi lì si trovano le regole e vengono "tradotte" e messe dentro grammar 
  lines = ["click to", "generate", "a haiku"];

}

// Change the status when the model loads.
function modelReady() {
  console.log("model Ready!")
  status = true;
  console.log('Detecting') 
  objectDetector.detect(img, gotResult);
}

// A function to run when we get any errors and the results
function gotResult(err, results) {
  if (err) {
    console.log(err);
  }
  console.log(results)
  objects = results;
  for (let i = 0; i < objects.length; i++) {//mi faccio un array con le parole trovate
  parole.push(objects[i].label);
    console.log(parole);
  }
}


function draw() {
  // unless the model is loaded, do not draw anything to canvas
  if (status != undefined) {
    image(img, 0, 0);
    background(217, 181, 232,90);

    for (let i = 0; i < objects.length; i++) {
      noStroke();
      fill(153,0,255);
      textStyle(BOLD);
      textSize(20);
      text(lines[0], width -610, 75); //la prima cifra è la distnza sinistra dalla canvas, l'ultima cifra è l'interlinea
  text(lines[1], width-610, 110);
  text(lines[2], width -610, 145);

      //noFill();
      //strokeWeight(4);
      //stroke(0, 255, 0);
      //rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }
}


function mouseReleased() {
  let result = grammar.expand();
  let haiku = result.split("%");//splitta la frase ogni volta che nel json legge %
  for (let i = 0; i < lines.length; i++) {
    lines[i] = haiku[i];
    var word= RiTa.tokens(lines[i]); //spezzo la frase(line) in singole parole
    console.log(word + ' sono token');
    var pos = RiTa.pos(word);//faccio l'analisi della frase tokenizzata
    console.log(pos + ' sono pos');
    //var output='';
    for (var j = 0; j < pos.length; j++) {//mi giro gli element. grammaticali 
      if (pos[j] === "nn") { //se è un nome
        for (r; r <parole.length;) {
        word[j]=parole[r]; 
          console.log(word[j] + ' nuova parola');
          (lines[i])=RiTa.untokenize(word);
          break;
        }
      } else{
        continue;
      }
       r++;
    }
    r=0;
    console.log(lines[i] + ' sono untokenize');
  }
}
//  ______  ____  ___  
//  __/ _ \/ __ \/ _ )
//  _/ , _/ /_/ / _  / 
//  /_/|_|\____/____/ 
//
// -
// WordCloud 0.1 by Roberto [word, cloud, 3d]
// 2021 © Roberto @ciunart, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm
// github.com/ds-2021-unirsm — github.com/fupete — github.com/RobertoAlesi
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to: 
// Sentiment Analysis API & Entity Extraction, Dandelion API for
// https://dandelion.eu
// original license: v.2 - 02/Sep/2013
// —
// 

var bonne;
var input;
var button;
var r = 0;

//tiene il conto di quante parole scrive in mezzo
var conta = 0;

var testo = "Hamlet Hamlet Late at night, guards on the battlements of Denmark's Elsinore castle are met by Horatio, Prince Hamlet friend from school. The guards describe a ghost they have seen that resembles Hamlet's father, the recently-deceased king. At that moment, the Ghost reappears, and the guards decide to tell Hamlet. Claudius, Hamlet's uncle, married Hamlet's recently-widowed mother, becoming the new King. Hamlet continues to mourn for his father's death and laments his mother's lack of loyalty. When Hamlet hears of the Ghost, he wants to see it for himself. Elsewhere, the royal attendant Polonius says farewell to his son Laertes, who is departing for France. Laertes warns his sister, Ophelia, away from Hamlet and thinking too much of his attentions towards her. "



var keywords = []
var reps = []
var parole = []
var x = []
var y = []
var z = []

function preload() {
  bonne = loadFont('Bonne.ttf');
}

function setup() {
  createCanvas(w = windowWidth, h = windowHeight, WEBGL);

//////testo
  key_extractor(testo)
  textFont(bonne);
  textSize(20);
  textAlign(CENTER, CENTER);
  
  
//////setup inserimento del testo
  input = createInput();
  input.position(w/3, 30);
  button = createButton("submit");
  button.position(w/3+160, 30);
}

function draw() {
  background(0);
  orbitControl();
  lights();
  
  
  rotateY(r)
  translate(-w/2, -h/2)

  
//////setup inserimento del testo
  mostra_parole(parole)
  button.mousePressed(drawName);
  

//////rotazione mind map
  r+=0.003;
  
}


////////scrive la parola all'interno dell'array
function drawName(){
  var name = input.value();
  parole.push(name);
  
  //chiamo di nuovo la funzione
  mostra_parole(parole)
  reps.push(1)
  //nsole.log(parole)
  //nsole.log(z)

}


////////parole collegate e collegamenti
function mostra_parole(parole) {
     translate(width / 2, height / 2);
     textSize(15)
     push();
  
  
  for (var j = 0; j < parole.length; j++){
    
    if (z.length <= parole.length){
      x.push(random(-250,250));
      y.push(random(-250,250));
      z.push(random(-250,250));
    }
  }
  
  
  for (var i = 0; i < parole.length; i++) {
      fill(0)
    //console.log(reps)
    
      if (reps[i] == 1) {
        stroke(255)
        strokeWeight(1)
        var v = createVector(x[i], y[i], z[i]);
        var v1 = createVector(x[i-1], y[i-1], z[i-1]);
        var v2 = createVector(x[i+1], y[i+1], z[i+1]);
                line(0, 0, 0, v.x, v.y, v.z);
        // if (i>0){
        //         line(v1.x,v1.y, v1.z, v.x, v.y, v.z);
        //   }
        //if (i<parole.length-1){
                //line(v2.x,v2.y, v2.z, v.x, v.y, v.z);}
        fill(255)
        push()
        translate(v.x, v.y, v.z+10)
        noStroke();
        text(parole[i], 0, -20, 0);
         pop()
        //ambientMaterial(100)
        push()
        translate(v.x, v.y, v.z)
        sphere(5);
        pop()

       // rotate(2 * PI / (parole.length - 2)); 
      }
    }
    pop();

  /////parola centrale////
  //distanza dal centro
  var n = 10
 
   
  for (var i = 0; i < parole.length; i++) {
    push()
    if (reps[i] > 1) {
      
      textSize(24)
      fill(255)
      
      //translate(random(-100,100), random(-100,100), random(-100,100))
      text(parole[i], 0, 0 - n)
      n = n * (-1)
    
    }
    pop()
   }
 
}

///////dandelion estrae le parole chiave dal testo
function key_extractor(testo) {
  loadJSON('https://api.dandelion.eu/datatxt/nex/v1/?lang=en%20&text=' + testo + '&include=types%2Cabstract%2Ccategories%2Clod&include=image&min_confidence=0,4&token=5db5cba74eb741bba4068e13c54c917b', gotData);
}

/////////inserisce le parole chiave nell'array keyword
function gotData(datatxt) {
  for (var i = 0; i < datatxt.annotations.length; i++) {
    var keyword = datatxt.annotations[i].spot;
    keywords.push(keyword)
    reps.push(1)
  }
  sorter(keywords)
}

///////ordina le parole e rimuove le ripetizioni
function sorter(keywords) {
  keywords = sort(keywords, keywords.length);
  repetition(keywords)
}

//////prende le parole piu frequenti e le mette al centro
function repetition(keywords) {
  for (var i = 0; i < keywords.length; i++) {
    if (keywords[i] === keywords[i + 1]) {
      keywords.splice(i + 1, 1)
      reps[i] = reps[i] + 1
      reps.splice(i + 1, 1)
    }
  }
  
  parole = keywords
  console.log("Entità identificate:  " + parole)
  console.log("Numero di ripetizioni:  " + reps)
  
 // noLoop();
}

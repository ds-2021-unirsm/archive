let objectDetector;

let img;
let objects = [];
let status;
parole=[];
let stock=[];

function preload(){
  img = loadImage('images/turtle.png');
}


function setup() {
  createCanvas(640, 420);
  objectDetector = ml5.objectDetector('cocossd', modelReady);
  

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
    console.log(parole[i] + '. ' + 'sono la parola trovata da yolo');
  }
  trovaRima();
}


function draw() {
  // unless the model is loaded, do not draw anything to canvas
  if (status != undefined) {
    image(img, 0, 0)

    for (let i = 0; i < objects.length; i++) {
      noStroke();
      fill(153,0,255);
      textSize(20);
      text(objects[i].label + ' and ' + stock[i] + " " + nfc(objects[i].confidence * 100.0, 2) + "%", objects[i].x + 5, objects[i].y + 21);
      noFill();
      strokeWeight(4);
      stroke(153,0,255);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }
}

function trovaRima(){
   for(let i=0; i<parole.length; i++){
    rhymes = RiTa.rhymes(parole[i], { limit: 1 });
     console.log(rhymes[i] +'. '+ 'sono la rima');
     stock.push(rhymes[i]);
     }
  console.log(stock);
}
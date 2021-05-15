/*
Quale colore ti rappresenta oggi? 
*/

// Step 1: load data or create some data 
const data = [
  // dati su cui alleneremo la nostra rete
  
  // lo considera rosso
  {r:255, g:0, b:0, color:'arrabbiat*'}, 
  {r:254, g:0, b:0, color:'arrabbiat*'},
  {r:253, g:0, b:0, color:'arrabbiat*'},
  {r:252, g:0, b:0, color:'arrabbiat*'}, 
  {r:251, g:0, b:0, color:'arrabbiat*'},
  {r:250, g:0, b:0, color:'arrabbiat*'},
  
  // lo considera verde
  {r:0, g:255, b:0, color:'sicur*'},
  {r:0, g:254, b:0, color:'sicur*'},
  {r:0, g:253, b:0, color:'sicur*'},
  {r:0, g:252, b:0, color:'sicur*'},
  {r:0, g:251, b:0, color:'sicur*'},
  {r:0, g:250, b:0, color:'sicur*'},
  
  // lo considera blu
  {r:0, g:0, b:255, color:'triste'},
  {r:0, g:0, b:254, color:'triste'},
  {r:0, g:0, b:253, color:'triste'},
  {r:0, g:0, b:252, color:'triste'},
  {r:0, g:0, b:251, color:'triste'},
  {r:0, g:0, b:250, color:'triste'},
  
  // lo considera bianco
  {r:255, g:255, b:255, color:'tranquill*'},
  {r:254, g:254, b:254, color:'tranquill*'},
  {r:253, g:253, b:253, color:'tranquill*'},
  {r:252, g:252, b:252, color:'tranquill*'},
  {r:251, g:251, b:251, color:'tranquill*'},
  {r:250, g:250, b:250, color:'tranquill*'},
  // se li aumento c'è piu probabilità che indovini il bianco
  
  // lo considera nero
  {r:0, g:0, b:0, color:'nervos*'},
  {r:1, g:1, b:1, color:'nervos*'},
  {r:2, g:2, b:2, color:'nervos*'},
  {r:3, g:3, b:3, color:'nervos*'},
  {r:4, g:4, b:4, color:'nervos*'},
  {r:5, g:5, b:5, color:'nervos*'},
  
  // lo considera giallo
  {r:240, g:255, b:0, color:'felice'},
  {r:239, g:255, b:1, color:'felice'},
  {r:238, g:255, b:2, color:'felice'},
  {r:241, g:255, b:3, color:'felice'},
  {r:237, g:255, b:4, color:'felice'},
  {r:242, g:255, b:5, color:'felice'},

  // se tre valori simili nello slider
  // compare white perche ho sia r che g che b uguali
  // la rete ha capito che il bianco ha tre colori uguali, lo ha dedotto dai dati che noi le abbiam dato
  
  // meno dati meno vero

];


// classificazione: prende un risultato tra un valore finito di possibilità.

// regressione: ti puo restituire un qualunque valore numerico.

// Step 2: set your neural network options
const options = {
  // classificazione, in base a dei dati io ti do un risultato
  // mentre la 'regression' serve quando vogliamo un valore in uscita, quindi non deve scegliere tra delle categorie che gli diamo noi
  
  task: 'classification', // classificare il colore= scegliere tra un num di scelte limitate
  debug: true // attiviamo operazioni di debug
}

// Step 3: initialize your neural network
const nn = ml5.neuralNetwork(options); // richiamo funzione ml5 e passiamo in ingresso le options che vanno a caratterizzare la rete 

// Step 4: add data to the neural network
data.forEach(item => { // appena do un array scorro l'elemento dell'array item in automatico
  const inputs = { // separo l'input
    r: item.r, 
    g: item.g, 
    b: item.b
  };
  const output = { // dall'output
    color: item.color
  };

  nn.addData(inputs, output); // li passa alla rete nn. Li carica per l'allenamento della rete
});

// Step 5: normalize your data;
// procedimento interno per mettere i dati in una forma corretta
// indispensabile per riportarli ad una forma coerente tra 0 e 1
nn.normalizeData();

// Step 6: train your neural network
const trainingOptions = { // cicli di apprendimento
  epochs: 100, // tentativi che lui fa per far convergere la rete. Alcune volte ne saranno necessarie di piu
  batchSize: 12 // dimensione del suo sistema. dice quanti dati processa ad ogni epoca
} 

// in base ai dati cercherà di calibrare la sua rete
// finishedTraining è una callback function. Alla fine del processo richiama questa funzione che ha classify.
nn.train(trainingOptions, finishedTraining);

// Step 7: use the trained model
function finishedTraining(){
  console.log("Puoi indovinare");
}

// Step 8: make a classification
function classify(){
  const input = { // prende un input
    r: sliderRed.value(), 
    g: sliderGreen.value(), 
    b: sliderBlue.value()
  }
  nn.classify(input, handleResults); // chiede alla rete di classificarlo
  // seconda callback function quando finisce il processo
}

// Step 9: define a function to handle the results of your classification
function handleResults(error, result) {
    if(error){
      console.error(error);
      return;
    }
    console.log(result); // {label: 'red', confidence: 0.8};
  pColore.html("Oggi ti senti: "+ result[0].label + ", valore di affidabilità " + result[0].confidence);
}

// piu aumentiamo le epoche piu vicino lo 0
// buon compromesso tra tempo di allenamento e prestazione

// la rete neurale ci da una probabilità di risposta, non una risposta.

var sliderRed;
var sliderGreen;
var sliderBlue;

var pColore;

var button;

function setup() {
  
  pColore = createP("Muovi gli slider per scegliere il colore che meglio di rappresenta oggi");

  createCanvas(400, 400);
  background(0);

  createP("RED");
  sliderRed = createSlider(0, 255, 0, 5);

  createP("GREEN");
  sliderGreen = createSlider(0, 255, 0, 5);

  createP("BLUE");
  sliderBlue = createSlider(0, 255, 0, 5);
  
  button = createButton("Indovina");
  button.mousePressed(indovina);
}

function indovina(){
  console.log("Hai premuto");
  classify();  //andrà a classificare il dato solo alla fine dell'allenamento. Se lo andassi a chiedere ad una rete non ancora allenata otterrei una risposta casuale.
  // solo quando la rete è pronta
  // call back function >> chiamala solo quando hai finito questa procedura.

}
function draw() {
  background(sliderRed.value(), sliderGreen.value(), sliderBlue.value());
}

// le reti neurali hanno dei campi d'ombra
// lavora bene quando ha dei valori ben definiti
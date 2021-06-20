// -
// Variazione 10Print 0.2 by Lucrezia Nediani [10 Print, GUI]
// 2021 © Lucrezia Nediani, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/Lucrezia604 — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to: 
// @Debabrata Panigrahi (openprocessing.org) for https://openprocessing.org/sketch/850291
// original license: Tipo licenza
// —
// Help:
// [immagini] menù a tendina con "dimensioniImmagine" e "coloreImmagine"
// [dimensioniImmagine] regola la dimensione delle figure
// [coloreImmagine] regola il colore delle figure
// [reset] cancella ciò che è nella Canvas
// [cattura] scarica l'immagine
// —


let w;  //grandezza x della linea corrente
let h;  //grandezza y della linea corrente
let index_X= 0;  //indice del simbolo della riga
let Pos_Y= 0;  //posizione della riga

let palette = ["#F2C7A7","#F46F40","#DE1E0F","#0684CF","#090909","#4D261F","#D7BC9F"];

let MaxDim = 35; //max slider dimensione
let MinDim = 15;  //min slider dimensione
let rapporto = 0;  //rapporto canvas/simbolo
let idcanvas;
let Catturaimmagine = 0;

//parametri utilizzati dalla gui
let parametri = {
  
  dimensioniImmagine: 25,
  coloreImmagine: [208, 17, 208],

  reset: function() { 
    background("#F2C7A7");
    index_X = 0;
    Pos_Y= 0;
    y = 0;
  },

  Cattura: function() { 
    Catturaimmagine = 1;
    
  }  
  
};

//ad ogni caricamento dello sketch
window.onload = function() {

  var gui = new dat.GUI();  //creo la gui
  
  var f2 = gui.addFolder('Immagini');//crea il menu a tendina "immagini"
  //crea il parametro "dimensioni immagine" della gui
  f2.add(parametri, 'dimensioniImmagine', MinDim, MaxDim);
  //crea il parametro "colore Immagine" della gui
  f2.addColor(parametri, 'coloreImmagine');

  gui.add(parametri, 'reset');  //crea il tasto reset
  
  gui.add(parametri, 'Cattura');  //crea il tasto cattura  
    
}

function setup() {
  idcanvas = createCanvas(windowWidth, windowHeight);
  background("#F2C7A7");
  
  angleMode(DEGREES);
  
  //setto la dimensione della riga corrente
  w = h = (round(parametri.dimensioniImmagine));
  
  //setto il rapporto della riga corrente
  rapporto = windowHeight/(round(parametri.dimensioniImmagine));
}

function draw() {
  let i;
  //Variabile d'appoggio per mischiare i colori della palette con quello del parametro
  let CCC = [];  
  
  let x1 = w*index_X;  //posizione del simbolo
  let y1 = Pos_Y;  //posizione della riga in basso
  
  let palette_copy = palette.concat(); //copio la palette per non modificarla
  let bgNum = int(random(palette_copy.length)); //scelgo un colore a caso
  palette_copy.splice(bgNum,1); //mischio la palette
  
  for(i = 0; i < palette_copy.length;i++)
    {
      //mischio i colori della palette con il colore parametro
      CCC[i] = lerpColor(color(palette_copy[i]), color(parametri.coloreImmagine), 0.5);
    }
  
  //farma l'esecuzione se siamo arrivati a fine altezza dello schermo
  if((Pos_Y < windowHeight))
    {
      push();
      translate(x1 + (w/2), y1 + (h/2));  //stampo al centro
      rotate(int(random(4)) * 360 / 4);  //ruoto casualmente l'immagine
      drawGradientArc (-(w/2), -(h/2), w*2, 0, 90, CCC);  //stampo l'immagine
      pop();
      index_X++; //passo al simbolo successivo      
    }
 
  //se la riga è finita e premi"cattura" scarica l'immagine
  if ((index_X >= windowWidth/(w)) && (Pos_Y < windowHeight)) {

    if(Catturaimmagine == 1)
      {
        saveCanvas(idcanvas, 'myCanvas', 'jpg');
        Catturaimmagine = 0;
      }
    
    //scendo di riga
    Pos_Y = Pos_Y + h;
    
    //aggiorno i parametri per la nuova riga
    rapporto = windowHeight/(round(parametri.dimensioniImmagine));
    w = h = (round(parametri.dimensioniImmagine));
    
    index_X=0; //reset della linea
  }
  else if((Pos_Y >= windowHeight))  //permette la cattura dell'immagine a fine esecuzione
    {
      if(Catturaimmagine == 1)
        {
          saveCanvas(idcanvas, 'myCanvas', 'jpg');
          Catturaimmagine = 0;
        }
    }
}

//disegna la forma base
function drawGradientArc(_x, _y, _d, angleA, angleB, colors) {
  push();
  translate(_x, _y);
  let angleMin = min(angleA, angleA);
  let angleMax = max(angleA, angleB);
  let cNum = int(random(colors.length));
  let c = colors[cNum];
  colors.splice(cNum, 1);

  let cANum = int(random(colors.length));
  let cA = colors[cANum];
  colors.splice(cANum, 1);

  let cBNum = int(random(colors.length));
  let cB = colors[cBNum];
  colors.splice(cBNum, 1);

  let step = 1 / int(random(3, 8));
  for (let angle = angleMin; angle <= angleMax; angle += 1 / 3) {
    let x = cos(angle) * _d / 2;
    let y = sin(angle) * _d / 2;
    colorMode(RGB);
    let cc = lerpColor(color(cA), color(cB), angle / abs(angleMax - angleMin));

    let n = 0;
    while (n <= 1 - step) {
      let px1 = lerp(0, x, n);
      let py1 = lerp(0, y, n);
      let px2 = lerp(0, x, n + step);
      let py2 = lerp(0, y, n + step);
      stroke(lerpColor(color(c), color(cc), n));
      line(px1, py1, px2, py2);
      n += step;
    }
  }
  pop();
}

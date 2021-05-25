//  ____ ____
// | ___|    |
// | ___|  __|
// |____|_|
// ___________
//
// Entity Extraction + RiTa (enhanced) by emanuelepizzuti [keyword1, keyword2]
// 2021 © emanuelepizzuti, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// ___________

/*
entities + RiTa (enhanced)
All'algoritmo viene data in pasto una frase -> Dandelion ne estrae le entità -> RiTa cambia queste entità in modo che siano simili
Versione migliorata, utilizzando parti dell'esempio "replaceable writing"
*/

let lang = "it";
let dandelion_token = "b71129fffdf6473ea700865788dabbcd";
let dandelion_token2 = "36f142c6e1824fabad5c1a76670c69c8";

let input = "Israel hits Gaza with deadly airstrikes amid rocket fire by Hamas";
var output = "";

let dataArray = [];

let a = 70;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255, 255, 250);
  textSize(20);

  entitiesExtraction(input);
}

function entitiesExtraction(stringaDaValutare) {
  let url =
    "https://api.dandelion.eu/datatxt/nex/v1/?" +
    lang +
    "&min_confidence=0.6&text=" +
    input +
    "&country=-1&social=False&top_entities=8&include=image%2Cabstract%2Ctypes%2Ccategories%2Clod&token=" +
    dandelion_token2;

  loadJSON(url, response);
}

function response(risposta) {
  console.log(risposta);
  for (let i = 0; i < risposta.annotations.length; i++) {
    dataArray.push(risposta.annotations[i].spot);
    // console.log(dataArray[dataArray.length - 1]);
  }
  // console.log(dataArray);

  //attivaRita=true

  processRita();
}

function processRita() {
  var words = RiTa.tokenize(input);
  var pos = RiTa.pos(input);

  // console.log(words);
  // console.log(pos);

  for (var i = 0; i < words.length; i++) {
    for (var k = 0; k < dataArray.length; k++) {
      let idx = i % words.length;
      let word = words[idx].toLowerCase();

      // find related words
      let pos = RiTa.tagger.allTags(word)[0];
      let rhymes = RiTa.rhymes(word, { pos });
      let sounds = RiTa.soundsLike(word, { pos });
      let spells = RiTa.spellsLike(word, { pos });
      let similars = [...rhymes, ...sounds, ...spells];

      // pick a random similar
      let next = RiTa.random(similars);

      if (/[A-Z]/.test(words[idx][0])) {
        next = RiTa.capitalize(next); // keep capitals
      }

      if (words[i] === dataArray[k]) {
        words[i] = next; // qui

        console.log(words);
      } else {
        continue;
      }
    }
    // output += " ";
  }
  output = RiTa.untokenize(words);
  //createP(output);
}

function draw() {
  background(245);
  textAlign(LEFT);
  textFont("Helvetica");
  textStyle(BOLD);
  textSize(20);
  fill(140);
  text("Entities:", 35, 50);

  for (let k = 0; k < dataArray.length; k++) {
    textFont("Helvetica");
    textStyle(ITALIC);
    textSize(20);
    fill(0);
    text(dataArray[k], 35, a);
    a += 35;
    if (k == dataArray.length - 1) a = 80;
  }

  textAlign(CENTER);
  textStyle(NORMAL);
  textFont("Georgia");
  fill(140);
  textSize(20);
  text(input, windowWidth / 2, windowHeight / 2 - 45);

  textFont("Georgia");
  fill(0);
  textSize(30);
  text(output, windowWidth / 2, windowHeight / 2);
}

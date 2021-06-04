//  ____ ____
// | ___|  _ |
// | ___|  __|
// |____|_|
// ___________
//
// RiTa + Sentiment-changing-bg by emanuelepizzuti [RiTa, Dandelion, Sentiment Analysis]
// 2021 © emanuelepizzuti, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to: 
// RiTa version 2.4 for https://rednoise.org/rita/
// original license: GPL License
//
// Sentiment Analysis API, Dandelion API for https://dandelion.eu
// original license: v.2 - 02/Sep/2013
// ___________

let coloreSentiment=0;
let lang = "en";
let dandelion_token2 = "36f142c6e1824fabad5c1a76670c69c8";
let dataArray = [];
let dataArraySentiment = [];
let newSentiment;

let txt = "Trump did not win the election";

let counter = 0;

function setup() {
  createCanvas(700, 400).parent("#cdiv");
  colorMode(HSB, 360, 100, 100);
  noStroke();
  loadFont("Chaparral.otf", nextWord);
}

// replace a random word in the text every 2 seconds
function nextWord() {
  let words = RiTa.tokenize(txt); // split into words

  // loop from a random spot
  let r = floor(random(0, words.length));
  for (let i = r; i < words.length + r; i++) {
    let idx = i % words.length;
    let word = words[idx].toLowerCase();
    if (word.length < 3) continue; // len >= 3

    // find related words
    let pos = RiTa.tagger.allTags(word)[0];
    let rhymes = RiTa.rhymes(word, { pos });
    let sounds = RiTa.soundsLike(word, { pos });
    let spells = RiTa.spellsLike(word, { pos });
    let similars = [...rhymes, ...sounds, ...spells];

    // only words with 2 or more similars
    if (similars.length < 2) {
      console.log("No sims for " + word);
      continue;
    }

    // pick a random similar
    let next = RiTa.random(similars);

    if (next.includes(word) || word.includes(next)) {
      continue; // skip substrings
    }
    if (/[A-Z]/.test(words[idx][0])) {
      next = RiTa.capitalize(next); // keep capitals
    }

    console.log("replace(" + idx + "): " + word + " -> " + next);

    words[idx] = next; // do replacement
    break;
  }

  // recombine into string and display
  txt = RiTa.untokenize(words);

  if (counter % 10 === 0)        // counter
    sentimentAnalysis(txt);
  
  setTimeout(nextWord, 1000);

  counter++;
}

function draw() {  
  background(coloreSentiment, 10, 100);
  // console.log(txt);

  fill(50);
  textFont("Georgia");
  textSize(20);
  textAlign(LEFT);
  text("Trump did not win the election", 50, 150, 550, 400);

  fill(0);
  textFont("Georgia");
  textSize(35);
  textAlign(LEFT);
  text(txt, 50, 200, 500, 400);

  
}

/////////////SENTIMENT///////////////////////////////////////////////////////

function sentimentAnalysis(testo) {
  // SENTIMENT ANALYSIS
  let url2 =
    "https://api.dandelion.eu/datatxt/sent/v1/?lang=" +
    lang +
    "&text=" +
    testo +
    "&token=" +
    dandelion_token2;

  // visualizza RESPONSE una volta che ha effettuato la SA
  loadJSON(url2, response2);
}

function response2(sentResp2) {
  console.log(sentResp2);
  newSentiment = sentResp2.sentiment.score;
  //dataArraySentiment.push(sentResp2.sentiment.score);
  // console.log(
  //   dataArraySentiment[dataArraySentiment.length - 1]
  // );
  scegliColore();
}

function scegliColore() {
  let sentiment = newSentiment;
  //let sentiment = dataArraySentiment[dataArraySentiment.length-1];
  console.log(sentiment);
  coloreSentiment = map(sentiment, -1, 1, 0, 200);
  console.log("colore " + coloreSentiment);
  //return coloreSentiment;
}

/////////////////////////////////////////////////////////////////////////////

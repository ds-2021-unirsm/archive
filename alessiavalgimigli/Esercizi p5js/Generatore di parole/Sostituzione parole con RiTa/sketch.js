// -
// Sostituzione parole con RiTa 0.1 by Alessia Valgimigli [RiTa, sostituzione]
// 2021 © Alessia Valgimigli, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to: 
//https://rednoise.org/rita/examples/p5/ReplaceableWriting/#source
//
// —
//
// Help:
// [button] click: cambiare la parola
//
// —

let canzone = "In the town where I was born Lived a man who sailed to sea And he told us of his life In the land of submarines So we sailed on to the sun 'Til we found a sea of green And we lived beneath the waves In our yellow submarine We all live in a yellow submarine Yellow submarine, yellow submarine We all live in a yellow submarine Yellow submarine, yellow submarine And our friends are all aboard Many more of them live next door And the band begins to play We all live in a yellow submarine Yellow submarine, yellow submarine We all live in a yellow submarine Yellow submarine, yellow submarine Full steam ahead, Mister Boatswain, full steam ahead Full steam ahead it is, Sergeant (Cut the cable, drop the cable) Aye-aye, sir, aye-aye Captain, captain As we live a life of ease Every one of us (every one of us) Has all we need (has all we need) Sky of blue (sky of blue) And sea of green (sea of green) In our yellow (in our yellow) Submarine (submarine, aha) We all live in a yellow submarine A yellow submarine, yellow submarine We all live in a yellow submarine A yellow submarine, yellow submarine We all live in a yellow submarine Yellow submarine, yellow submarine We all live in a yellow submarine Yellow submarine, yellow submarine";

let gui = new UIL.Gui({ // interfaccia
  css: 'right:0; top:0;',
  bg: '#7777aa', // to update new version
  w: 200,
});

function setup() {
  createCanvas(600, 400);
  textSize(17.5);
  changeWord();
  setupGui();
}

// replace one random word in the text
function changeWord() {
  // split into words
  let words = RiTa.tokenize(canzone);

  // fa partire il loop da un punto random all'interno del testo
  let r = floor(random(0, words.length));
  for (let i = r; i < words.length + r; i++) {
    let idx = i % words.length;
    let word = words[idx].toLowerCase();
    if (word.length < 3) continue;

    // find related words
    let pos = RiTa.tagger.allTags(word)[0];
    let rhymes = RiTa.rhymes(word, { pos });
    let sounds = RiTa.soundsLike(word, { pos });
    let similars = [...rhymes, ...sounds];

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

    words[idx] = next;
    // do replacement
    break;
  }

  // recombine into string and display
  canzone = RiTa.untokenize(words);
  background(255);
  fill(0);
  textSize(12);
  text(canzone, 50, 30, width - width/2, height);
}

function setupGui() {
  
  // pulsante
  gui.add('button', {
    name: 'Cambia Parola',
    fontColor: '#ffffff',
    h: 40,
  }).onChange(function(v) {
  changeWord();
  });
  
}



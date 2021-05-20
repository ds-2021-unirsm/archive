////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

//original RiTa code: https://rednoise.org/rita/examples/p5/ReplaceableWriting/#source

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

let parole_odio = [
  "nigger",
  "nigga",
  "faggot",
  "queer",
  "whore",
  "slut",
  "bitch",
  "gimpy",
  "pickey",
  "gipsy",
  "dyke",
  "asshole",
  "skank",
];

let tweet;

function preload() {
  tweet = loadJSON("nigga.json");
}

function setup() {
  createCanvas(600, 400);
  textSize(17.5);
  print("sono il tweet:" + tweet.statuses[0].text);
  changeWord();
}

// replace one random word in the text
function changeWord() {
  // split into words
  let words = RiTa.tokenize(tweet.statuses[0].text);
  console.log("tokenize: " + words);

  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < parole_odio.length; j++) {
      // find related words
      let rhymes = RiTa.rhymes(parole_odio[j]);
      let change = RiTa.random(rhymes);

      if (words[i] == parole_odio[j]) {
        //do replacement
        words[i] == change;
      } else {
        continue;
      }

      console.log("replace(" + i + "): " + words[i] + " -> " + change);

      // words[i] = change; // do replacement
      fill(250, 0, 0);
      break;
    }
  }

  // recombine into string and display
  tweet.statuses[0].text = RiTa.untokenize(words);
  background(20, 30, 55);
  fill(250, 240, 230);
  text(tweet.statuses[0].text, 50, 30, 500, height);
}

function draw() {}

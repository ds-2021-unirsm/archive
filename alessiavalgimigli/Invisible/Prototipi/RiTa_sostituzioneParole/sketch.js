//original code: https://rednoise.org/rita/examples/p5/ReplaceableWriting/#source

////////////////////////////////////////////////////////////

//let txt = "Hell, you even startin' to smell like a nigger";
let txt = "I rather he be queer than dominated by a bitch.";

function setup() {
  createCanvas(600, 400);
  textSize(17.5);
  changeWord();
}

// replace one random word in the text
function changeWord() {
  // split into words
  let words = RiTa.tokenize(txt); 
  //console.log(words);
  
  let parole_odio = [
    "nigger",
    "nigga",
    "faggor",
    "queer",
    "whore",
    "slut",
    "bitch",
    "gimpy",
  ];

  
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < parole_odio.length; j++) {
      // find related words
      let rhymes = RiTa.rhymes(parole_odio[j]);
      let change = RiTa.random(rhymes);

      if (words[i] == parole_odio[j]) {
        change;
      } else { continue; }

      if (change.includes(words[i]) || words[i].includes(change)) {
        continue; // skip substrings
      }

      if (/[A-Z]/.test(words[i][0])) {
        change = RiTa.capitalize(change); // keep capitals
      }

      console.log("replace(" + i + "): " + words[i] + " -> " + change);

      words[i] = change; // do replacement
      break;
    }
  }

  // recombine into string and display
  txt = RiTa.untokenize(words);
  background(20, 30, 55);
  fill(250, 240, 230);
  text(txt, 50, 30, 500, height);
}

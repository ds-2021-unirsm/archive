// -
// Isole di walkers 0.1 by Alessia Valgimigli [walkers, random]
// 2021 © Alessia Valgimigli, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// —

let goccia = [];
let tweet_raccolti = [];
let testo_ancorato = [];
let macchia1;
let macchia2;
let macchia3;
let macchia4;

let razzismo = ["musogiallo", "zingaro", "terrone", "negro", "clandestino"];
let misoginia = ["vacca", "puttana", "cagna", "mignotta", "troia", "zoccola"];
let omofobia = ["frocio", "checca", "bocchinaro", "lesbicona"];
let disabilità = ["mongoloide", "spastico", "handicappato", "storpio"];

let words_tweet = [];

let w;
let h;
let id;

function preload() {
  tweet = loadJSON("tweet.json");
}

function setup() {
  createCanvas((w = windowWidth), (h = windowHeight));
  macchia1 = createVector(width / 4, height / 4);
  macchia2 = createVector(width / 1.5, height / 1.5);
  macchia3 = createVector(width / 1.5, height / 4);
  macchia4 = createVector(width / 4, height / 1.5);

  //ogni text del JSON viene splittato in parole singole e inserito all'interno dell'array tweet_raccolti
  for (let w = 0; w < tweet.tweet.length; w++) {
    words_tweet = split(tweet.tweet[w].statuses[0].text, " ");
    tweet_raccolti.push(words_tweet);
  }

  //console.log(tweet_raccolti);
  //console.log(tweet_raccolti.length);
  //.log(tweet.tweet.length);
  //console.log(tweet.tweet[0].statuses[0].text);
}

function draw() {
  background(0);
  noStroke();
  fill(255, 50);
  text("misoginia", width / 4, height / 4);
  text("omofobia", width / 1.5, height / 1.5);
  text("disabilità", width / 4, height / 1.5);
  text("razzismo", width / 1.5, height / 4);

  let j = 0;
  id = 0;

  for (let i = 0; i < goccia.length; i++) {
    goccia[i].seek();
    goccia[i].update();
    //  goccia[i].noise();
    goccia[i].display(testo_ancorato[j]);
    //incremento la variabile in modo che mi selezioni il testo successivo nell'array testo_ancorato
    j++;
    id++;

    // console.log(goccia[i].estrazione);
    // console.log(goccia[i]);

    /*
    for (let b = 0; b < goccia.length; b++) {
      if (goccia[i].estrazione == goccia[b].estrazione) {
        p5.Vector.add(
              goccia[i].macchia,
              goccia[b].location
            )
      }
    }*/

    /*
    for (let k = 0; k < goccia.length; k++) {
      if (i != k && goccia[i].scontro(goccia[k])) {
        goccia[i].distanziamento();
        console.log("distanziamento avvenuto")
        //console.log("scontro tra: " + g.id + " e " + goccia[k].id);
      }
    } */
  }
}

function mousePressed() {
  //id=0;
  //ogni volta che viene fatto un click viene estratto un tweet dal json (simulando l'estrazione in tempo reale)
  let estrazione = random(tweet_raccolti);
  console.log(estrazione);
  let stringa = join(estrazione, " ");
  //testo_ancorato.shift();
  testo_ancorato.push(stringa);
  console.log("testo ancorato: " + testo_ancorato);

  //ogni parola contenuta nell'estrazione viene confrontata con le parole contenute nelle quattro categorie discriminatorie, in base a queste la goccia si di rigerà verso la macchia di riferimento.

  for (let e = 0; e < estrazione.length; e++) {
    for (let m = 0; m < misoginia.length; m++) {
      if (estrazione[e] == misoginia[m]) {
        //let parola_bold = createP(misoginia[m]);
        //console.log("parola bold: " + parola_bold);
        //parola_bold.style('color', '#ff0000');
        goccia.push(
          new Goccia(
            width / 2,
            height / 2,
            color(255, 0, 0),
            //ad ogni target aggiungo un vettore random in modo da variare leggermente la traiettoria tra una goccia e l'altra
            p5.Vector.add(
              macchia1,
              createVector(random(-80, 80), random(-30, -30))
            ),
            id,
            estrazione[e]
          )
        );
      }
    }
  }

  for (let e = 0; e < estrazione.length; e++) {
    for (let o = 0; o < omofobia.length; o++) {
      if (estrazione[e] == omofobia[o]) {
        goccia.push(
          new Goccia(
            width / 2,
            height / 2,
            color(0, 255, 0),
            p5.Vector.add(
              macchia2,
              createVector(random(-80, 80), random(-30, -30))
            ),
            id,
            estrazione[e]
          )
        );
      }
    }
  }

  for (let e = 0; e < estrazione.length; e++) {
    for (let z = 0; z < razzismo.length; z++) {
      if (estrazione[e] == razzismo[z]) {
        goccia.push(
          new Goccia(
            width / 2,
            height / 2,
            color(223, 106, 255),
            p5.Vector.add(
              macchia3,
              createVector(random(-80, 80), random(-30, -30))
            ),
            id,
            estrazione[e]
          )
        );
      }
    }
  }

  for (let e = 0; e < estrazione.length; e++) {
    for (let d = 0; d < disabilità.length; d++) {
      if (estrazione[e] == disabilità[d]) {
        goccia.push(
          new Goccia(
            width / 2,
            height / 2,
            color(255, 231, 12),
            p5.Vector.add(
              macchia4,
              createVector(random(-80, 80), random(-30, -30))
            ),
            id,
            estrazione[e]
          )
        );
      }
    }
  }

  /*
  for (let b = 0; b < goccia.length; b++) {
    for (let c = 0; c < goccia.length; c++) {
      if (goccia[b].estrazione == goccia[c].estrazione) {
        goccia[b].target = goccia[c].location;
      }
    }
  }*/

  console.log(goccia);
}

function changeColor() {
  fill(random(255), random(255), random(255));
}

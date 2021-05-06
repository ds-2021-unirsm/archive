// Inspired by Generative Gestaltung – Creative Coding im Web
//
// foto pixel
//
// Lucilla Cesaroni

/**
 * extract and sort the color palette of an image
 *
 * MOUSE
 * position x          : resolution
 *
 * KEYS
 * 1                   : null
 * 2                   : sort colors on hue
 * 3                   : sort colors on saturation
 * 4                   : sort colors on brightness
 * 5                   : sort colors on greyscale (luminance)
 * s                   : save png
 * c                   : save color palette
 */

var img;
var colors = [];
var sortMode = null; // modalità di ordinamento
var w, h;

function preload() {
  img = loadImage('islanda.jpeg'); // precarico l'immagine
}

function setup() {
  createCanvas(w = 600, h = 600);
  noStroke();
  background(255);
}

function draw() {
  img.resize(w, h); // regolo l'immagine sulla larghezza e l'altezza

  var tileCount = floor(w / max(mouseX, 5)); // numero di "piastrelle", numero arrotondato per difetto di larghezza / massimo tra posizione del mouse e 25 --> se diminuisco questo secondo numero, l'immagine sarà più nitida
  var rectSize = w / tileCount; // "risoluzione"

  img.loadPixels(); // carico i dati dei pixel dell'immagine

  colors = [];

  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {
      var px = int(gridX * rectSize);
      var py = int(gridY * rectSize);
      var i = (py * img.width + px) * 4;
      var c = color(img.pixels[i], img.pixels[i + 1], img.pixels[i + 2], img.pixels[i + 3]);
      colors.push(c); // metto nell'array colors, c
    }
  }

  gd.sortColors(colors, sortMode); // gd è una libreria open source per la creazione dinamica di immagini

  var i2 = 0;
  for (var gridY2 = 0; gridY2 < tileCount; gridY2++) {
    for (var gridX2 = 0; gridX2 < tileCount; gridX2++) {
      fill(colors[i2]);
      rect(gridX2 * rectSize, gridY2 * rectSize, rectSize, rectSize);
      i2++;
    }
  }
}

function keyReleased() {
  if (key == 'c' || key == 'C') writeFile([gd.ase.encode(colors)], gd.timestamp(), 'ase');
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == '1') sortMode = null;
  if (key == '2') sortMode = gd.HUE;
  if (key == '3') sortMode = gd.SATURATION;
  if (key == '4') sortMode = gd.BRIGHTNESS;
  if (key == '5') sortMode = gd.GRAYSCALE;
}

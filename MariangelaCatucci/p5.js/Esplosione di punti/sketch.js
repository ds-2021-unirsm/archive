// Esplosione di punti 0.1 by Mariangela Catucci [explosion, punti, color, change shape]
// 2021 © Mariangela @MariangelaCatucci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
//
// —
//
// Credits/Thanks to: 
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart for 
// (http://www.generative-gestaltung.de)
// original license: Apache License, Version 2.0, 2018
//
// —
//
// Help:
// [keyPressed = s] salva immagine
// [keyPressed = r] pulisce la canvas
//
// —

var sketch = function(p) {
  // Array con nodes
  var nodes = [];
  var nodeCount = 200;

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noStroke();
    // Crea la funzione Nodes()
    createNodes();
  };
  
  var t = 0;
  
  p.draw = function() {
    p.fill(255, 20);
    p.rect(0, 0, p.width, p.height);
    var r = 200 * p.noise(t*20);
    var g = 100 * p.noise (t);
    var b = 180 * p.noise(t*5);

    p.fill(r, g, b);
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].attractNodes(nodes);
      // Applica velocità
      nodes[i].update();
      p.ellipse(nodes[i].x, nodes[i].y, p.random(1, 20), p.random(1 ,20));
    }   
    t = t + 0.5;
  };

  p.keyPressed = function() {
    if (p.key == 's' || p.key == 'S') p.saveCanvas(gd.timestamp(), 'png');
    if (p.key == 'r' || p.key == 'R') {
      p.background(255);
      createNodes();
    }
  };

  function createNodes() {
    nodes = [];
    for (var i = 0; i < nodeCount; i++) {
      nodes.push(new Node(
        p.width / 2 + p.random(-1, 1),
        p.height / 2 + p.random(-1, 1),
        5,
        p.width - 5,
        5,
        p.height - 5
      ));
    }
  }
};

var myp5 = new p5(sketch);

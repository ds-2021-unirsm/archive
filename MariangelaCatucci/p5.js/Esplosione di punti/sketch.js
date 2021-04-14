// Inspired by Generative Design

var sketch = function(p) {

  // An array with nodes
  var nodes = [];

  var nodeCount = 200;

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noStroke();

    // Create nodes
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
      // Let all nodes repel each other
      nodes[i].attractNodes(nodes);
      // Apply velocity vector and update position
      nodes[i].update();
      // Draw node
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

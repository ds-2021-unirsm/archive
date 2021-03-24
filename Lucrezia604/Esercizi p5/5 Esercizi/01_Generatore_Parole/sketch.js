var consonanti = ["b", "c", "d", "f", "g", "h", "l", "m", "n", "p", "q", "r", "s", "t", "v", "z"];
  var vocali = ["a", "e", "i", "o", "u"];
  var estrazione;
  var parola = "";

  function setup() {
    createCanvas(800, 800);

    textAlign(CENTER);
    textSize(30);

  }

  function draw() {
    background(220);
    
    //ogni 60 frame scrive una nuova parola
    if (frameCount % 60 == 0) {
      parola = "";
      var sillabe = int(random(10));
      for (var i = 0; i < sillabe; i++) {
        quale = int(random(consonanti.length - 1));

        parola += consonanti[quale];
        quale = int(random(vocali.length - 1));
        parola += vocali[quale];
      }
    }
    
    text(parola, width / 2, height / 2);
    
  }
  function setup() {
      createCanvas(400, 400);
      rectMode(CENTER);
  }

  function draw(){
      background(240);
      noStroke();
      translate(width/2, height/2);

      for (var i=0; i <30; i++) {
          push();
          scale(5/i);
          rotate(5/i);
         if (i % 2 == 1){
          fill(0)
        }
          rect(100, 100, 500);
          pop();
        }
    noLoop();
  }

//  ______  ____  ___  _______  __________ ______ ____ ______________
//  __/ _ \/ __ \/ _ )/ __/ _ \/_  __/ __ \ _/ _ |_/ /__/ __/ __/  _/
//  _/ , _/ /_/ / _  / _// , _/ / / / /_/ / / __ |/ /__/ _/_\ \_/ /
//  /_/|_|\____/____/___/_/|_| /_/  \____/ /_/ |_/____/___/___/___/
//
// -
// Victor_Vasarely 0.1 by Roberto [victor, vasarely]
// 2021 © Roberto @ciunart, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete — github.com/RobertoAlesi
// Educational purposes, MIT License, 2021, San Marino
// —   

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

// Emotion detection 0.1 by Mariangela Catucci [emozioni, colori, livello di affidabilità]
// 2021 © Mariangela @MariangelaCatucci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
//
// —
//
// Credits: 
// @_stc (twitter.com/_stc) for https://github.com/stc/face-tracking-p5js
// original license: MIT License 2018
//
// Thanks to:
// @Guillaume_Slize (twitter.com/guillaume_slize) 
// original license: MIT License 2019
//
// —
//
// Help:
// [espressioni facciali] cambiamento colori, ogni colore 
// corrisponde a un'emozione
//
// —

let emotionss = [];

function setup() {
  loadCamera();
  loadTracker();
  loadCanvas(400, 300);
}

function draw() {
  getPositions();
  getEmotions();

  clear();

  noStroke();
  fill(0, 50);
  rect(0, 0, width, height);
  //emotionss.push(emotions)
  if (emotions) {
    emotionss = predictedEmotions;
    console.log(emotionss);
    // angry=0, sad=1, surprised=2, happy=3
    for (var i = 0; i < predictedEmotions.length; i++) {
      fill(255);
      
      if (emotionss.length > 0) {
        if (emotionss[0].value >= 0.05) {
          fill(255, 0, 0);
        }
      if (emotionss[1].value >= 0.4) {
          fill(0, 0, 255);
      }
      if (emotionss[2].value >= 0.6) {
          fill(0, 255, 0);
      }
      if (emotionss[3].value >= 0.8) {
          fill(255, 255, 0);
      }
      
      rect(i * 110 + 20, height - 80, 30, -predictedEmotions[i].value * 30);
    }
  }
  }

  drawPoints();

  text("ANGRY", 20, height - 40);
  text("SAD", 130, height - 40);
  text("SURPRISED", 220, height - 40);
  text("HAPPY", 340, height - 40);
}

function drawPoints() {
  for (var i = 0; i < positions.length - 3; i++) {
    fill(255);
    
    if (emotionss.length > 0) {
      if (emotionss[0].value >= 0.05) {
        fill(255, 0, 0);
      }
      if (emotionss[1].value >= 0.4) {
        fill(0, 0, 255);
      }
      if (emotionss[2].value >= 0.6) {
        fill(0, 255, 0);
      }
      if (emotionss[3].value >= 0.8) {
        fill(255, 255, 0);
      }
        ellipse(positions[i][0], positions[i][1], 2.5, 2.5);
      }
    }
  }

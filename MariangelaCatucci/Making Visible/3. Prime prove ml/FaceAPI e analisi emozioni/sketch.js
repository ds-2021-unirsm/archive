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
    // andry=0, sad=1, surprised=2, happy=3
    for (var i = 0; i < predictedEmotions.length; i++) {
      fill(255);
      rect(i * 110 + 20, height - 80, 30, -predictedEmotions[i].value * 30);
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
        fill(255, 0, 255);
      }
        ellipse(positions[i][0], positions[i][1], 3, 3);
      }
    }
  }

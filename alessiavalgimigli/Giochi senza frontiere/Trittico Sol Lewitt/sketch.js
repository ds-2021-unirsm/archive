function setup() {
  //creo lo sfondo nero su cui si posizioneranno i tre quadrati
  createCanvas(680, 240);
  background(0);
}

function draw() {
  //1
  //sfondo
  fill(198,0,0);
  noStroke();
  rect(20, 20, 200, 200);  
  
  //curva
  stroke(0,145,10);
  noFill();
  beginShape();
  for (var i = 0; i < 200; i++) {
	var c = map(i, 0, 200, 1, 1.5); 
	var y = 200 * noise(c);
	vertex(y, i+20); //tengo conto del margine di 20
    vertex(220, i+20);    
  }
  endShape();
  
  //2
  //sfondo
  fill(36,125,255);
  noStroke();
  rect(240, 20, 200, 200);  
  
  //curva
  stroke(244,33,33);
  noFill();
  beginShape();
  for (var i = 0; i < 200; i++) {
	var c = map(i, 0, 200, 1, 1.6); 
	var y = 200 * noise(c+10);
	vertex(i+240, y);
    vertex(i+240, 220);    
  }
  endShape();
  
  
  //3
  //sfondo
  fill(255,224,00);
  noStroke();
  rect(460, 20, 200, 200);  
  
  //curva
  stroke(123,23,188);
  noFill();
  beginShape();
  for (var i = 0; i < 200; i++) {
	var c = map(i, 0, 200, 1, 1.7); 
	var y = 200 * noise(c+15);
	vertex(y+460, i+20);
    vertex(660, i+20);  
    
  }
  endShape();
}

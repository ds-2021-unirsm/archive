var r = 0;

function setup() {
  createCanvas(w = windowWidth, h = windowHeight, WEBGL);
}

function draw() {
  
  background(255);
  
  
  orbitControl();
  lights();

  strokeWeight(2.5);
  rotateY(-PI / 5);
  scale(1.8);
  translate(0, 130)

//struttura
push();
  rotateY(PI / 3)
  line(0, 0, 30, 30);
pop();
  
push();
  rotateY(-PI / 4)
  line(0, 0, 30, 30);
pop();
  
  line(0, 0, -30, 30);
  line(0, 0, 0, -270);

//linee orizzontali
//lineealte
  line(0, -270, 80, -270);
  line(0, -270, -80, -270);
  //lineemeta
  line(0, -140, 80, -140);
  line(0, -140, -80, -140);

//verticali
  line(-80, -270, -80, -260);
  line(-80, -205, -80, -125);
  line(80, -300, 80, -230);
  line(80, -150, 80, -20);

//prolungamenti
  line(80, -300, 0, 80, -300, -100);
  line(-76, -70, 15, -70);

push();

  specularMaterial(255, 0, 0);
  translate(80, -190);
  rotateY(PI/4*r/2);
  circle(0, 0, 80);
pop();

push();
  specularMaterial(255, 0, 0);
  translate(80, -300,-115);
  rotateY(PI/2)
  rotateX(PI+r/4)
  circle(0, 0, 30);
pop();

//cerchio basso a destra
push()
  translate(80, -20);
  rotateY(PI/4 *r/4);
  rotateX(-PI / 2);
  noFill();
  circle(0, 0, 60);
  noStroke();
  fill(255);
  arc(0, 0, 60, 60, 0, PI + QUARTER_PI, CHORD);
  for (i = 0; i < 10; i++) {
    rotateZ(PI / 4);
    strokeWeight(1.5)
    stroke(0);
  push();
    rotateX(PI / 2);
    translate(30, 0);
    line(0, 0, 5, 15);
  pop();
  }
pop();

//cerchio centro sx
push();
  translate(-15, -70);
  rotateY(-PI / 2);
  rotateZ(PI + PI / 7 * r);
  noFill();
  circle(0, 0, 90);
  noStroke();
  fill(0);
  specularMaterial(200);
  arc(0, 0, 90, 90, 0, PI + PI / 15, CHORD);
  for (i = 0; i < 20; i++) {
    rotateZ(PI / 10);
    stroke(0);
    push();
    rotateX(PI / 2);
    translate(45, 0);
    line(0, 0, 10, 0);
    pop();
  }
pop();

//raggiera in mezzo sx
push()
 
  translate(-80, -120);
 push();
  specularMaterial(250,0,0);
  rotateY(PI - PI / 3*r);
  translate(0,10)
  circle(0,0,30);
 pop();
  rotateX(-PI / 2);
  rotateZ(PI - PI / 3*r);
  line(0,0,-5,45,0,0);
  line(-45,0,0,0,0,-5);
  
  noFill();
  circle(0, 0, 90);
  for (i = 0; i < 20; i++) {
    rotateZ(PI / 10);
    strokeWeight(1.5)
    stroke(0);
  push();
    rotateX(PI / 2);
    translate(45, 0);
    line(0, 0,0, 10, 5,0);
  pop();
  }
pop();

//cerchio centro dx
push()
  specularMaterial(0,0,255);
  translate(15, -70);
  rotateY(-PI / 2);
  rotateZ(PI - PI / 3*r);
  noFill();
  circle(0, 0, 90);
  noStroke(0,0,255);
  fill(0);
  specularMaterial(0,0,255);
  arc(0, 0, 90, 90, 0, PI + PI / 15, CHORD);
  for (i = 0; i < 20; i++) {
  rotateZ(PI / 10);

stroke(0);
push();
    rotateX(PI / 2);
    translate(45, 0);
    line(0, 0, 10, 0);
    pop();
  }
pop();

//arco alto sx
push();
  specularMaterial(229,190,1)
  translate(-80, -256);
  rotateY(PI / 2)
  rotateZ(2 * PI);
  arc(0, 0, 100, 100, 0, PI + PI / 15, CHORD);
pop();

//cerchio in mezzo basso sx
  specularMaterial(210,190,1)
  circle(-110, -70, 70);
  line(0, -70, 0, 0, -70, 70);
  
//arco centro avanti
push();
  specularMaterial(0,0,255);
  translate(0, -70, 100);
  rotateX(-PI / 2)
  rotateY(-PI / 4);
  arc(0, 0, 60, 60, 0, PI + PI / 15, CHORD);
pop();
  
r += 0.01;
}

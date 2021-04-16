var t = 0;
let vals;
let valn;


function setup() {
  createCanvas(w = windowWidth, h = windowHeight, WEBGL);
  rectMode(CENTER);
  
      slider = createSlider(1, 20, 10);
      slider.position(10, 10);
      slider.style('width', '80px');
      
      slider2 = createSlider(5, 180, 100);
      slider2.position(10, 30);
      slider2.style('width', '80px');

}

function draw() {
  orbitControl();
  lights();
      vals = slider.value();
      valn = slider2.value();
  background(175,238,238);
  noStroke();
  
  translate(-50, -100, 500);


 for (var j = 0; j < 7; j++) {
    push();
    t += 0.0005;
    translate(100*j, 0, -200 * j);
    rotateY(t);
    for (var i = 0; i < valn; i++) {
      push();
      scale(vals / i);
      rotateX(PI / 2);
      translate(0, 0, -250);
       
      if (i % 2 == 1) {
        emissiveMaterial(random(255),0, random(255))
      }
      push();
      rotateZ(100 / i);
      specularMaterial(50,0,128);
      box(100, 100, 10);
      pop();
      pop();
    }
    pop();
  }
//  noLoop();
}

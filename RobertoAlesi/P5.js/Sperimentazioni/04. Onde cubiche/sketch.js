let angle = 0;

//modulo
let m = 54;

let ma;
let maxd;

function setup() {
  createCanvas(w = windowWidth, h = windowHeight, WEBGL);
  ma = atan(1 / sqrt(2));
  maxd = dist(0, 0, 200, 200);
}

function draw() {
  background(100);
  lights();
  orbitControl();
 // ortho(-400,400,400,-400,0,1000);
  translate(0,0,0);
  rotateX(PI/2);

  //creo piu rettangoli
  for (let z = 0; z < h; z += m) {
    for (let x = 0; x < w; x += m) {
      push();

      let d = dist(x, z, w / 2, h / 2);
      let offset = map(d, 0 , maxd, -PI, PI);

      let a = angle + offset;

      //altezza rettangolo
      let alt = floor(map(sin(a), -1, 1, 100, 300));

      translate(x - w / 2, 0, z - h / 2);
      specularMaterial(110,0,200);
      box(m - 2, alt, m - 2);


      pop();
    }

   }
  angle += 0.05;


}

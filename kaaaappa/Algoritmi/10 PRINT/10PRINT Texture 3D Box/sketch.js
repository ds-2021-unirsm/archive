let art;
let angle = 0;
let index = 0;

function setup() {
  createCanvas(720, 500, WEBGL);
  art = createGraphics(400, 400);
}

function draw() {
  background(0);

  let righe = int(random(5, 15));
  let colonna = height / righe;
  let spessore = random(2, 10);
  let uth1 = colonna / spessore;
  let uth2 = colonna + uth1;
  let startX = int(-colonna * 5);
  let startY = height / 2 - (righe / 2) * colonna;
  let endX = width + colonna;
  let endY = height / 2 + (righe / 2) * colonna;

  art.background(0);
  for (let x = startX; x < endX; x += colonna) {
    for (let y = startY; y < endY; y += colonna) {
      if (random(1) > 0.5) {
        
        art.fill(255);
        art.quad(
          x,
          y,
          x + colonna,
          y + colonna,
          x + uth2,
          y + colonna,
          x + uth1,
          y
        );
      } else {
        art.fill(0, 255, 202);
        art.quad(
          x,
          y + colonna,
          x + colonna,
          y,
          x + uth2,
          y,
          x + uth1,
          y + colonna
        );
      }
    }
  }

  push();
  texture(art);
  rotateX(angle);
  rotateY(angle);
  rotateZ(angle);
  box(200);

  angle += 0.007;
  pop();

  //noLoop();
}

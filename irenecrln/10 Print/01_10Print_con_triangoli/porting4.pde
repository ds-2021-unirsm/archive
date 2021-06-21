size(1000, 700);
noStroke();
background(243, 218, 216);
int rows = int(pow(2, int(random(1, 6)))); //qui decide ul numero di righe sulla quale scrivere le barrette
int u = height / (rows + 4); //è un unità che da una casualità
int thickness = int (pow(1, int (random(1, 4)))); //serve per spostare i vertici e quindi per creare dei rettangoli di spessore diverso, xk usa la potenza?
int uth1 = u / thickness;
int uth2 = u + uth1;
int startX = int(-u * 0.75);
int startY = height/2 - rows/2 * u;
int endX = width+u;
int endY = height/2 + rows/2 * u;


for (int x = startX; x < endX; x+= u) {
  for (int y = startY; y < endY; y += u) {
    if (random(1) > 0.5) {
      fill(131, 119, 209, 90);
        triangle(x, y, x+u, y+u, x+uth1, y);
    }
    else {
      fill(214, 73, 51, 50);
        triangle(x, y+u, x+u, y, x+uth1, y+u);
    }
  }
}

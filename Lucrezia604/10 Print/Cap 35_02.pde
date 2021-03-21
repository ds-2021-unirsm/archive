size(1020, 680);
noStroke();
background(0, 0, 255);
int rows = int(pow(2, int(random(4, 2))));
int u = height / (rows + 4);
int startX = int(-u * 1.46);
int startY = height/2 - rows/2 * u;
int endX = width+u;
int endY = height/2 + rows/2 * u;
for (int x = startX; x < endX; x += u) {
for (int y = startY; y < endY; y += u) {
  int thickness = int(pow(2, int(random(3, 6))));
  int uth1 = u / thickness;
  int uth2 = u + uth1;
if (random(1) > 0.5) {
fill(255);
quad(x, y, x+u, y+u, x+uth2, y+u, x+uth1, y);
}
else {
fill(0);
quad(x, y+u, x+u, y, x+uth2, y, x+uth1, y+u);
}
}
}

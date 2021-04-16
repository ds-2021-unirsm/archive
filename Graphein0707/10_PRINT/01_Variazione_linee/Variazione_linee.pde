int x = 0;
int y = 0; 
int box = 30;

void setup() {
  size(1000, 600); 
  background(255); 
  strokeWeight(3); 
  smooth();
  //funzione che colora le linee in modo casuale
  colorStroke();
}


void draw() {
  if (random(2) < 1) {
    line(x, y, x + box, y + box);
  } else {
    line(x + box, y, x, y + box);
  }
  x += box;


  // inizia una nuova riga x
  if (x >= width) {
    x = 0; // torniamo alla posizione iniziale sull'asse x
    y += box; 
    //funzione che colora le linee in modo casuale
    colorStroke();
  }

  //se y arriva a 600 crea un rettangolo bianco e ricomincia
  if (y >= height) {
    //Copriamo la composizione prima con un rettangolo semi trasparente:
    fill(255, 200); 
    rect(-10, -10, width+20, height+20); //rettangolo abbondante rispetto alla finestra
    y = 0; // torniamo alla posizione iniziale sull'asse y per ricominciare la composizione
  }
} 

//funzione che colora le righe x di linee in modo casuale
void colorStroke() { 
  stroke(random(255), 20, random(255));
}

void mousePressed(){
   stroke(255,255,0);
}

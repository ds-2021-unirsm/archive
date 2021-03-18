//Il numero di righe e
///colonne nella griglia è variabile, 
//la direzione della linea ne definisce il colore (nero o bianco), 
//ogni linea è definita come un quadrilatero per dare maggiore flessibilità 
//alla forma e per lo sfondo viene utilizzato un terzo colore.

size(1020, 680);
noStroke();
background(255);

//creo un numero a caso
//potenza di 2 alla random()
int rows = int(pow(2, int(random(1, 6)))); //Ogni volta che viene eseguito il codice, 
                                           //la dimensione dell'unità della griglia 
                                           //viene definita casualmente come una potenza di 2
//definisce altezza di 1 riga
int u = height / (rows + 10);

//definisce casualmente lo spessore
int thickness = int(pow(2, int(random(1, 14)))); //lo spessore delle linee 
                                                //viene impostato casualmente su 2, 4 o 8.
//due valori che dipendono dallo spessore
int uth1 = u / thickness;
int uth2 = u + uth1;

//definisce l'area rettangolare entro cui disegna tutto, centrandola
int startX = int(-u * 0.75);
int startY = height/2 - rows/2 * u;
int endX = width+u;
int endY = height/2 + rows/2 * u;

//disegna
for (int x = startX; x < endX; x += u) {
  for (int y = startY; y < endY; y += u) {
    if (random(1) > 0.5) {
      fill(200,162,200); 
      quad(x, y, x+u, y+u, x+uth2, y+u, x+uth2, y);
    }
    else {
      fill(108,70,117);
      quad(x, y+u, x+u, y, x+uth1, y, x+uth2, y+u);
    }
  }
}

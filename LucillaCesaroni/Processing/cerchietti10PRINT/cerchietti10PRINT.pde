// cerchietti 10PRINT
// Lucilla Cesaroni

//quando il programma inizia, le variabili fuori i blocchi sotto sono dichiarate e assegnate
int w = 16;
int h = 16;
int index = 0;

void setup() { //letto dall'alto al basso.
  size(640, 384); //la grandezza della finestra è 640px larga e 384 alta
  background(#000000); //colore del background
  smooth(); //The level parameter increases the amount of smoothness.
            //Drawa all geometry with smooth (anti-aliased) edges.
}

void draw() { //lo elabora finche il programma non viene terminato
  int x1 = w*index;
  int x2 = x1 + w;
  int y1 = h*23;
  int y2 = h*24;
  
  if (random(2) < 1) { //il random ritorna valori tra 0 e 2 (non includendo il 2)
    circle(x1, y1, 4); 
    strokeWeight(1); //spessore linea
    stroke(128,0,128); //colore linea
  } else {
    circle(x1, y1, 10); //2 possibile linea
    strokeWeight(1); //spessore linea
    stroke(0,128,128); //colore linea
  }
  
  index++; //l'index diventa 1
  
  if (index == width/w) { //sposta il labirinto in alto 
                          //quando la linea del labirinto
                          //attualmente tracciata è riempita
    PImage p = get(0, h, width, h*23); //prende quello che sta dentro queste coordinate
                                       //x, y, w larghezza del rettangolo da prendere, h
    background(#000000);
    set(0, 0, p); //e lo porta a 0,0 di p (lo tira su)
                  //Cambia il colore di qualsiasi pixel 
                  //o scrive un'immagine direttamente nella finestra 
                  //di visualizzazione.
                  //The x and y parameters specify the pixel 
                  //to change and the c parameter specifies the color value. 
    index = 0; //l'index ritorna a 0
  }
}

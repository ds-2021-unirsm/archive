int rows = int(pow(2, int(random(1, 2)))); //qui decide ul numero di righe sulla quale scrivere le barrette
int u = height/ (rows); //è un unità che da una casualità
int thickness = int(pow(1, int(random(1, 4)))); //serve per spostare i vertici e quindi per creare dei rettangoli di spessore diverso, usa la potenza x mettere uno spazio tra una linea e l'altra
int uth1 = u / thickness;
int uth2 = u + uth1;
int startX = int(-u * 0.75); //x creare un numero negativo diverso da zero che sarà il primo vertice da dove inizia il disegno (da dove parte il quad) ed è negativo così esce dalla finestra (taglio a vivo)
int startY = height - rows * u; //startx e starty servono per dare il primo punto del disegno sullo schermo
float endX = width*10.2 ;
int endY = height*7;
int colore = 0;
int x ;
int y ;

void setup() 
{
size(1020, 700);
noStroke();
background(243, 218, 216);
}

void draw()
{
  for (  x= startX; x < endX; x+= u) 
  {
    for ( y= startY; y < endY; y += u) 
    {
      if (random(1) > 0.5) 
      {
        fill(158, 68, 52);
        triangle(x, y, x+u, y+u, x+uth1, y);
      }
      else
      {
        fill(214, 73, 51, 50);
        triangle(x, y+u, x+u, y, x+uth1, y+u);
      }
      mouseClicked();
      
    }
  }
            delay (100);         
}


void mouseClicked() 
{ 
  if (colore == 0) 
  {
    fill(212, 153, 185);
    triangle(x, y, x+u, y+u, x+uth1, y);
    colore=1;
  } 
  else 
  {
    colore = 0;
  }
}

//reference https://www.youtube.com/watch?v=r5Iy3v1co0A&t=543s

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255)
  
  //crea un pattern di linee lungo tutta la larghezza della finestra
  for (let i = 0; i < width; i++) {
    
    //lo ripete per tutta la lunghezza
    for (let l = 0; l < height; l += 50) {
      
      //determina la lunghezza della linea che varia da 0 a 49
      var lineY = i % 50;
      strokeWeight(3);
      line(i, l, i, lineY + l); 
      
      //lineY+l permette ad ogni ciclo di spostare 
      //il pattern in modo tale che non si sovrapponga 
      //a quello precedente
    }
  }
}

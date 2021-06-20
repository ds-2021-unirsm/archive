// -
// Random Giphy Gif 0.1 by Lucrezia Nediani [Gif, Estrazione random]
// 2021 © Lucrezia Nediani, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/Lucrezia604 — github.com/fupete
// Educational purposes, MIT License, 2021, San Marino
// —
// Credits/Thanks to: 
// @aferriss for https://editor.p5js.org/aferriss/sketches/HJgbT8UpM
// original license: MIT License
// —
// Help:
// Vengono riprodotte cliccando sullo schermo fino ad un massimo di 10
// —


//url api sito giphy
let apiUrl = "https://api.giphy.com/v1/gifs/random?api_key=2BXIaO9m3yFL15yhQV2LkXuUydxTdBep";
let cnt = 0;   //contatore numero di GIF stampate
 
function setup() { 
  noCanvas();   //rimuove il canvas di default
  createP("Clicca per un GIF casuale");   //scrive sullo schermo
} 

//ogni volta che clicco con il mouse
function mousePressed() {
  //se ho cliccato meno di 10 volte
  if(cnt < 10){
    loadJSON(apiUrl, giphyLoaded);    //carico una GIF
  }

}

function giphyLoaded(respObj) {
  cnt++;   //aumento il contatore
  console.log("in loaded", respObj);   //scrivo in console
  let imgsrc = respObj.data.image_original_url;   // recupero l'url della GIF
  removeElements();   //rimuovo eventuali elementi precedenti
  createImg(imgsrc);  //creo l'immagine 
  
  //se cnt è minore di 10 può chiedere un'altra GIF
  if(cnt <10)
    createP("Clicca per una GIF casuale");  
  
  //se cnt = 10 gli dico stop
  if(cnt == 10)
  {
    createP("stop"); 
    cnt++;
  } 
}

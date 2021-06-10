// —
// 10Print - variazione 1 by lufaraci [10print, random, img]
// 2021 © Lucrezia Faraci, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/lufaraci
// Educational purposes, MIT License, 2021, San Marino
// —
//
// —

let w = 16; //larghezza elemento
let h = 16; //altezza elemento
let index = 0; //"indice"

let img1;
let img2;
let imgg = [];

function preload() {
  img1 = loadImage("img/c.blu.png");
  img2 = loadImage("img/bot2.png");
  imgg = [img1,img2,img1];
}

function setup() {
      createCanvas(640, 384);
      background(255);
      strokeWeight(0);
      noStroke(); //nero
      //stroke(224); 
      smooth();
}
function draw() {
  
let x1 = w*index; //16 * 1, 16 * 2, 16 * 3 ...
let y1 = h*23;   //16 * 23 + 16 == h
strokeWeight(4);
       
      let n = int(random(1,3)); 
      console.log(n);

      if (random(10) < 9) {
        fill(0,random(220,255),random(200,255));
        circle(x1, y1+16, 16);
      } else {
        image(imgg[n], x1, y1-15, 40, 40);
      }
index++;
if (index == width/w) { //quando arriva al totale di elementi possibili su una riga vai a capo
   p = get(0, h, width, h*23);  //estrae valori 
   background(0,255,255);
   
   set(0, 0, p);
index = 0; //azzera l'index
} 
}
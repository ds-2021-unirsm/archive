//  ______  ____  ___  _______  __________ ______ ____ ______________
//  __/ _ \/ __ \/ _ )/ __/ _ \/_  __/ __ \ _/ _ |_/ /__/ __/ __/  _/
//  _/ , _/ /_/ / _  / _// , _/ / / / /_/ / / __ |/ /__/ _/_\ \_/ /
//  /_/|_|\____/____/___/_/|_| /_/  \____/ /_/ |_/____/___/___/___/
//
// -
// Vasarely_Slider 0.1 by Roberto [victor, vasarely, slider]
// 2021 © Roberto @ciunart, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm — github.com/fupete — github.com/RobertoAlesi
// Educational purposes, MIT License, 2021, San Marino
// —

let slider;
let valr;
let valn;
let vals;

function setup() {
      createCanvas(w= 400, h = 400);
      rectMode(CENTER);
      slider = createSlider(-2*PI, 2*PI, 0,0.001);
      slider.position(10, 10);
      slider.style('width', '80px');
      
      slider2 = createSlider(5, 50, 10, 2);
      slider2.position(10, 30);
      slider2.style('width', '80px');
  

    
  }

  function draw(){

      background(240);
      noStroke();
      translate(w/2, h/2-50);
      valr = slider.value();
      valn = slider2.value();
       
    for (var i=0; i <valn; i++) {
          fill((i*5)+valr*-30, i*10-valr, 255+valr*15);
          push();
          scale(5/i);
         rotate(valr/i);
         if (i % 2 == 1){
          fill(0)
        }
      
          rect(100, 100, 500);
          pop();
        }
   // noLoop();
  }

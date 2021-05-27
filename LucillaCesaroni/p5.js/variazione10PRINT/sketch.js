//         ___       ________     
//        |\  \     |\   ____\    
//        \ \  \    \ \  \___|    
//         \ \  \    \ \  \       
//          \ \  \____\ \  \____  
//           \ \_______\ \_______\
//            \|_______|\|_______|
                                  
// -
//
// Variazione 10PRINT by Lucilla Cesaroni 
// 2021 Lucilla @LucillaCesaroni, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm - github.com/fupete - github.com/LucillaCesaroni 
// Educational purposes, MIT License, 2021, San Marino
//
// —

let w, h;
let x = 0;
let y = 0;
let size = 20; // grandezza 
var noisex = 0;
var noisey = 0;
var destraSinistra; // sceglie se obliq a dx o sx

function setup() {
    createCanvas(w = windowWidth, h = windowHeight);
    background(255);
    colorMode(HSB);
}

function draw() {
    destraSinistra = random(1); // barra a destra o sinistra?

    // scelta se obliqua a dx o sx
    if (destraSinistra < 0.5) {
        strokeCap(PROJECT); // estremità estese
        strokeWeight(noise(noisex, noisey) * 1.5); // leggermente piu sottile
        stroke(noise(noisex, noisey) * 360, noise(noisex, noisey) * 100, noise(noisex, noisey) * 100); // tutti i valori (tonalita, saturazione, luminosità) dipendono dal noise
        line(x, y, x + size, y + size); // piccolo
    } else if (destraSinistra > 0.5) {
        strokeCap(SQUARE);
        strokeWeight(noise(noisex, noisey) * 5); // leggermente piu spesso
        stroke(noise(noisex, noisey) * 360, noise(noisex, noisey) * 100, noise(noisex, noisey) * 100);
        line(x, y + size, x + size, y); // grande
    }

    x += size; // scorro a dx la prossima barretta
    noisex += 0.3; // più alto, più la variazione si vede

    // andare a capo
    if (x > w) {
        x = 0;
        y += size;
        noisex = 0;
        noisey += 0.3;
    }
}

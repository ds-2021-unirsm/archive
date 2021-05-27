//         ___       ________     
//        |\  \     |\   ____\    
//        \ \  \    \ \  \___|    
//         \ \  \    \ \  \       
//          \ \  \____\ \  \____  
//           \ \_______\ \_______\
//            \|_______|\|_______|
                                  
// -
//
// Camminatore laser by Lucilla Cesaroni 
// 2021 Lucilla @LucillaCesaroni, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm - github.com/fupete - github.com/LucillaCesaroni 
// Educational purposes, MIT License, 2021, San Marino
//
// —

var w, h;
var quanti = 10; // vertici
var c = []; // array vuoto che contiene gli oggetti che sono i camminatori
var speedMax = 0.4; // velocità movimento

function setup() {
    createCanvas(w = windowWidth, h = windowHeight);
    strokeWeight(1); // spessore linea
    strokeCap(ROUND); // estremità tonde

    // crea n oggetti di classe Camminatore
    for (var i = 0; i < quanti; i++) {
        c.push(new Camminatore(i));
    }
}

function draw() {
    background(0, 9);

    // per tutti i camminatori chiama i diversi metodi utili 
    for (var i = 0; i < quanti; i++) {
        c[i].move();
        c[i].display();
    }
}

// classe
function Camminatore(_id) {
    background(0);

    // costruttore
    this.id = _id;

    this.x = random(w);
    this.y = random(h);

    this.speed = random(0, speedMax);


    this.noiseX = random(1000);
    this.noiseY = random(2000);

    // metodo move
    this.move = function () {
        this.x = w * noise(this.noiseX); // piu speed è alto piu la particella si muove per spazi piu ampi
        this.y = h * noise(this.noiseY);

        this.noiseX += 0.01 * this.speed;
        this.noiseY += 0.02 * this.speed;
    }

    // metodo display
    this.display = function () {
        stroke(map(this.y, 0, h, 0, 255), map(this.x, 0, w, 0, 255), map(this.speed, 0, speedMax, 0, 255));

        if (this.id == quanti - 1) { // controllo se l'oggetto in questione è l'ultimo elemento generato 
            this.qualeAltro = 0;
        } else this.qualeAltro = this.id + 1; //quale altro è l'oggetto successivo all'oggetto in questione

        line(this.x, this.y, c[this.qualeAltro].x, c[this.qualeAltro].y);

        fill(map(this.y, 0, h, 0, 255), map(this.x, 0, w, 0, 255), map(this.speed, 0, speedMax, 0, 255));
        ellipse(c[this.qualeAltro].x, c[this.qualeAltro].y, 5);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

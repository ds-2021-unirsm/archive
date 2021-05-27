//         ___       ________     
//        |\  \     |\   ____\    
//        \ \  \    \ \  \___|    
//         \ \  \    \ \  \       
//          \ \  \____\ \  \____  
//           \ \_______\ \_______\
//            \|_______|\|_______|
                                  
// -
//
// Incontri/scontri tra camminatori che cambiano la via by Lucilla Cesaroni [bouncing]
// 2021 Lucilla @LucillaCesaroni, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm - github.com/fupete - github.com/LucillaCesaroni 
// Educational purposes, MIT License, 2021, San Marino
//
// —
//
// Help:
// [keypressed] cancella l'ultimo camminatore
// [mouseX, mouseY] posiziona un nuovo camminatore nelle coordinate del mouse
//
// —

var w, h;

let camminatore = []; // array vuoto per i camminatori
let quanti = 15;
let t = 0;

function setup() {
    createCanvas(w = windowWidth, h = windowHeight);
    rectMode(CENTER);

    for (var i = 0; i < quanti; i++) {
        camminatore[i] = new Walker(random(w), random(h)); // random x e y del camminatore
    }
}

function draw() {
    background(255, 20);

    // per tutti i camminatori chiama i diversi metodi utili 
    for (var i = 0; i < camminatore.length; i++) {

        camminatore[i].move();
        camminatore[i].display();

        // se i non è j, e il camminatore i si interseca con il camminatore j allora cambia colore e percorso
        for (var j = 0; j < camminatore.length; j++) {
            if (i != j && camminatore[i].interseca(camminatore[j])) {

                camminatore[i].scontro();
                camminatore[j].scontro();

                camminatore[i].cambiaColore();
                camminatore[j].cambiaColore();

                if (camminatore[i].r > 20 || camminatore[j].r > 20) {
                    console.log("BOM i: " + camminatore[i].r);
                    console.log("BOM j: " + camminatore[j].r);
                    camminatore.splice(i, 1); // se il raggio di i o j è > di 20, viene cancellata
                }
            }
        }
    }
}

// metti un nuovo camminatore nelle cordinate x e y del mouse
function mousePressed() {
    camminatore.push(new Walker(mouseX, mouseY));
}

// cancello gli ultimi camminatori creati
function keyPressed() {
    camminatore.pop();
}

// camminatore
function Walker(x, y) {

    this.x = x; // posizione nella canvas
    this.y = y;

    this.xspeed = random(6);
    this.yspeed = random(6);

    this.r = 10; // raggio iniziale di ogni pallina

    this.t += 0.01;

    this.col = color(0); // colore iniziale

    // metodo interseca
    this.interseca = function (other) {
        this.d = dist(this.x, this.y, other.x, other.y); //Calculates the distance between two points

        // c'è uno scontro se la distanza è minore della somma dei due raggi
        if (this.d <= this.r + other.r) {
            this.r += 0.02; // aumento il raggio ad ogni scontro di 0.02
            this.xspeed += 0.02 // sempre più veloci
            this.yspeed += 0.02; // sempre più veloci
            return true;
        } else {
            return false;
        }
    }

    // metodo cambiaColore
    this.cambiaColore = function () {
        this.col = color(random(255), 20, random(255));
    }

    // metodo display
    this.display = function () {
        noStroke();
        fill(this.col);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }

    //metodo move
    this.move = function () {

        this.x = this.x + this.xspeed * noise(t);
        this.y = this.y + this.yspeed * noise(t);

        if (this.x > w - this.r || this.x < this.r) {
            this.xspeed = this.xspeed * -1; // così torna indietro
        }
        if (this.y > h - (this.r * 2) || this.y < (this.r * 2)) {
            this.yspeed = this.yspeed * -1;
        }
    }

    // metodo scontro
    this.scontro = function () {
        this.xspeed = this.xspeed * -1; // così torna indietro
        this.yspeed = this.yspeed * -1;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

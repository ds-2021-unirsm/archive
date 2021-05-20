// -
//
// Pattern con modulo 0.1 by Lucilla Cesaroni [mouseX, mouseY]
// 2021 Lucilla @LucillaCesaroni, Daniele @Fupete and the course DS-2021 at DESIGN.unirsm 
// github.com/ds-2021-unirsm - github.com/fupete - github.com/LucillaCesaroni 
// Educational purposes, MIT License, 2021, San Marino
//
// —
//
// Help:
// [c] save canvas
//
// —

let w, h;
let d = 50; // grandezza del cerchio esterno
let d2 = 15; // diametro max cerchio
let angle = 0;

function setup() {
    c = createCanvas(w = windowWidth, h = windowHeight);
    rectMode(CENTER);
    ellipseMode(CENTER);
    angleMode(DEGREES);
    colorMode(HSB, 360, 100, 100);
}

function draw() {
    background(0);
    for (x = 20; x < w; x += 50) {
        for (y = 30; y < h; y += 55) {
            push();
            translate(x, y);
            rotate(angle);
            noFill();
            stroke(255);
            rect(0, 0, d);
            rect(0, 0, d - 12);
            rect(0, 0, d - 25);
            rect(0, 0, d - 35);

            angle = map(mouseX, 0, width, 0, 360);

            pop();
        }
    }
    for (x = 20; x < w; x += 50) {
        for (y = 30; y < h; y += 55) {
            if (x % 4 == 0 && y % 2 == 0) {
                // Scale the mouseX value from 0 to w to a range between 0 and 255
                let color = map(mouseX, 0, w, 0, 360);
                // Scale the mouseX value from 0 to h to a range between 10 and 300
                let scale = map(mouseX, 0, w, 1, d2);

                var h2 = 360 * noise(color + 5);
                var s = 100; //saturazione
                var b = 100;
                fill(h2, s, b);
                noStroke();
                ellipse(x, y, scale);
            } else {
                ellipse(x, y, 0);
            }
        }
    }
}

//premi tasto, screen del poster
function keyPressed() {
    saveCanvas(c, 'Poster', 'jpg');
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

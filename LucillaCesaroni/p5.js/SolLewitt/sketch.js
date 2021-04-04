var w, h;

function setup() {
    createCanvas(w = windowWidth, h = windowHeight);
}

function draw() {
    background(252, 226, 5); // giallo 

    stroke(127, 0, 255); // viola

    beginShape();
    for (var i = 0; i < h; i++) {
        var n_i = map(i, 0, h, 0, 1); // per ogni altezza definisce un valore i
        var y = width * noise(n_i);

        vertex(y, i);
        vertex(w, i);
    }
    endShape();

}

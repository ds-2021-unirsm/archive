 var camminatori = [];
 var totaleCamminatori = 50

 function setup() {
   background(255);
   createCanvas(windowWidth, windowHeight);
   print("se si clicca sulla canvas lo sfondo cambierà tonalità di grigio")

   for (var i = 0; i < totaleCamminatori; i++) {
     camminatori.push(new Camminatore());
   }
 }

 function draw() {
   for (var i = 0; i < totaleCamminatori; i++) {
     camminatori[i].move();
     camminatori[i].display();
   }
 }

 function Camminatore() {

   this.x = 0;
   this.y = 0;
   this.t = random(10);
   this.tIncr = random(0.05, 1) * 0.01;
   this.r = 255 * noise(this.t);
   this.g = 255 * noise(this.t + 5);
   this.b = 255 * noise(this.t + 10);
   //diametro
   this.d = 100 * noise(this.t + 10);


   this.move = function() {
     this.x = noise(this.t) * width;
     this.y = noise(this.t + 20) * height;
     this.t += this.tIncr;
   }

   this.display = function() {
     fill(this.r, this.g, this.b, 10);
     stroke(255, 30);
     rect(this.x, this.y, this.d * noise(this.t + 20), this.d * noise(this.t));
   }
 }

function mousePressed () {
background(random(255));
}

 var t;
 var t2;
 var camminatori = [];
 var totaleCamminatori = 10

 function setup() {
   background (0);
   createCanvas(400, 400);
   t = 0;
   t2 = 1000;
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

   this.move = function() {
     this.x = map(noise(t), 0, 1, 0, width);
     this.y = map(noise(t2), 0, 1, 0, width);
     this.r=255*noise(t+5);
     this.g=255*noise(t+10);
     this.b=255*noise(t+15);
     //diametro
     this.d=100*noise(t+10);

     //incremento la variabile
     t += 0.001;
     t2 += 0.001;
   }

   this.display = function() {
     fill(this.r, this.g, this.b, 10);
     noStroke();
     rect(this.x, this.y, this.d, this.d*noise(t));
   }
 }

function User(x, y, l) {
  this.pos = createVector(x, y);
  this.l = l;
  this.vel = createVector(0, 0);

this.update = function() {
  var newvel = createVector (mouseX - width / 2, mouseY - height/2);
  newvel.div(50);
  newvel.limit(3);
  this.vel.lerp(newvel, 0.2);
  this.pos.add(this.vel);
};

this.constrain = function(){
  user.pos.x = constrain(user.pos.x, 0, width);
  user.pos.y = constrain(user.pos.y, 0, height);
}


//mostra l'utente
 this.show = function() {
    //fill(255);
    //ellipse(this.pos.x, this.pos.y, this.l*2, this.l*2);
  };
}

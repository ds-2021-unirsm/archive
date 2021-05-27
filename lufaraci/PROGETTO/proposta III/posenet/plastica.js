class plastica{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.r = random(2,20);
    this.velocity = random(-5,5);
    this.velocitx = random(-5,5);
}
  update(){
    this.x += this.velocitx;
    this.y += this.velocity;    
  }
  
  disegna(){
    push();
    noStroke();
    translate(this.x,this.y);
    fill(200,0,200, this.vita);
    ellipseMode(RADIUS);
    ellipse(0,0,this.r, this.r);
    let nr = int(random(0, 4));
    let can = imgs[nr];
    image(can, this.x, this.y,8,8);
}
}
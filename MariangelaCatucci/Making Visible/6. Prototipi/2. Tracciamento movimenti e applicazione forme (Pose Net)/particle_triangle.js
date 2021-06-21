class particle_triangle{
  constructor(x,y){
    this.x=x;
    this.y=y;
    this.r=random(10,60);
    this.vita=random(30,150);
    //this.velocitax=random(0,5);
    //this.velocitay=random(0,5);
    
  }
  update(){
    this.x+=random(-5, 5);
    this.y+=random(-5, -10);
    this.vita-=random(0, 5);
  }
  
  disegna(){
    push();
     translate(this.x,this.y);
     fill(255, 255, 0, 60);
     noStroke();
     //ellipseMode(RADIUS);
     //ellipse(0,0, this.r,this.r);
    triangle(this.r*2, this.r*3, this.r/2, this.r*2, this.r*2, this.r/3);
    pop();
  }
}
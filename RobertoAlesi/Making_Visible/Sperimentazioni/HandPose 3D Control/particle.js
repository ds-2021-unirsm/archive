class particle{
  constructor(x,y){
    this.x=x;
    this.y=y;
    this.r=random(1,3);
    this.vita=random(10,30);
    this.velocitax=random(-1,1);
    this.velocitay=random(-1,1);
    
  }
  update(){
    this.x+=this.velocitax;
    this.y+=this.velocitay;
    this.vita-=random(0,3);
    
    if (this.d>0.2) this.d-=0.1;
  }
  
  disegna(){
    push();
     translate(this.x,this.y);
     fill(200,130,200,this.vita);
     noStroke();
     ellipseMode(RADIUS);
     ellipse(0,0, this.r,this.r);    
    pop();
  }
}

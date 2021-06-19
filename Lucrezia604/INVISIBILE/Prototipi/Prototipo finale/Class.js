let palette = ["#7CBA3B", "#E96C12", "#F2DBEB", "#F18F7E", "#E8E34E", "#E61C67", "#3881C0", "#24B3AB", "#AFA0CE", "#DD1217"];

class eye{
  constructor() {
    this.centroX = 100;   //coordninata x per la traslate
    this.centroY = 100;   //coordninata y per la traslate
    this.x = 0;  //coordinata x della forma
    this.y = 0;  //coordinata y della forma
    this.livellosuono = 0;  //livello del suono per ingrandire la forma
    this.color = [int(random(10)),int(random(10)),int(random(10)),int(random(10))];  //angolo del colore
    this.tipo = 2;    //tipo di forma
    this.raggio = 50;  //raggio della forma
    this.velocità;      //velocità della forma
  }
  
  AggiornaSuono(soundlevel){
    this.soundlevel = soundlevel;
  }
  
   Aggiornaposizione(x,y){
    this.centroX = x;
    this.centroY = y;
  }
  
  RetRaggio(){
    return this.raggio;
  }
  
  RetColor(angle){
    
    return ((this.color+angle)%360);
  } 
 
  //random del colore
  RandomColor(){
    for(let i = 0;i < 4; i++)
      {
        this.color[i] = int(random(10));
      }
  }   
  
  CambiaTipo(t)
  {
    if(t == 3)
      this.tipo = 0;
    else
      this.tipo = t;
  }
  
  Cambiagrandezza(r)
  {
    this.raggio = r;
  }
  
  CambiaVelocità(f)
  {
    this.velocità = f; 
  }
  
  Stampa(grand){
    if(this.tipo == 0)
      {
        push();
        rectMode(CENTER);   //stampa la forma dal centro        
        triangle(0, this.y - grand, 
          this.x + (cos(150) * grand), 
          this.y + (sin(150)* grand), 
          this.x - (cos(150)* grand), 
          this.y + (sin(150)* grand) ); 
        pop();
      }
    else if(this.tipo == 1)
      {
        //cerchio grande fisso sull'occhio
        if(grand == (this.raggio + this.soundlevel))
          {
            push();
            ellipseMode(CENTER);
            ellipse(this.x ,this.y,grand*2);
            pop();
          }
        else
          {
            //cerchi piccoli orbitano nell'occhio grande
            push();
            ellipseMode(CENTER)
            ellipse(this.x - (((this.raggio + this.soundlevel) - grand)/2),
                    this.y - (((this.raggio + this.soundlevel) - grand)/2),grand*2);
            pop();
          }
      }
    else if(this.tipo == 2)
      {
        push();
        rectMode(CENTER);
        rect(this.x,this.y,grand*1.5,grand*1.5);
        pop();
      }
  }
  
stampaocchio(frame)
{
  let colore;
  
  //occhio grande
  push();  
  translate(this.centroX,this.centroY);   //centrato sul punto dell'occhio
  rotate(this.velocità);   //rotazione della forma   
  fill(color(palette[this.color[0]]));
  this.Stampa(this.raggio + this.soundlevel);
  pop(); 
  
  //occhio medio-grande
  push(); 
  translate(this.centroX,this.centroY); //centrato sul punto dell'occhio
  rotate(-this.velocità); //rotazione della forma 
  fill(color(palette[this.color[1]])); 
  this.Stampa(((this.raggio + this.soundlevel)/5)*4);
  pop(); 

  //occhio medio
  push(); 
  translate(this.centroX,this.centroY); //centrato sul punto dell'occhio
  rotate(this.velocità); //rotazione della forma 
  fill(color(palette[this.color[2]])); 
  this.Stampa(((this.raggio + this.soundlevel)/5)*2);
  pop(); 
  
  //occhio piccolo
  push(); 
  translate(this.centroX,this.centroY); //centrato sul punto dell'occhio
  rotate(-this.velocità); //rotazione della forma 
  fill(color(palette[this.color[3]]));
  this.Stampa((this.raggio + this.soundlevel)/10);
  pop(); 
}
  
}

class nose{
  constructor() {
    this.centroX = 100;
    this.centroY = 100;
    this.x = 0;
    this.y = 0;
    this.livellosuono = 0;
    this.color = int(random(10));
    this.tipo = 2;
    this.raggio = 50;
    this.velocità;
  }
  
  AggiornaSuono(soundlevel){
    this.soundlevel = soundlevel;
    
  }
  
  Aggiornaposizione(x,y){
    this.centroX = x;
    this.centroY = y;
  }
  
  RetRaggio(){
    return this.raggio;
  }
  
  RetColor(angle){
    
    return ((this.color+angle)%360);
  } 
 
  //random del colore
  RandomColor(){
    this.color = int(random(10));
  }  
  
  CambiaTipo(t)
  {
    if(t == 3)
      this.tipo = 0;
    else
      this.tipo = t;
  }
  
  Cambiagrandezza(r)
  {
    this.raggio = r;
  }
  
  CambiaVelocità(f)
  {
    this.velocità = f; 
  }
  
  Stampa(grand){
    if(this.tipo == 0)
      {
        push();
        rectMode(CENTER);        
        triangle(0, this.y - grand, 
          this.x + (cos(150) * grand), 
          this.y + (sin(150)* grand), 
          this.x - (cos(150)* grand), 
          this.y + (sin(150)* grand) ); 
        pop();
      }
    else if(this.tipo == 1)
      {
        if(grand == (this.raggio + this.soundlevel))
          {
            push();
            ellipseMode(CENTER);
            ellipse(this.x ,this.y,grand*2);
            pop();
          }
        else
          {
            push();
            ellipseMode(CENTER)
            ellipse(this.x - (((this.raggio + this.soundlevel) - grand)/2),
                    this.y - (((this.raggio + this.soundlevel) - grand)/2),grand*2);
            pop();
          }
      }
    else if(this.tipo == 2)
      {
        push();
        rectMode(CENTER);
        rect(this.x,this.y,grand*1.5,grand*1.5);
        pop();
      }
  }
  
  stampanaso(frame)
  {
    let colore;
  
    push();  
    translate(this.centroX,this.centroY);
    rotate(this.velocità);   
 
    fill(color(palette[this.color]));
    this.Stampa(this.raggio + this.soundlevel);
    pop();  
 
  }  
}

class mouth{
  constructor() {
    this.centro1X = 100;
    this.centro1Y = 100;
    this.centro2X = 100;
    this.centro2Y = 100;    
    this.x = 0;
    this.y = 0;
    this.livellosuono = 0;
    this.color = [int(random(10)),int(random(10))];
    this.tipo = 2;
    this.raggio = 50;
    this.velocità;
  }
  
  AggiornaSuono(soundlevel){
    this.soundlevel = soundlevel;
    
  }
  
  Aggiornaposizione1(x,y){
    this.centro1X = x;
    this.centro1Y = y;
  }  
  
  Aggiornaposizione2(x,y){
    this.centro2X = x;
    this.centro2Y = y;
  }    
  
  RetRaggio(){
    return this.raggio;
  }
  
  RetColor(angle){
    
    return ((this.color+angle)%360);
  } 
 
  RandomColor(){
    for(let i = 0;i < 2; i++)
      {
        this.color[i] = int(random(10));
      }
  }   
  
  CambiaTipo(t)
  {
    if(t == 3)
      this.tipo = 0;
    else
      this.tipo = t;
  }
  
  Cambiagrandezza(r)
  {
    this.raggio = r;
  }
  
  CambiaVelocità(f)
  {
    this.velocità = f; 
  }
  
  Stampa1(grand){
    
    let colore;
    
    if(this.tipo == 0)
      {
        
        push();
        rectMode(CENTER);
        fill(color(palette[this.color[0]]));
        triangle(0, this.y - grand/5, 
          this.x + grand, 
          this.y , 
          this.x - grand, 
          this.y ); 
        pop();

      }
    else if(this.tipo == 1)
      {
        push();
        ellipseMode(CENTER);
        fill(color(palette[this.color[0]]));
        ellipse(this.x ,this.y - (grand/8),grand*1.5,grand/4);
        pop();

      }
    else if(this.tipo == 2)
      {
        push();
        rectMode(CENTER);
        fill(color(palette[this.color[0]]));
        rect(this.x,this.y - grand/8,grand*1.5,grand/4);
        pop();
      }
  }

  Stampa2(grand){
    
    let colore;
    
    if(this.tipo == 0)
      {
        push();
        rectMode(CENTER);
        fill(color(palette[this.color[1]]));      
        triangle(0, this.y + grand/5, 
          this.x + grand, 
          this.y , 
          this.x - grand, 
          this.y );         
        
        pop();
      }
    else if(this.tipo == 1)
      {
        push();
        ellipseMode(CENTER);
        fill(color(palette[this.color[1]]));       
        ellipse(this.x ,this.y + (grand/8),grand*1.5,grand/4);
        pop();

      }
    else if(this.tipo == 2)
      {
        push();
        rectMode(CENTER);
        fill(color(palette[this.color[1]]));
        rect(this.x,this.y + grand/8,grand*1.5,grand/4);
        pop();
      }
  }  
  
  stampabocca()
  {
 
    push();  
    translate(this.centro1X,this.centro1Y);
    rotate(this.velocità);   
 
    this.Stampa1(this.raggio + this.soundlevel);
    pop(); 
    
    push();  
    translate(this.centro2X,this.centro2Y);
    rotate(this.velocità);   
 
    this.Stampa2(this.raggio + this.soundlevel);
    pop();     
 
  }  
}
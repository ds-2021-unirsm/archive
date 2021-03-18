let Palline = []; 
let num = 50; 
let posx = 0;
let posy = 0;
var colors = [
	"#69d2e7",
	"#a7dbd8",
	"#0000ff",
	"#f38630",
	"#00ffff"
]

function setup() {
  
  createCanvas(windowWidth, windowHeight ); 
  background(30);

  // numero di palline
  for (let i=0; i<num; i++) {
    Palline.push(new walker(i));
    
  }
}

function draw() {
  background(0);

// mostra palline
  for (var i=0; i<Palline.length; i++) {
    Palline[i].spostati();
    Palline[i].mostrati();
    
    }

}

// definizione della classe 
function walker(_id) {

  // dati e costruttore
  this.id = _id;
  let x = width/2+ random (-width/5,width/5);
  let y = height/2 + random (-height/5,height/5);
  this.t = random(1000);
  this.tIncr = random(-1, 1.10) * 0.03 //incremento la velocità
  
  

  // mostrati e spostati

  this.mostrati = function() {
    strokeWeight(10);

	fill(random(colors))
    circle(this.x,this.y, 100, 100);
  }

  this.spostati = function() {
    this.x = noise(this.t) * width; 
    this.y = noise(this.t + 2) * height;
    this.t += this.tIncr  
  }
}


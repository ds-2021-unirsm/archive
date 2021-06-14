let objectDetector;

let img_coco,
  travel_img,
  nature_img,
  fashion_img,
  sports_img,
  food_img,
  book_img,
  electronic_img,posx=0,posy=0;

let img_poster = [];
console.log(img_poster + "qui ci sono le img");

let objects = [];
let status;
let parole = [];

var categorie = [
  {
    categoria: "travel",
    oggetti: ["car", "motorcycle", "airplane", "bus", "train"],
    img: "img_categorie/travel.png",
  },

  {
    categoria: "nature",
    oggetti: [
      "potted plant",
      "bench",
      "bird",
      "cat",
      "dog",
      "horse",
      "sheep",
      "cow",
      "elephant",
      "bear",
      "zebra",
      "giraffe",
      "vase",
    ],
    img: "img_categorie/nature.png",
  },

  {
    categoria: "fashion",
    oggetti: ["hat", "shoe", "suitcase", "tie", "handbag"],
    img: "img_categorie/moda.png",
  },

  {
    categoria: "sports",
    oggetti: [
      "bicycle",
      "frisbee",
      "skis",
      "snowboard",
      "sports ball",
      "kite",
      "baseball bat",
      "baseball glove",
      "skateboard",
      "surfboard",
      "tennis racket",
      "boat",
      "couch",
    ],
    img: "img_categorie/sport.png",
  },

  {
    categoria: "food",
    oggetti: [
      "plate",
      "wine glass",
      "cup",
      "fork",
      "knife",
      "spoon",
      "bowl",
      "banana",
      "apple",
      "sandwich",
      "orange",
      "broccoli",
      "carrot",
      "hot dog",
      "pizza",
      "donut",
      "cake",
    ],
    img: "img_categorie/food.png",
  },

  {
    categoria: "book",
    oggetti: ["book"],
    img: "img_categorie/book.png",
  },

  {
    categoria: "electronic",
    oggetti: ["tv", "laptop", "mouse", "remote", "keyboard", "cell phone"],
    img: "img_categorie/electronic.png",
  },
  
    {
    categoria: "mistery",
    oggetti: ["teddy bear","fire hydrant","stop sign","street sign"],
    img: "img_categorie/mistery.png",
  }
];

function preload() {
  img_coco = loadImage("images/stanza_assoluta.jpg");

  //for (let i = 0; i < categorie.length; i++) {
  //img_poster = loadImage(categorie[i].img);
  //}
  travel_img = loadImage("img_categorie/travel.png");
  nature_img = loadImage("img_categorie/nature.png");
  fashion_img = loadImage("img_categorie/moda.png");
  sports_img = loadImage("img_categorie/sport.png");
  food_img = loadImage("img_categorie/food.png");
  book_img = loadImage("img_categorie/book.png");
  electronic_img = loadImage("img_categorie/electronic.png");
  mistery_img = loadImage("img_categorie/mistery.png");
  vuoto_img = loadImage("img_categorie/vuoto.png");
}

function setup() {
  createCanvas(800, 600);
  background(252, 247, 242);
  line(200,0,200,400);
  line(400,0,400,400);
  line(600,0,600,400);
  line(0,200,800,200);
  line(0,400,800,400);

  objectDetector = ml5.objectDetector("cocossd", modelReady);
  console.log(categorie);
}

// Change the status when the model loads.
function modelReady() {
  console.log("model Ready!");
  status = true;
  console.log("Detecting");
  objectDetector.detect(img_coco, gotResult);
}

// A function to run when we get any errors and the results
function gotResult(err, results) {
  if (err) {
    console.log(err);
  }
  console.log(results);
  objects = results;
  for (let i = 0; i < objects.length; i++) {
    //mi faccio un array con le parole trovate
    parole.push(objects[i].label);
    console.log(parole);
  }

  cerca(parole, 0, 0, width / 2, height / 2);
  /*cerca(parole, width / 2, 0, width / 2, height / 2);
  cerca(parole, 0, height / 2, width / 2, height / 2);
  cerca(parole, width / 2, height / 2, width / 2, height / 2);*/
}

function cerca(parole, x, y) {
  for (let i = 0; i < parole.length; i++) {
    
     /*let c of categorie;
    switch(parole[i]) {
      case (c.oggetti.includes(parole[i]):
              loadImage(c.img, function (img) {
                 image(img, x, y, w, h)
        })
        break;
      case "cat":
          loadImage(categorie[1].img, img => {
            image(img, 0, 0, 200, 200) 
          })
        break;
      case "couch":
          loadImage(categorie[3].img, img => {
            image(img, 200, 0, 200, 200) 
          })*/
    for (let c of categorie) {
        if (c.oggetti.includes(parole[i])) {
          loadImage(c.img, function (img) {
            image(img, 0+posx, 0+posy, 200, 200); 
          posx += 200;
   if(posx>=800)
        {
        posx=0;
        posy=200;
        }
      
          });
                    
          }
    }
  }
}

function testo() {}

/*function draw() {
  if (status != undefined) {
    image(img_coco, 0, 0);
    //image(nature_img, 0, 0);
    
        for (let i = 0; i < objects.length; i++) {
      
        for (let k = 0; i < oggetti.length; k++){
          if (objects[i].label == categorie[0].oggetti[k]){
            image(travel_img, 0, 0);
          }
          
          if (objects[i].label == categorie[1].oggetti[k]){
            image(nature_img, 0, 0);
          }
          
        }
    }
  }*/

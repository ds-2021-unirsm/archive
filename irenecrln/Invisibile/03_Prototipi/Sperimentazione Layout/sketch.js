let objectDetector;

let img_coco,
  travel_img,
  nature_img,
  moda_img,
  sports_img,
  food_img,
  book_img,
  electronic_img;

let img_poster=[];
console.log(img_poster + "qui ci sono le img");

let objects = [];
let status;
parole = [];

var categorie = [
  {
    categoria: "travel",
    oggetti: ["car", "motorcycle", "airplane", "bus", "train"],
    img: "img_categorie/travel.png"
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
      "vase"
    ],
    img: "img_categorie/nature.png"
  },

  {
    categoria: "moda",
    oggetti: ["hat", "shoe", "suitcase", "tie", "handbag"],
    img: "img_categorie/moda.png"
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
      "boat"
    ],
    img: "img_categorie/sport.png"
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
      "cake"
    ],
    img: "img_categorie/food.png"
  },

  {
    categoria: "book",
    oggetti: ["book"],
    img: "img_categorie/book.png"
  },

  {
    categoria: "electronic",
    oggetti: ["tv", "laptop", "mouse", "remote", "keyboard", "cell phone"],
    img: "img_categorie/electronic.png"
  }
];
console.log(categorie[5].oggetti + "sono oggetti");

function preload() {
  img_coco = loadImage("images/cat2.JPG");

  for (let i = 0; i < categorie.length; i++) {
    img_poster = loadImage(categorie[i].img);
  }
  //travel_img = loadImage('img_categorie/travel.png');
  //nature_img = loadImage('img_categorie/nature.png');
  //moda_img = loadImage('img_categorie/moda.png');
  //sports_img = loadImage('img_categorie/sport.png');
  //food_img = loadImage('img_categorie/food.png');
  //book_img = loadImage('img_categorie/book.png');
  //electronic_img = loadImage('img_categorie/electronic.png');
}

function setup() {
  createCanvas(640, 420);

  objectDetector = ml5.objectDetector("cocossd", modelReady);
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
}

function draw() {
  // unless the model is loaded, do not draw anything to canvas
  if (status != undefined) {
    image(img_coco, 0, 0);

    for (let i = 0; i < objects.length; i++) {
      for (let j = 0; i < categorie.length; j++) {
        for (let k = 0; i < oggetti.length; k++){
          if (objects[i].label == categorie[j].oggetti[k]){
            poster = image(categorie[j].img, 0, 0);
            
          }
        }
      }
    }
  }
}

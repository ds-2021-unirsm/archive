let objectDetector;

let img_coco,
  travel_img,
  nature_img,
  fashion_img,
  sports_img,
  food_img,
  book_img,
  electronic_img;

let img_poster = [];
console.log(img_poster + "qui ci sono le img");

let objects = [];
let status;
let parole = [];
let categorie_trovate = [];

var categorie = [
  {
    categoria: "travel",
    oggetti: ["car", "motorcycle", "airplane", "bus", "train"],
    img: "img_categorie/travel.png",
    cit:"Travel"
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
    cit: "Nature"
  },

  {
    categoria: "fashion",
    oggetti: ["hat", "shoe", "suitcase", "tie", "handbag"],
    img: "img_categorie/moda.png",
    cit: "Coco Chanel"
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
    cit: "Arnold Schwarzenegger"
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
    cit: "Ratatouille"
  },

  {
    categoria: "book",
    oggetti: ["book"],
    img: "img_categorie/book.png",
    cit:"Fahrenheit 451"
  },

  {
    categoria: "electronic",
    oggetti: ["tv", "laptop", "mouse", "remote", "keyboard", "cell phone"],
    img: "img_categorie/electronic.png",
    cit:"IBM"
  },

  {
    categoria: "mystery",
    oggetti: ["teddy bear", "fire hydrant", "stop sign", "street sign"],
    img: "img_categorie/mistery.png",
    cit: "Mystery"
  },
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
  mystery_img = loadImage("img_categorie/mistery.png");
  vuoto_img = loadImage("img_categorie/vuoto.png");
}

function setup() {
  createCanvas(800, 600);
  background(252, 247, 242);
  line(200, 0, 200, 400);
  line(400, 0, 400, 400);
  line(600, 0, 600, 400);
  line(0, 200, 800, 200);
  line(0, 400, 800, 400);

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

  cerca(parole);
}

function cerca(parole) {
  for (let i = 0; i < parole.length; i++) {
    // trova la prima categoria che contiene un oggetto utile
    let categoria = categorie.find((c) => c.oggetti.includes(parole[i]));
    console.log(parole[i] + " trovato nella categoria " + categoria.categoria);

    // switchcase basato sulla categoria trovata
    switch (categoria.categoria) {
      case "travel":
        loadImage(categorie[0].img, (img) => {
          image(img, 0, 0, 200, 200);
        });
        categorie_trovate.push(categoria.categoria);
        break;
      case "nature":
        loadImage(categorie[1].img, (img) => {
          image(img, 200, 0, 200, 200);
        });
        categorie_trovate.push(categoria.categoria);
        break;
      case "fashion":
        loadImage(categorie[2].img, (img) => {
          image(img, 400, 0, 200, 200);
        });
        categorie_trovate.push(categoria.categoria);
        break;
      case "sports":
        loadImage(categorie[3].img, (img) => {
          image(img, 600, 0, 200, 200);
        });
        categorie_trovate.push(categoria.categoria);
        break;
      case "food":
        loadImage(categorie[4].img, (img) => {
          image(img, 0, 200, 200, 200);
        });
        categorie_trovate.push(categoria.categoria);
        break;
      case "book":
        loadImage(categorie[5].img, (img) => {
          image(img, 200, 200, 200, 200);
        });
        categorie_trovate.push(categoria.categoria);
        break;
      case "electronic":
        loadImage(categorie[6].img, (img) => {
          image(img, 400, 200, 200, 200);
        });
        categorie_trovate.push(categoria.categoria);
        break;
      case "mystery":
        loadImage(categorie[7].img, (img) => {
          image(img, 600, 200, 200, 200);
        });
        categorie_trovate.push(categoria.categoria);
        break;

      default:
        break;
    }
  }
      console.log(categorie_trovate);
  
}

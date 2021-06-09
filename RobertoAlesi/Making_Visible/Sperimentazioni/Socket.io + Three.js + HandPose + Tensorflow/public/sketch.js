// sketch.js
// aka the client side:
// - use handpose to track hand skeleton
// - send to server via socket.io
// - update display with other users' hands from server

var socket = io(); // carica la libreria socket

///////////////////////////////
//////////HANDPOSE////////////
/////////////////////////////

var handposeModel = null; // carica il modello handpose
var videoDataLoaded = false; // carica la capture della videocamera
var statusText = "Loading handpose model...";
var myHands = []; // la mano viene rilevata nel browser
var serverData = {}; // carica le mani di altri utenti nel server
var handMeshes = {}; // gli oggetti 3d che costituiscono la geometria della mano
// viene caricato su { userId : Array<Object3D> }

// html canvas for drawing debug view
var dbg = document.createElement("canvas").getContext("2d");
dbg.canvas.style.position = "absolute";
dbg.canvas.style.right = "0px";
dbg.canvas.style.bottom = "0px";
dbg.canvas.style.zIndex = 100;
document.body.appendChild(dbg.canvas);

// inizializza una nuova scena di Three.js
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// carica il video
var capture = document.createElement("video");
capture.playsinline = "playsinline";
capture.autoplay = "autoplay";
navigator.mediaDevices
  .getUserMedia({ audio: false, video: true })
  .then(function(stream) {
    window.stream = stream;
    capture.srcObject = stream;
  });

// nasconde elementi video
capture.style.position = "absolute";
capture.style.opacity = 0;
capture.style.zIndex = -100;

// dice quando è pronto e imposta la size
capture.onloadeddata = function() {
  console.log("video initialized");
  videoDataLoaded = true;
  dbg.canvas.width = capture.videoWidth / 2;
  dbg.canvas.height = capture.videoHeight / 2;
  camera.position.z = capture.videoWidth / 2;
};

//luce!
const Dlight = new THREE.DirectionalLight(0xffffff); // soft white light
scene.add(Dlight);
const Plight = new THREE.AmbientLight(0xffcccf, 1, 100);
Plight.position.set(0, 0, 2);
scene.add(Plight);

  var xindex;
  var yindex;
  var xthumb;
  var ythumb;

// aggiorna gli oggetti threejs in base ai dati inviati dal server
function updateMeshesFromServerData() {
  //per ogni utente aggiunge la mano
  for (var userId in serverData) {
    if (!handMeshes[userId] && serverData[userId].hands.length) {
      handMeshes[userId] = [];
      var id = handMeshes[userId]
      console.log(id)
   
      
      for (var i = 0; i < 21; i++) {
        // 21 keypoints
        var { isPalm, next } = getLandmarkProperty(i);

        var obj = new THREE.Object3D(); // oggetto null che permette di ruotare e scalare tutto insieme

        // ad ogni articolazione viene associato un cilindro
        //var geometry = new THREE.CylinderGeometry( isPalm?5:10, 5, 1);
        var geometry = new THREE.BoxGeometry(5, 1, 5);
        //var material = new THREE.MeshNormalMaterial();
        var material = new THREE.MeshPhongMaterial({ color: 0xffffff });
        var mesh = new THREE.Mesh(geometry, material);

        mesh.rotation.x = Math.PI / 2;

        obj.add(mesh);
        scene.add(obj);
        handMeshes[userId].push(obj);
        
      }
    }
  }


  // se un utente esce dal server, la sua mano viene rimossa
  for (var userId in handMeshes) {
    if (!serverData[userId] || !serverData[userId].hands.length) {
      for (var i = 0; i < handMeshes[userId].length; i++) {
        scene.remove(handMeshes[userId][i]);
      }
      delete handMeshes[userId];
    }
  }
  
  
  xindex = handMeshes[userId][8].position.x
  yindex = handMeshes[userId][8].position.y
  xthumb = handMeshes[userId][4].position.x
  ythumb = handMeshes[userId][4].position.y
  
 
  

  // muove e orienta le mesh
  for (var userId in handMeshes) {
    if (!serverData[userId] || !serverData[userId].hands.length) {
      continue;
    }
    for (var i = 0; i < handMeshes[userId].length; i++) {
      var { isPalm, next } = getLandmarkProperty(i);

      var p0 = webcam2space(...serverData[userId].hands[0].landmarks[i]); // one end of the bone
      var p1 = webcam2space(...serverData[userId].hands[0].landmarks[next]); // the other end of the bone

      // punto medio
      var mid = p0.clone().lerp(p1, 0.5);
      handMeshes[userId][i].position.set(mid.x, mid.y, mid.z);
      //console.log( handMeshes[userId][8].position)
      
      // lunghezza
      handMeshes[userId][i].scale.z = p0.distanceTo(p1);
      // orientamento
      handMeshes[userId][i].lookAt(p1);
    }
  }
}

///////////////disegna la sfera sul pollice
function drawSphere() {
  // console.log(xindex + " " + yindex +  " " +xthumb +  " " + ythumb);
   //console.log(handMeshes[userId])
      var xs = xindex - xthumb;
      var ys = yindex - ythumb;
      var r = (Math.sqrt( xs*xs + ys*ys )-10);
   //console.log(r)
      var obj1 = new THREE.Object3D();
  
      var sfera = new THREE.SphereGeometry(r);
      var matsfe = new THREE.MeshNormalMaterial();
      var mesh1 = new THREE.Mesh(sfera, matsfe);
  
       obj1.position.x = xthumb;
       obj1.position.y = ythumb;
      
    obj1.add(mesh1);
    scene.add(obj1);
  }



// carica il modello handpose
handpose.load().then(function(_model) {
  console.log("model initialized.");
  statusText = "Model loaded.";
  handposeModel = _model;
});

// dice al server che è pronto
socket.emit("client-start");

// aggiorna i dati ogni volta che il server manda un aggiornamento
socket.on("server-update", function(data) {
  serverData = data;
  updateMeshesFromServerData();
  drawSphere()
  });

// compute some metadata given a landmark index
// - is the landmark a palm keypoint or a finger keypoint?
// - what's the next landmark to connect to if we're drawing a bone?
function getLandmarkProperty(i) {
  var palms = [0, 1, 2, 5, 9, 13, 17]; //landmarks che rappresentano il palmo della mano

  var idx = palms.indexOf(i);
  var isPalm = idx != -1;
  var next; // elemento successivo con cui connettersi?
  if (!isPalm) {
    // vede quando il landmark non è del palmo e si connette con il primo landmark delle dita
    next = i - 1;
  } else {
    // connette i landmark delle dita
    next = palms[(idx + 1) % palms.length];
  }
  return { isPalm, next };
}


var xindex;
var yindex;
var xthumb;
var ythumb;

// disegna l'oggetto mano (2D)
function drawHands(hands, noKeypoints) {
  // Ogni oggetto mano contiene una proprietà "landmarks"
  // è un array di 21 3-D landmarks.
  //console.log(hands.length);
  for (var i = 0; i < hands.length; i++) {
    var landmarks = hands[i].landmarks;
    
    
    xindex = landmarks[8][0];
    yindex = landmarks[8][1];
    xthumb = landmarks[4][0];
    ythumb = landmarks[4][1];
    
    //landmark che rappresentano il palmo
    var palms = [0, 1, 2, 5, 9, 13, 17];

    for (var j = 0; j < landmarks.length; j++) {
      var [x, y, z] = landmarks[j]; // coordinate nello spazio 3D

      // disegna il keypointy e il numero
      if (!noKeypoints) {
        dbg.fillRect(x - 2, y - 2, 4, 4);
        dbg.fillText(j, x, y);
      }

      // disegna lo scheletro
      var { isPalm, next } = getLandmarkProperty(j);
      dbg.beginPath();
      dbg.moveTo(x, y);
      dbg.lineTo(...landmarks[next]);
      dbg.stroke();
    }
  }
}


// unico colore per ogni utente
function uuid2color(uuid) {
  var col = 1;
  for (var i = 0; i < uuid.length; i++) {
    var cc = uuid.charCodeAt(i);
    col = (col * cc) % 0xffffff;
  }
  return [(col >> 16) & 0xff, (col >> 8) & 0xff, col & 0xff];
}

// trasforma le coordinate della webcam in coordinate di threejs
function webcam2space(x, y, z) {
  return new THREE.Vector3(
    x - capture.videoWidth / 2,
    -(y - capture.videoHeight / 2),
    -z
  );
}

function render() {
  requestAnimationFrame(render); // crea un animazione in loop
  if (handposeModel && videoDataLoaded) {
    // il modello e il video si caricano insieme
    handposeModel.estimateHands(capture).then(function(_hands) {
      myHands = _hands; // update the global myHands object with the detected hands
            
      if (!myHands.length) {
        // haven't found any hands
        statusText = "Show some hands!";
      } else {
        // display the confidence, to 3 decimal places
        statusText =
          "Confidence: " +
          Math.round(myHands[0].handInViewConfidence * 1000) / 1000;
      }

      // invia al server i nostri aggiornamenti
      socket.emit("client-update", { hands: myHands });
      
     });
  }

  dbg.clearRect(0, 0, dbg.canvas.width, dbg.canvas.height);

  dbg.save();
  dbg.fillStyle = "red";
  dbg.strokeStyle = "red";
  dbg.scale(0.5, 0.5);

  dbg.drawImage(capture, 0, 0);
  drawHands(myHands);
  dbg.restore();

  // renderizza la scena 3D!
  renderer.render(scene, camera);
}

render(); // kick off the rendering loop!

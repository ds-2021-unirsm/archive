var container, scene,
  camera,
  renderer,
  raycaster,
  objects = [];
var keyState = {};
var sphere;

var player, playerId, moveSpeed, turnSpeed;

var playerData;

var otherPlayers = [],
  otherPlayersId = [];

var loadWorld = function() {
  var socket = io.connect("https://socket-three-due.glitch2.me");

  init();
  animate();

  function init() {
    //Setup------------------------------------------
    container = document.getElementById("container");

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 5;

    // const light = new THREE.AmbientLight( 0x404040 ); // soft white light
    // scene.add( light );
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    scene.add( directionalLight ); 
    const pointlight = new THREE.PointLight( 0xffffff, 1, 100 );
    pointlight.position.set( 1, 3, 0 );
    scene.add( pointlight );
    const pointlight2 = new THREE.PointLight( 0xfff000, 1, 100 );
    pointlight2.position.set( -1, 3, 0 );
    scene.add( pointlight2 );
    const pointlight3 = new THREE.PointLight( 0xfff000, 1, 100 );
    pointlight3.position.set( 0, 3, 1 );
    scene.add( pointlight3 );
    const pointlight4 = new THREE.PointLight( 0xfff000, 1, 100 );
    pointlight4.position.set( 0, 3, -1 );
    scene.add( pointlight4 );
   

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    raycaster = new THREE.Raycaster();

    //Add Objects To the Scene HERE-------------------
    //Sphere------------------
    var sphere_geometry = new THREE.SphereGeometry(1.5, 15, 15);
    var sphere_material = new THREE.MeshPhysicalMaterial({color: 0x8a2cc, wireframe: false});
    
    sphere = new THREE.Mesh(sphere_geometry, sphere_material);

    sphere.position.y = 1;
    scene.add(sphere);
    objects.push(sphere); //if you are interested in detecting an intersection with this sphere
    
    
    
    // Pavimento

var floorGeometry = new THREE.PlaneGeometry(10, 10, 20, 20);
var floorMaterial = new THREE.MeshPhongMaterial({ color: 0x0f});

var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = -1
floor.rotation.x = -0.5 * Math.PI;
floor.receiveShadow = true;
scene.add(floor);

    
    

    //Events------------------------------------------
    document.addEventListener("click", onMouseClick, false);
    document.addEventListener("mousedown", onMouseDown, false);
    document.addEventListener("mouseup", onMouseUp, false);
    document.addEventListener("mousemove", onMouseMove, false);
    document.addEventListener("mouseout", onMouseOut, false);
    document.addEventListener("keydown", onKeyDown, false);
    document.addEventListener("keyup", onKeyUp, false);
    window.addEventListener("resize", onWindowResize, false);

    //Final touches-----------------------------------
    container.appendChild(renderer.domElement);
    document.body.appendChild(container);
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    if (player) {
      updateCameraPosition();
      checkKeyStates();
      camera.lookAt(player.position);
    }

    
    
    
    //Render Scene---------------------------------------
    renderer.clear();
    renderer.render(scene, camera);
  }

  function onMouseClick() {
    var intersects = calculateIntersects(event);

    if (intersects.length > 0) {
      //If object is intersected by mouse pointer, do something
      if (intersects[0].object == sphere) {
         intersects[0].object.material.color.setHex(Math.random() * 0xffffff);
        //alert("This is a sphere!");
       
      }
    }
  }
  
  function onMouseDown() {}
  function onMouseUp() {}
  function onMouseMove() {}
  function onMouseOut() {}
  function onKeyDown(event) {
  //event = event || window.event;

    keyState[event.keyCode || event.which] = true;
  }

  function onKeyUp(event) {
    event = event || window.event;
    keyState[event.keyCode || event.which] = false;
  }
  
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  function calculateIntersects(event) {
    //Determine objects intersected by raycaster
    event.preventDefault();

    var vector = new THREE.Vector3();
    vector.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1,
      0.5
    );
    vector.unproject(camera);

    raycaster.ray.set(camera.position, vector.sub(camera.position).normalize());

    var intersects = raycaster.intersectObjects(objects);

    return intersects;
  }
};

var createPlayer = function(data) {
  playerData = data;

  
  var cube_geometry = new THREE.BoxGeometry(data.sizeX, data.sizeY, data.sizeZ);
  var cube_material = new THREE.MeshLambertMaterial({ color: 0x7777ff, wireframe: false});
  player = new THREE.Mesh(cube_geometry, cube_material);

  player.rotation.set(0, 0, 0);

  player.position.x = data.x;
  player.position.y = data.y;
  player.position.z = data.z;

  playerId = data.playerId;
  moveSpeed = data.speed;
  turnSpeed = data.turnSpeed;

  updateCameraPosition();
  

  objects.push(player);
  scene.add(player);

  camera.lookAt(player.position);
};

var updateCameraPosition = function() {
  camera.position.x = player.position.x + 6 * Math.sin(player.rotation.y);
  camera.position.y = player.position.y + 6;
  camera.position.z = player.position.z + 6 * Math.cos(player.rotation.y);
};


var updatePlayerPosition = function(data) {
  var somePlayer = playerForId(data.playerId);

  somePlayer.position.x = data.x;
  somePlayer.position.y = data.y;
  somePlayer.position.z = data.z;

  somePlayer.rotation.x = data.r_x;
  somePlayer.rotation.y = data.r_y;
  somePlayer.rotation.z = data.r_z;
};

var updatePlayerData = function() {
  playerData.x = player.position.x;
  playerData.y = player.position.y;
  playerData.z = player.position.z;

  playerData.r_x = player.rotation.x;
  playerData.r_y = player.rotation.y;
  playerData.r_z = player.rotation.z;
};
var checkKeyStates = function() {
    if (keyState[87]) {
    //  'w' - move forward
    player.position.y += moveSpeed * Math.cos(player.rotation.z);
    updatePlayerData();
    socket.emit("updatePosition", playerData);
  }
  if (keyState[38]) {
    // up arrow or 'w' - move forward
    player.position.x -= moveSpeed * Math.sin(player.rotation.y);
    player.position.z -= moveSpeed * Math.cos(player.rotation.y);
  
    updatePlayerData();
    socket.emit("updatePosition", playerData);
  }
  if (keyState[83]) {
    // down arrow or 's' - move backward
    player.position.y -= moveSpeed * Math.cos(player.rotation.z);
    updatePlayerData();
    socket.emit("updatePosition", playerData);
  }
  if (keyState[40]) {
    // down arrow or 's' - move backward
    player.position.x += moveSpeed * Math.sin(player.rotation.y);
    player.position.z += moveSpeed * Math.cos(player.rotation.y);
   
    updatePlayerData();
    socket.emit("updatePosition", playerData);
  }
  if (keyState[37] || keyState[65]) {
    // left arrow or 'a' - rotate left
    player.rotation.y += turnSpeed;
    updatePlayerData();
    socket.emit("updatePosition", playerData);
  }
  if (keyState[39] || keyState[68]) {
    // right arrow or 'd' - rotate right
    player.rotation.y -= turnSpeed;
    updatePlayerData();
    socket.emit("updatePosition", playerData);
  }
  if (keyState[81]) {
    // 'q' - strafe left
    player.position.x -= moveSpeed * Math.cos(player.rotation.y);
    player.position.z += moveSpeed * Math.sin(player.rotation.y);
    updatePlayerData();
    socket.emit("updatePosition", playerData);
  }
  if (keyState[69]) {
    // 'e' - strage right
    player.position.x += moveSpeed * Math.cos(player.rotation.y);
    player.position.z -= moveSpeed * Math.sin(player.rotation.y);
    updatePlayerData();
    socket.emit("updatePosition", playerData);
  }
};

var addOtherPlayer = function(data) {
  var sphere_geometry = new THREE.SphereGeometry( data.sizeX, data.sizeY, data.sizeZ );
  var cube_material = new THREE.MeshNormalMaterial({ color: 0x7777ff, wireframe: false });
  var otherPlayer = new THREE.Mesh(sphere_geometry, cube_material);

  otherPlayer.position.x = data.x;
  otherPlayer.position.y = data.y;
  otherPlayer.position.z = data.z;

  otherPlayersId.push(data.playerId);
  otherPlayers.push(otherPlayer);
  objects.push(otherPlayer);
  scene.add(otherPlayer);
};

var removeOtherPlayer = function(data) {
  scene.remove(playerForId(data.playerId));
};

var playerForId = function(id) {
  var index;
  for (var i = 0; i < otherPlayersId.length; i++) {
    if (otherPlayersId[i] == id) {
      index = i;
      break;
    }
  }
  return otherPlayers[index];
};

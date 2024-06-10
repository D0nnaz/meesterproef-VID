var planets = [
  {
    name: "Sun",
    texture: "textures/sun.jpeg",
    canvasId: "sunCanvas",
    frequency: 1, 
  },
  {
    name: "Mercury",
    texture: "textures/mercury.jpeg",
    canvasId: "mercuryCanvas",
    frequency: 900,
  },
  {
    name: "Venus",
    texture: "textures/venus.jpeg",
    canvasId: "venusCanvas",
    frequency: 600,
  },
  {
    name: "Earth",
    texture: "textures/earth.jpeg",
    canvasId: "earthCanvas",
    frequency: 500, 
  },
  {
    name: "Mars",
    texture: "textures/mars.jpeg",
    canvasId: "marsCanvas",
    frequency: 400, 
  },
  {
    name: "Jupiter",
    texture: "textures/jupiter.jpeg",
    canvasId: "jupiterCanvas",
    frequency: 300,
  },
  {
    name: "Saturn",
    texture: "textures/saturn.jpeg",
    canvasId: "saturnCanvas",
    frequency: 200,
  },
  {
    name: "Uranus",
    texture: "textures/uranus.webp",
    canvasId: "uranusCanvas",
    frequency: 800,
  },
  {
    name: "Neptune",
    texture: "textures/neptune.jpeg",
    canvasId: "neptuneCanvas",
    frequency: 700, 
  },
  {
    name: "Pluto",
    texture: "textures/pluto.webp",
    canvasId: "plutoCanvas",
    frequency: 1000,
  },
];

var audioContext = new (window.AudioContext || window.webkitAudioContext)();

function createPlanetScene(planet) {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  var canvas = document.getElementById(planet.canvasId);
  var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });

  renderer.setSize(1000, 1000);
  var geometry = new THREE.SphereGeometry(1.75, 32, 32);
  var texture = new THREE.TextureLoader().load(planet.texture);
  var material = new THREE.MeshBasicMaterial({ map: texture });
  var sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
  camera.position.z = 5;

  if (planet.name === "Saturn") {
    var innerRadius = 0.0;
    var outerRadius = 3.0;
    var height = 0.2;
    var radialSegments = 32;
    var heightSegments = 2;
    var openEnded = false;
    var thetaStart = 0;
    var thetaLength = Math.PI * 2;

    var ringGeometry = new THREE.CylinderGeometry(
      outerRadius,
      innerRadius,
      height,
      radialSegments,
      heightSegments,
      openEnded,
      thetaStart,
      thetaLength
    );

    var ringTexture = new THREE.TextureLoader().load("textures/ring.jpeg");

    var ringMaterial = new THREE.MeshBasicMaterial({
      map: ringTexture,
      side: THREE.FrontSide,
    });

    var ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = -4.565580294526307;
    ring.rotation.y = 1.9190062192067596;
    ring.rotation.z = 1.5707963267948966;

    scene.add(ring);
  }

  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
  var isDragging = false;
  var previousMousePosition = { x: 0, y: 0 };
  var draggableSphere = null;

  var audioSource = null;

  if (planet.frequency !== undefined) {
    var oscillator = audioContext.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = planet.frequency;
    oscillator.start();

    var gainNode = audioContext.createGain();
    gainNode.gain.value = 0;

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    audioSource = oscillator;
  } else if (planet.audioFile !== undefined) {
    var audio = new Audio(planet.audioFile);

    var gainNode = audioContext.createGain();
    gainNode.gain.value = 0;

    var source = audioContext.createMediaElementSource(audio);
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);

    audio.loop = true;
    audio.play();

    audioSource = audio;
  }

  function resumeAudioContext() {
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }
  }

  function onPointerMove(event) {
    event.preventDefault();
    if (isDragging && draggableSphere) {
      var deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y,
      };
      var rotationSpeed = Math.sqrt(
        deltaMove.x * deltaMove.x + deltaMove.y * deltaMove.y
      );

      if (audioSource instanceof OscillatorNode) {
        audioSource.frequency.value = planet.frequency + rotationSpeed * 10;

        gainNode.gain.value = rotationSpeed / 100;
      } else if (audioSource instanceof HTMLAudioElement) {
        audioSource.playbackRate = 1 + rotationSpeed * 0.01;

        gainNode.gain.value = rotationSpeed / 100;
      }

      draggableSphere.rotation.y += deltaMove.x * 0.005;
      draggableSphere.rotation.x += deltaMove.y * 0.005;
      previousMousePosition = { x: event.clientX, y: event.clientY };
    }
  }

  function onPointerStart(event) {
    event.preventDefault();
    resumeAudioContext();
    var rect = canvas.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
      isDragging = true;
      canvas.style.cursor = "grabbing";
      draggableSphere = intersects[0].object;
      previousMousePosition = { x: event.clientX, y: event.clientY };

      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerEnd);
    }
  }

  function onPointerEnd() {
    isDragging = false;
    draggableSphere = null;
    gainNode.gain.value = 0;

    document.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerup", onPointerEnd);
  }

  canvas.addEventListener("pointerdown", onPointerStart);

  function onMouseMove(event) {
    event.preventDefault();
    var rect = canvas.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
      canvas.style.cursor = "grab";
    } else {
      canvas.style.cursor = "default";
    }
  }

  canvas.addEventListener("mousemove", onMouseMove);

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();
}

planets.forEach(createPlanetScene);

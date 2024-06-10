let scene, camera, renderer;
let stars = [];

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

    renderer = new THREE.WebGLRenderer();
      renderer.setClearColor(0x1e1e1e, 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.querySelector('.star-container').appendChild(renderer.domElement);
}

function addStars() {
  for (var z = -1000; z < 1000; z += 20) {
    var starGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    var starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    var star = new THREE.Mesh(starGeometry, starMaterial);

    star.position.x = Math.random() * 1000 - 500;
    star.position.y = Math.random() * 1000 - 500;
    star.position.z = z;
    star.scale.x = star.scale.y = 2;
    scene.add(star);
    stars.push(star);
  }
}

function animateStars() {
  for (var i = 0; i < stars.length; i++) {
    star = stars[i];
    star.position.z += i / 10;
    if (star.position.z > 1000) star.position.z -= 2000;
  }
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  animateStars();
}

init();
addStars();
animate();
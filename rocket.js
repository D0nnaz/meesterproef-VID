class Scene {
  constructor(model) {
    this.views = [
      { bottom: 0, height: 1 },
      { bottom: 0, height: 0 },
    ];

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setPixelRatio(window.devicePixelRatio);

    document.body.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();

    for (var ii = 0; ii < this.views.length; ++ii) {
      var view = this.views[ii];
      var camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        2000
      );
      camera.position.fromArray([0, 0, 180]);
      camera.layers.disableAll();
      camera.layers.enable(ii);
      view.camera = camera;
      camera.lookAt(new THREE.Vector3(0, 5, 0));
    }

    this.light = new THREE.PointLight(0xffffff, 0.75);
    this.light.position.z = 150;
    this.light.position.x = 70;
    this.light.position.y = -20;
    this.scene.add(this.light);

    this.softLight = new THREE.AmbientLight(0xffffff, 1.5);
    this.scene.add(this.softLight);

    this.onResize();
    window.addEventListener("resize", this.onResize, false);

    this.modelGroup = new THREE.Group();
    model.layers.set(0);
    this.modelGroup.add(model);
    this.scene.add(this.modelGroup);

    this.loadTexturesAndAddParticles();
  }

  loadTexturesAndAddParticles() {
    const fireTextureLoader = new THREE.TextureLoader();
    const smokeTextureLoader = new THREE.TextureLoader();

    fireTextureLoader.load(
      "textures/fire.png",
      (fireTexture) => {
        smokeTextureLoader.load(
          "textures/smoke.png",
          (smokeTexture) => {
            this.addParticles(fireTexture, smokeTexture);
          },
          undefined,
          (err) => {
            console.error("Error loading smoke texture", err);
          }
        );
      },
      undefined,
      (err) => {
        console.error("Error loading fire texture", err);
      }
    );
  }

  addParticles(fireTexture, smokeTexture) {
    const fireMaterial = new THREE.SpriteMaterial({
      map: fireTexture,
      blending: THREE.AdditiveBlending,
    });
    const smokeMaterial = new THREE.SpriteMaterial({
      map: smokeTexture,
      blending: THREE.NormalBlending,
    });

    this.fireParticles = [];
    this.smokeParticles = [];

    for (let i = 0; i < 20; i++) {
      let fire = new THREE.Sprite(fireMaterial);
      fire.scale.set(10, 10, 1);
      fire.position.set(0, -10, 0);
      this.modelGroup.add(fire);
      this.fireParticles.push(fire);

      let smoke = new THREE.Sprite(smokeMaterial);
      smoke.scale.set(15, 15, 1);
      smoke.position.set(0, -20, 0);
      this.modelGroup.add(smoke);
      this.smokeParticles.push(smoke);
    }
  }

  updateParticles() {
    if (!this.fireParticles || !this.smokeParticles) return;

    const time = Date.now() * 0.005;

    for (let i = 0; i < this.fireParticles.length; i++) {
      let fire = this.fireParticles[i];
      fire.position.y = -50 + Math.sin(time + i) * 80;
      fire.material.opacity = Math.random();

      let scale = Math.abs(fire.position.y / 40);

      fire.scale.set(10 * scale, 10 * scale, 1);
      fire.material.opacity = Math.random() * 0.5;
    }

    for (let i = 0; i < this.smokeParticles.length; i++) {
      let smoke = this.smokeParticles[i];
      smoke.position.y = -50 + Math.sin(time + i) * 90;
      smoke.position.x = Math.cos(time + i) * 5;

      let scale = Math.abs(smoke.position.y / 40);

      smoke.scale.set(15 * scale, 15 * scale, 1);
      smoke.material.opacity = Math.random() * 0.5;
    }
  }
  

  render = () => {
    this.updateParticles();
    for (var ii = 0; ii < this.views.length; ++ii) {
      var view = this.views[ii];
      var camera = view.camera;

      var bottom = Math.floor(this.h * view.bottom);
      var height = Math.floor(this.h * view.height);

      this.renderer.setViewport(0, 0, this.w, this.h);
      this.renderer.setScissor(0, bottom, this.w, height);
      this.renderer.setScissorTest(true);

      camera.aspect = this.w / this.h;
      this.renderer.render(this.scene, camera);
    }
  };

  onResize = () => {
    this.w = window.innerWidth;
    this.h = window.innerHeight;

    for (var ii = 0; ii < this.views.length; ++ii) {
      var view = this.views[ii];
      var camera = view.camera;
      camera.aspect = this.w / this.h;
      let camZ = (screen.width - this.w * 1) / 3;
      camera.position.z = camZ < 180 ? 180 : camZ;
      camera.updateProjectionMatrix();
    }

    this.renderer.setSize(this.w, this.h);
    this.render();
  };
}

function loadModel() {
  gsap.registerPlugin(ScrollTrigger);

  let endAudio = new Audio("audio/end-less.mp3");
  var object;

  function onModelLoaded() {
    object.traverse(function (child) {
      if (child.isMesh) {
        child.material.side = THREE.DoubleSide;
      }
    });

    let ready = new Audio("audio/ready.wav"); 

    setTimeout(() => {
      document.querySelector(".video-popup").style.display = "none";
      ready.play();
    }, 3000);

    setupAnimation(object);
    setupIntersectionObserver();
  }

  function setupIntersectionObserver() {
    const endSection = document.querySelector(".end");
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    function handleIntersect(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          endAudio.play();
        }
      });
    }

    const observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(endSection);
  }


  var manager = new THREE.LoadingManager(onModelLoaded);
  manager.onProgress = (item, loaded, total) =>
    console.log(item, loaded, total);

  var mtlLoader = new THREE.MTLLoader(manager);
  mtlLoader.load("/3D-model/rocket.mtl", function (materials) {
    materials.preload();

    var objLoader = new THREE.OBJLoader(manager);
    objLoader.setMaterials(materials);
    objLoader.load("/3D-model/rocket.obj", function (obj) {
      obj.scale.set(3, 3, 3);
      object = obj;
    });
  });
}

function setupAnimation(model) {
  let scene = new Scene(model);
  let rocket = scene.modelGroup;

  gsap.fromTo(
    "canvas",
    { x: "50%", autoAlpha: 1 },
    { duration: 1, x: "0%", autoAlpha: 1 }
  );
  gsap.to(".loading", { autoAlpha: 0 });
  gsap.to(".scroll-cta", { opacity: 1 });

  let tau = Math.PI * 2;

  rocket.rotation.x = -tau * 0.05;
  rocket.rotation.y = tau;
  rocket.rotation.z = -tau * 0.1;
  rocket.position.x = 0;
  rocket.position.y = -300;
  rocket.position.z = 0;

  scene.render();

  var sectionDuration = 1;
  gsap.fromTo(
    scene.views[1],
    { height: 0, bottom: 0 },
    {
      height: 0,
      bottom: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".planets",
        scrub: true,
        start: "bottom bottom",
        end: "bottom top",
      },
    }
  );

  gsap.fromTo(
    scene.views[1],
    { height: 0, bottom: 0 },
    {
      height: 0,
      bottom: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".planets",
        scrub: true,
        start: "top bottom",
        end: "top top",
      },
    }
  );

  gsap.to(".ground", {
    y: "30%",
    scrollTrigger: {
      trigger: ".ground-container",
      scrub: true,
      start: "top bottom",
      end: "bottom top",
    },
  });

  gsap.from(".clouds", {
    y: "25%",
    scrollTrigger: {
      trigger: ".ground-container",
      scrub: true,
      start: "top bottom",
      end: "bottom top",
    },
  });

  

  let tl = new gsap.timeline({
    onUpdate: scene.render,
    scrollTrigger: {
      trigger: ".content",
      scrub: true,
      start: "top top",
      end: "bottom bottom",
    },
    defaults: { duration: sectionDuration, ease: "power2.inOut" },
  });

  let delay = 0;

  tl.to(".scroll-cta", { duration: 0.25, opacity: 0 }, delay);
  tl.to(rocket.position, { x: 0, ease: "power1.in" }, delay);

  tl.to(
    rocket.rotation,
    {
      duration: sectionDuration,
      x: -3,
      y: tau * 10,
      z: 0,
      ease: "none",
    },
    delay
  );
  tl.to(
    rocket.position,
    { duration: sectionDuration, z: 0, x: 0, y: 50, ease: "power1.out" },
    delay
  );

  delay += sectionDuration;

    tl.to(
      rocket.rotation,
      { x: 0, y: tau * 10, z: 0, ease: "power1.out" },
      delay
    );
    tl.to(rocket.position, { z: 0, x: 0, y: 50, ease: "power1.outIn" }, delay);

    delay += sectionDuration;


  tl.to(
    rocket.rotation,
    { x: 0, y: tau * 10, z: 0, ease: "power1.out" },
    delay
  );
  tl.to(rocket.position, { z: 0, x: -55, y: 0, ease: "power1.outIn" }, delay);

  delay += sectionDuration;

  tl.to(
    rocket.rotation,
    {
      duration: sectionDuration,
      x: tau * 0,
      y: tau * 10,
      z: 0,
      ease: "none",
    },
    delay
  );





                        tl.to(
                          rocket.rotation,
                          {
                            x: tau * 0,
                            y: -0.2,
                            z: tau * 0.1,
                            ease: "power3.inOut",
                          },
                          delay
                        );
                        tl.to(
                          rocket.position,
                          { x: 90, y: 0, z: 0, ease: "power2.inOut" },
                          delay
                        );

                        delay += sectionDuration;
                        

                      tl.to(
                        rocket.rotation,
                        {
                          x: tau * 0,
                          y: -0.2,
                          z: tau * -0.1,
                          ease: "power3.inOut",
                        },
                        delay
                      );
                      tl.to(
                        rocket.position,
                        { x: -90, y: 0, z: 10, ease: "power2.inOut" },
                        delay
                      );

                      delay += sectionDuration;

                    tl.to(
                      rocket.rotation,
                      {
                        x: tau * 0,
                        y: -0.2,
                        z: tau * 0.1,
                        ease: "power3.inOut",
                      },
                      delay
                    );
                    tl.to(
                      rocket.position,
                      { x: 90, y: 0, z: -20, ease: "power2.inOut" },
                      delay
                    );

                    delay += sectionDuration;

                  tl.to(
                    rocket.rotation,
                    {
                      x: tau * 0,
                      y: 6,
                      z: tau * -0.1,
                      ease: "power3.inOut",
                    },
                    delay
                  );
                  tl.to(
                    rocket.position,
                    { x: -50, y: 0, z: 0, ease: "power2.inOut" },
                    delay
                  );

                  delay += sectionDuration;

                tl.to(
                  rocket.rotation,
                  { x: tau * 0, y: 2, z: tau * 0.05, ease: "power3.inOut" },
                  delay
                );
                tl.to(
                  rocket.position,
                  { x: 80, y: 0, z: 20, ease: "power2.inOut" },
                  delay
                );

                delay += sectionDuration;

              tl.to(
                rocket.rotation,
                { x: tau * 0, y: -0.2, z: tau * -0.1, ease: "power3.inOut" },
                delay
              );
              tl.to(
                rocket.position,
                { x: -40, y: 0, z: 50, ease: "power2.inOut" },
                delay
              );

              delay += sectionDuration;

  // PLUTO
            tl.to(
              rocket.rotation,
              { x: tau * 0, y: -0.5, z: tau * 0.13, ease: "power3.inOut" },
              delay
            );
            tl.to(
              rocket.position,
              { x: 50, y: 0, z: 0, ease: "power2.inOut" },
              delay
            );

            delay += sectionDuration;

          tl.to(
            rocket.rotation,
            { x: tau *-0.01, y: -0.5, z: tau * -0.01, ease: "power3.inOut" },
            delay
          );
          tl.to(
            rocket.position,
            { x:-20, y: 0, z: -100, ease: "power2.inOut" },
            delay
          );

          delay += sectionDuration;

        tl.to(
          rocket.rotation,
          { x: tau * 0, y: -0.2, z: tau * -0.1, ease: "power3.inOut" },
          delay
        );
        tl.to(
          rocket.position,
          { x: -50, y: 0, z: 30, ease: "power2.inOut" },
          delay
        );

        delay += sectionDuration;


  //GROUND SECTION
      tl.to(
        rocket.rotation,
        { x: tau * 0, y: -0.2, z: tau * 0.05, ease: "power3.inOut" },
        delay
      );
      tl.to(
        rocket.position,
        { x: 50, y: 0, z: 10, ease: "power2.inOut" },
        delay
      );

      delay += sectionDuration;



  tl.to(
    rocket.rotation,
    { x: tau * 0, y: 0.1, z: tau * -0.05, ease: "power3.inOut" },
    delay
  );
  tl.to(rocket.position, { x: -60, y: -20, z: 100, ease: "power2.inOut" }, delay);

  delay += sectionDuration;

  tl.to(
    rocket.rotation,
    { x: tau * 0, y: 0, z: tau * 0.05, ease: "power3.inOut" },
    delay
  );
  tl.to(rocket.position, { x: 80, y: 0, z: -120, ease: "power2.inOut" }, delay);

  delay += sectionDuration;

  tl.to(rocket.rotation, { x: 0, z: 0, y: tau * 0.25 }, delay);
  tl.to(rocket.position, { x: -120, y: -30, z: 50 }, delay);
}

loadModel();

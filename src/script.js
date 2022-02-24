import "./style.css";
import * as THREE from "three";
import * as dat from "lil-gui";
import gsap from "gsap";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
/**
 * Debug
 */
const gui = new dat.GUI();

const parameters = {
  materialColor: "#ffeded",
};

gui.addColor(parameters, "materialColor").onChange(() => {
  material.color.set(parameters.materialColor);
  particlesMaterial.color.set(parameters.materialColor);
});

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */

//Spaceman Models
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);
const sectionMeshes = [];

gltfLoader.load("/models/spaceCharacter.glb", gltf => {
  gltf.scene.position.y = -1.5;
  scene.add(gltf.scene);
  sectionMeshes.push(gltf.scene);
});

// Texture
// const textureLoader = new THREE.TextureLoader();
// const gradientTexture = textureLoader.load("textures/gradients/3.jpg");
// gradientTexture.magFilter = THREE.NearestFilter;

// // Material
// const material = new THREE.MeshToonMaterial({
//   color: parameters.materialColor,
//   gradientMap: gradientTexture,
// });

// // Objects
const objectsDistance = 4;
// const mesh1 = new THREE.Mesh(new THREE.TorusGeometry(1, 0.4, 16, 60), material);
// const mesh2 = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), material);
// const mesh3 = new THREE.Mesh(
//   new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
//   material
// );

// mesh1.position.x = 2;
// mesh2.position.x = -2;
// mesh3.position.x = 2;

// mesh1.position.y = -objectsDistance * 0;
// mesh2.position.y = -objectsDistance * 1;
// mesh3.position.y = -objectsDistance * 2;

// scene.add(mesh1, mesh2, mesh3);

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight("#ffffff", 1);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);

const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Group
const cameraGroup = new THREE.Group();
scene.add(cameraGroup);

// Base camera
const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 6;
cameraGroup.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Scroll
 */
let scrollY = window.scrollY;
let currentSection = 0;

// window.addEventListener("scroll", () => {
//   scrollY = window.scrollY;
//   const newSection = Math.round(scrollY / sizes.height);
//   let t1 = gsap.timeline();
//   if (newSection != currentSection) {
//     currentSection = newSection;
//     t1.to(camera.position, {
//       duration: 5.5,
//       ease: "power2.inOut",
//       z: "1",
//     }).to(camera.position, {
//       duration: 3.5,
//       ease: "power2.inOut",
//       z: "6",
//     });
//   }
// });

/**
 * Cursor
 */
const cursor = {};
cursor.x = 0;
cursor.y = 0;

window.addEventListener("mousemove", event => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;
});

/**
 * Btn-camera
 */

let btnLeft = document.querySelector(".my-btn-Left");
btnLeft.addEventListener("click", changeCamerarLeft);

function changeCamerarLeft() {
  btnLeft.classList.toggle("disable");
  let tween = gsap.to(sectionMeshes[0].rotation, {
    duration: 2,
    ease: "power2.inOut",
    y: "-=1.5",
  });
  tween.play();
  setTimeout(() => {
    btnLeft.classList.toggle("disable");
  }, 2000);
}

let btnRight = document.querySelector(".my-btn-Right");
btnRight.addEventListener("click", changeCameraRight);
function changeCameraRight() {
  btnRight.classList.toggle("disable");
  let tween = gsap.to(sectionMeshes[0].rotation, {
    duration: 2,
    y: "+=1.5",
    ease: "power2.inOut",
  });
  tween.play();
  setTimeout(() => {
    btnRight.classList.toggle("disable");
  }, 2000);
}

let btnDwon = document.querySelector(".my-btn-Down");
btnDwon.addEventListener("click", changeCameraDown);
function changeCameraDown() {
  btnDwon.classList.toggle("disable");
  let tween = gsap.to(sectionMeshes[0].rotation, {
    duration: 2,
    x: "-=1.5",
    ease: "power2.inOut",
  });
  tween.play();
  setTimeout(() => {
    btnDwon.classList.toggle("disable");
  }, 2000);
}

let btnUp = document.querySelector(".my-btn-Up");
btnUp.addEventListener("click", changeCameraUp);
function changeCameraUp() {
  btnUp.classList.toggle("disable");
  let tween = gsap.to(sectionMeshes[0].rotation, {
    duration: 2,
    x: "+=1.5",
    ease: "power2.inOut",
  });
  tween.play();
  setTimeout(() => {
    btnUp.classList.toggle("disable");
  }, 2000);
}

let btnZin = document.querySelector(".my-btn-Zin");
btnZin.addEventListener("click", changeCameraIn);
function changeCameraIn() {
  btnZin.classList.toggle("disable");
  let tween = gsap.to(sectionMeshes[0].position, {
    duration: 2,
    z: "+=3.5",
    y: "+=0.5",
    ease: "power2.inOut",
  });
  tween.play();
  setTimeout(() => {
    btnZin.classList.toggle("disable");
  }, 2000);
}

let btnZout = document.querySelector(".my-btn-Zout");
btnZout.addEventListener("click", changeCameraOut);
function changeCameraOut() {
  btnZout.classList.toggle("disable");
  let tween = gsap.to(sectionMeshes[0].position, {
    duration: 2,
    z: "-=3.5",
    y: "-=0.5",
    ease: "power2.inOut",
  });
  tween.play();
  setTimeout(() => {
    btnZout.classList.toggle("disable");
  }, 2000);
}

/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  // Animate camera
  camera.position.y = (-scrollY / sizes.height) * objectsDistance;
  const parallaxX = cursor.x * 0.5;
  const parallaxY = -cursor.y * 0.5;
  cameraGroup.position.x +=
    (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
  cameraGroup.position.y +=
    (parallaxY - cameraGroup.position.y) * 5 * deltaTime;

  //Animate meshes
  //   for (const mesh of sectionMeshes) {
  //     mesh.rotation.x += deltaTime * 0.1;
  //     mesh.rotation.y += deltaTime * 0.12;
  //   }

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

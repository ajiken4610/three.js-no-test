import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import "./desk.glb";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

/* 立方体 */
// const geometory = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometory, material);
// scene.add(cube);

/* モデル */
const loader = new GLTFLoader();

loader.load(
  "./assets/desk.glb",
  (gltf) => {
    const model = gltf.scene;
    model.receiveShadow = true;
    model.castShadow = true;
    scene.add(model);
    console.log("Loading successful");
  },
  undefined,
  (error) => {
    console.error(error);
  }
);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1);
directionalLight.castShadow = true;
scene.add(directionalLight);
const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light);

camera.position.y = 5;

renderer.render(scene, camera);

let camLoc = 0;
let camR = 5;

function animate() {
  requestAnimationFrame(animate);

  /* 立方体アニメーション */
  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;

  /* カメラアニメーション */
  camera.position.x = Math.sin(camLoc) * camR;
  camera.position.z = Math.cos(camLoc) * camR;
  camLoc += 0.01;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
}

animate();

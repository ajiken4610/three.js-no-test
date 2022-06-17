import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
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
const controls = new OrbitControls(camera, renderer.domElement);

/* 立方体 */
// const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
// cube.position.set(0, 6, 0);
// cube.receiveShadow = true;
// cube.castShadow = true;
// scene.add(cube);

// const cube2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
// cube2.receiveShadow = true;
// cube2.castShadow = true;
// scene.add(cube2);

/* モデル */
const loader = new GLTFLoader();

loader.load(
  "./assets/desk.glb",
  (gltf) => {
    const model = gltf.scene;
    model.traverse((child) => {
      if (child instanceof THREE.Mesh || child instanceof THREE.Light) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    scene.add(model);
    console.log("Loading successful");
    document.getElementById("loading").style.display = "none";
  },
  undefined,
  (error) => {
    console.error(error);
  }
);

const directionalLight = new THREE.DirectionalLight(0xffffaa, 0.5);
directionalLight.position.set(2.5, 5, 3);
directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.left = -10;
directionalLight.shadow.camera.right = 10;
directionalLight.shadow.camera.bottom = 10;
directionalLight.shadow.camera.top = -10;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.bias = -0.0015;
directionalLight.castShadow = true;
scene.add(directionalLight);
// const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(cameraHelper);
const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5);
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
  //   camera.position.x = Math.sin(camLoc) * camR;
  //   camera.position.z = Math.cos(camLoc) * camR;
  //   camLoc += 0.01;
  //   camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
}

animate();

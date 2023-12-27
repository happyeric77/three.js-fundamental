import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GUI } from "dat.gui";

const stats = new Stats();
document.body.appendChild(stats.dom);

const animate = (render: THREE.WebGLRenderer) => {
  requestAnimationFrame(() => animate(render));
  stats.update();
  render.render(scene, camera);
};

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
};

window.addEventListener("resize", onWindowResize);

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const control = new OrbitControls(camera, renderer.domElement);
control.addEventListener("change", () => renderer.render(scene, camera));

camera.position.set(1, 2, 5);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: "pink",
  wireframe: true,
});
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

animate(renderer);
renderer.render(scene, camera);

const gui = new GUI();
const cubeFolder = gui.addFolder("Cube");
cubeFolder.add(cube.rotation, "x", 0, Math.PI * 2);
cubeFolder.add(cube.rotation, "y", 0, Math.PI * 2);
cubeFolder.add(cube.rotation, "z", 0, Math.PI * 2);
cubeFolder.open();
const cameraFolder = gui.addFolder("Camera");
cameraFolder.add(camera.position, "x", -10, 10);
cameraFolder.add(camera.position, "y", -10, 10);
cameraFolder.add(camera.position, "z", -10, 10);
cameraFolder.open();

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// const animate = (render: THREE.WebGLRenderer) => {
//   requestAnimationFrame(() => animate(render));
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//   cube.rotation.z += 0.01;
//   renderer.render(scene, camera);
// };

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

const camera2 = new THREE.OrthographicCamera();
const camera3 = new THREE.PerspectiveCamera();

const canvas2 = document.getElementById("c2")!;
const canvas3 = document.getElementById("c3")!;
const renderer2 = new THREE.WebGLRenderer({ canvas: canvas2 });
const renderer3 = new THREE.WebGL1Renderer({ canvas: canvas3 });

const control = new OrbitControls(camera, renderer.domElement);
control.addEventListener("change", () => renderer.render(scene, camera));

// camera.position.set(1, 2, 5);
camera.position.z = -2;
camera.lookAt(new THREE.Vector3()); // default is 0,0,0
camera2.position.z = -2;
camera2.lookAt(new THREE.Vector3()); // default is 0,0,0
camera3.position.z = -2;
camera3.lookAt(new THREE.Vector3()); // default is 0,0,0

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: "pink",
  wireframe: true,
});
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// renderer.setAnimationLoop((time, _frame) => animate(time, renderer));
// animate(renderer);
renderer.render(scene, camera);
renderer2.render(scene, camera2);
renderer3.render(scene, camera3);

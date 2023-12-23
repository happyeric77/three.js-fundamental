import * as THREE from "three";

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(1, 2, 5);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: "pink" });
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

const animate = (time: number) => {
  cube.rotation.x = time / 1000;
  cube.rotation.y = time / 1000;
  cube.rotation.z = time / 1000;
  renderer.render(scene, camera);
};

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

renderer.setAnimationLoop(animate);

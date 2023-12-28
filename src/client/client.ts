import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GUI } from "dat.gui";

const stats = new Stats();
document.body.appendChild(stats.dom);

const debug = document.getElementById("debug1") as HTMLDivElement;

const animate = (render: THREE.WebGLRenderer) => {
  requestAnimationFrame(() => animate(render));
  stats.update();
  render.render(scene, camera);
  debug.innerText = `Transform matrix:\n${JSON.stringify(
    cube.matrix.elements
  )}`;
  // Update debug console
  //   const object1WorldPosition = new THREE.Vector3();
  //   object1.getWorldPosition(object1WorldPosition);
  //   const object2WorldPosition = new THREE.Vector3();
  //   object2.getWorldPosition(object2WorldPosition);
  //   const object3WorldPosition = new THREE.Vector3();
  //   object3.getWorldPosition(object3WorldPosition);
  //   debug.innerText =
  //     "Red\n" +
  //     "Local Pos X : " +
  //     object1.position.x.toFixed(2) +
  //     "\n" +
  //     "World Pos X : " +
  //     object1WorldPosition.x.toFixed(2) +
  //     "\n" +
  //     "\nGreen\n" +
  //     "Local Pos X : " +
  //     object2.position.x.toFixed(2) +
  //     "\n" +
  //     "World Pos X : " +
  //     object2WorldPosition.x.toFixed(2) +
  //     "\n" +
  //     "\nBlue\n" +
  //     "Local Pos X : " +
  //     object3.position.x.toFixed(2) +
  //     "\n" +
  //     "World Pos X : " +
  //     object3WorldPosition.x.toFixed(2) +
  //     "\n";
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
// control.target.set(5, 5, 5);

camera.position.set(8, 4, 4);

// Objects and Lights

// const light1 = new THREE.PointLight(0xffffff, 400);
// light1.position.set(10, 10, 10);
// scene.add(light1);

// const light2 = new THREE.PointLight(0xffffff, 400);
// light2.position.set(-10, 10, 10);
// scene.add(light2);

// const object1 = new THREE.Mesh(
//   new THREE.SphereGeometry(),
//   new THREE.MeshPhongMaterial({ color: "pink" })
// );
// scene.add(object1);
// scene.add(new THREE.AxesHelper(5));

// object1.position.set(4, 0, 0);
// object1.add(new THREE.AxesHelper(5));

// const object2 = new THREE.Mesh(
//   new THREE.SphereGeometry(),
//   new THREE.MeshPhongMaterial({ color: "white" })
// );

// object1.add(object2);
// object2.position.set(4, 0, 0);
// object2.add(new THREE.AxesHelper(5));

// const object3 = new THREE.Mesh(
//   new THREE.SphereGeometry(),
//   new THREE.MeshPhongMaterial({ color: "green" })
// );
// object3.position.set(4, 0, 0);

// object2.add(object3);
// object3.add(new THREE.AxesHelper(5));
camera.position.set(1, 2, 5);
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshBasicMaterial({ color: "pink", wireframe: true })
);
scene.add(cube);
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

animate(renderer);
renderer.render(scene, camera);

// dat.gui
const gui = new GUI();

// const object1Folder = gui.addFolder("Object1");
// object1Folder.add(object1.position, "x", -10, 10).name("x position");
// object1Folder.add(object1.rotation, "x", 0, Math.PI * 2).name("x rotation");
// object1Folder.add(object1.scale, "x", 0, 10).name("x scale");
// object1Folder.open();

// const object2Folder = gui.addFolder("Object2");
// object2Folder.add(object2.position, "x", -10, 10).name("x position");
// object2Folder.add(object2.rotation, "x", 0, Math.PI * 2).name("x rotation");
// object2Folder.add(object2.scale, "x", 0, 10).name("x scale");
// object2Folder.open();

// const object3Folder = gui.addFolder("Object3");
// object3Folder.add(object3.position, "x", -10, 10).name("x position");
// object3Folder.add(object3.rotation, "x", 0, Math.PI * 2).name("x rotation");
// object3Folder.add(object3.scale, "x", 0, 10).name("x scale");
// object3Folder.open();

const cubeFolder = gui.addFolder("Cube");
cubeFolder.add(cube.position, "x", -10, 10).name("x position");
cubeFolder.add(cube.rotation, "x", 0, Math.PI * 2).name("x rotation");
cubeFolder.add(cube.scale, "x", 0, 10).name("x scale");
cubeFolder.open();

const cubeData = {
  width: 1,
  height: 1,
  depth: 1,
  widthSegments: 3,
  heightSegments: 3,
  depthSegments: 3,
};

const cubePropertiesFolder = gui.addFolder("Cube Properties");
cubePropertiesFolder
  .add(cubeData, "width", 1, 30)
  .onChange(regenerateBoxGeometry)
  .onFinishChange(() => console.log(cube.geometry));

cubePropertiesFolder
  .add(cubeData, "height", 1, 30)
  .onChange(regenerateBoxGeometry);
cubePropertiesFolder
  .add(cubeData, "depth", 1, 30)
  .onChange(regenerateBoxGeometry);
cubePropertiesFolder
  .add(cubeData, "widthSegments", 1, 30)
  .onChange(regenerateBoxGeometry);
cubePropertiesFolder
  .add(cubeData, "heightSegments", 1, 30)
  .onChange(regenerateBoxGeometry);
cubePropertiesFolder
  .add(cubeData, "depthSegments", 1, 30)
  .onChange(regenerateBoxGeometry);

cubePropertiesFolder.open();

function regenerateBoxGeometry() {
  const newGeometry = new THREE.BoxGeometry(
    cubeData.width,
    cubeData.height,
    cubeData.depth,
    cubeData.widthSegments,
    cubeData.heightSegments,
    cubeData.depthSegments
  );
  cube.geometry.dispose();
  cube.geometry = newGeometry;
}

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GUI } from "dat.gui";

const stats = new Stats();
document.body.appendChild(stats.dom);

const debug = document.getElementById("debug1") as HTMLDivElement;

const animate = (render: THREE.WebGLRenderer) => {
  requestAnimationFrame(() => animate(render));

  render.render(scene, camera);
  stats.update();
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

camera.position.set(8, 4, 4);
camera.position.set(1, 2, 5);

const boxGeometry = new THREE.BoxGeometry();
const sphereGeometry = new THREE.SphereGeometry();
const icosahedronGeometry = new THREE.IcosahedronGeometry();
const planeGeometry = new THREE.PlaneGeometry();
const toursKnotGeometry = new THREE.TorusKnotGeometry();

const material = new THREE.MeshBasicMaterial();

const texture = new THREE.TextureLoader().load("img/grid.png");
material.map = texture;

const envTexture = new THREE.CubeTextureLoader().load([
  "img/px_50.png",
  "img/nx_50.png",
  "img/py_50.png",
  "img/ny_50.png",
  "img/pz_50.png",
  "img/nz_50.png",
]);
envTexture.mapping = THREE.CubeReflectionMapping;
// envTexture.mapping = THREE.CubeRefractionMapping;
material.envMap = envTexture;
material.needsUpdate = true;

const cube = new THREE.Mesh(boxGeometry, material);
cube.position.x = 5;
scene.add(cube);
const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.position.x = 3;
scene.add(sphere);
const icosahedron = new THREE.Mesh(icosahedronGeometry, material);
icosahedron.position.x = 1;
scene.add(icosahedron);
const plane = new THREE.Mesh(planeGeometry, material);
plane.position.x = -1;
scene.add(plane);

const torusKnot = new THREE.Mesh(toursKnotGeometry, material);
torusKnot.position.x = -4;
scene.add(torusKnot);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

animate(renderer);
renderer.render(scene, camera);

// dat.gui

const options = {
  side: {
    FrontSide: THREE.FrontSide,
    BackSide: THREE.BackSide,
    DoubleSide: THREE.DoubleSide,
  },
  combine: {
    MultiplyOperation: THREE.MultiplyOperation,
    MixOperation: THREE.MixOperation,
    AddOperation: THREE.AddOperation,
  },
};
const gui = new GUI();

const materialFolder = gui.addFolder("Material");
materialFolder
  .add(material, "transparent")
  .onChange(() => (material.needsUpdate = true));
materialFolder.add(material, "opacity", 0, 1, 0.01);
materialFolder.add(material, "depthTest");
materialFolder.add(material, "depthWrite");
materialFolder
  .add(material, "alphaTest", 0, 1, 0.01)
  .onChange(() => updateMaterial());
materialFolder.add(material, "visible");
materialFolder
  .add(material, "side", options.side)
  .onChange(() => updateMaterial());

const data = {
  color: material.color.getHex(),
};
const meshBasicMaterialFolder = gui.addFolder("MeshBasicMaterial");
meshBasicMaterialFolder.addColor(data, "color").onChange(() => {
  const newColor = data.color.toString().replace("#", "0x");
  material.color.setHex(Number(newColor));
});
meshBasicMaterialFolder.add(material, "wireframe");
meshBasicMaterialFolder.add(material, "reflectivity", 0, 1, 0.1);
// meshBasicMaterialFolder.add(material, "refractionRatio", 0, 1, 0.1); (take effect only when envMap = CubeRefractionMapping)
meshBasicMaterialFolder
  .add(material, "combine", options.combine)
  .onChange(() => updateMaterial());

meshBasicMaterialFolder.open();

function updateMaterial() {
  material.side = Number(material.side) as THREE.Side;
  material.combine = Number(material.combine) as THREE.Combine;
  material.needsUpdate = true;
}

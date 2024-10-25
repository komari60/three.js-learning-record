import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// http://localhost:5173/

var scene, cube, camera, renderer, plane;
var axesHelper, controlCamera, ambientLight, cylinderGeometry, spotLight;
// var changeCamera

init();
render();
createLight();
initSpotLight();
initScene();

function initScene(){
    scene = new THREE.Scene();
}

function init() {

    var firstbox = new THREE.BoxGeometry(2, 5, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    cube = new THREE.Mesh(firstbox, material);
    scene.add(cube);

    axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.position.x = 2;
    camera.position.y = 0.4;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, innerHeight);
    document.body.appendChild(renderer.domElement);

    controlCamera = new OrbitControls(camera, renderer.domElement);

    var firsPlane = new THREE.PlaneGeometry(200, 100);
    var planMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
    plane = new THREE.Mesh(firsPlane, planMaterial);
    plane.position.set(0, -3, 0);
    scene.add(plane);
    plane.rotation.x = -Math.PI / 2;

    var firstcylinderGeometry = new THREE.CylinderGeometry(1, 1, 8, 64, 1, false);
    var cylinderGeometryMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    cylinderGeometry = new THREE.Mesh(firstcylinderGeometry, cylinderGeometryMaterial);
    cylinderGeometry.position.set(-4, 0, 0);
    scene.add(cylinderGeometry);
}

// function createLight() {
//     ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
//     scene.add(ambientLight);
// }

function initSpotLight(){
    spotLight = new THREE.SpotLight(0xffffff, 1000000);
    spotLight.position.set(-50, 80, 0);
    scene.add(spotLight);
}

function render() {
    renderer.render(scene, camera);
    cube.rotation.y += 0.01;
    // cylinderGeometry.rotation.x += 0.1;
    cylinderGeometry.rotation.z += 0.1;
    cylinderGeometry.rotation.y += 0.1;
    requestAnimationFrame(render);
}

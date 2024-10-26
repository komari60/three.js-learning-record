import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer;
let axesHelper, controlCamera, ambientLight, spotLight;
let cube, plane, cylinderGeometry;

main();
function main(){
    initScene();
    initRenderer();
    initCamera();
    initControlCamera();
    initAmbientLight();
    init();
    initSpotLight();
    render();
}


function initScene(){
    scene = new THREE.Scene();
}

function initRenderer() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function initCamera(){
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.position.x = 2;
    camera.position.y = 0.4;
    camera.lookAt(0, 0, 0);
}

function initControlCamera(){
    controlCamera = new OrbitControls(camera, renderer.domElement);
}

function initAmbientLight() {
    ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
}

function init() {

    // 坐标轴
    axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // 创建的
    const firstbox = new THREE.BoxGeometry(2, 5, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0xffff00 });
    cube = new THREE.Mesh(firstbox, material);
    // cube.castShadow = true;
    scene.add(cube);

    const firsPlane = new THREE.PlaneGeometry(200, 100);
    const planMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
    plane = new THREE.Mesh(firsPlane, planMaterial);
    plane.position.set(0, -3, 0);
    // plane.receiveShadow = true;
    scene.add(plane);
    plane.rotation.x = -Math.PI / 2;

    const firstCylinderGeometry = new THREE.CylinderGeometry(1, 1, 8, 64, 1, false);
    const cylinderGeometryMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    cylinderGeometry = new THREE.Mesh(firstCylinderGeometry, cylinderGeometryMaterial);
    cylinderGeometry.position.set(-4, 0, 0);
    scene.add(cylinderGeometry);
    
}

function initSpotLight(){
    spotLight = new THREE.SpotLight(0xffffff, 1);
    // spotLight.angle = Math.PI / 4;
    // spotLight.distance = 100;
    // spotLight.penumbra = 0.5;
    // spotLight.decay = 2;
    spotLight.position.set(-40, 80, 0);
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

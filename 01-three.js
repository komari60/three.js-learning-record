import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer;
let axesHelper, controlCamera, ambientLight, spotLight;
let cube, plane, cylinderGeometry;

main();
function main() {
    initScene();
    initRenderer();
    initCamera();
    initControlCamera();
    initAmbientLight();
    init();
    initSpotLight();
    render();
}


function initScene() {
    scene = new THREE.Scene();
}

function initRenderer() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.position.x = 2;
    camera.position.y = 0.4;
    camera.lookAt(0, 0, 0);
}

function initControlCamera() {
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
    const firstBox = new THREE.BoxGeometry(2, 5, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0xffff00, metalness: 0.5, roughness: 0.2 });
    cube = new THREE.Mesh(firstBox, material);
    cube.castShadow = true;
    scene.add(cube);

    const firstPlane = new THREE.PlaneGeometry(200, 100);
    const planMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, metalness: 0.5, roughness: 0.1 });
    plane = new THREE.Mesh(firstPlane, planMaterial);
    plane.position.set(0, -4, 0);
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    const firstCylinderGeometry = new THREE.CylinderGeometry(1, 1, 8, 64, 1, false);
    const cylinderGeometryMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00, specular: 0x111111, shininess: 500 });
    cylinderGeometry = new THREE.Mesh(firstCylinderGeometry, cylinderGeometryMaterial);
    cylinderGeometry.position.set(-4, 4, 0);
    cylinderGeometry.castShadow = true;
    scene.add(cylinderGeometry);
    
}

// 聚光灯
function initSpotLight() {
    spotLight = new THREE.SpotLight(0xffffff, 256);
    spotLight.penumbra = 0.4;
    spotLight.angle = Math.PI / 4;
    spotLight.distance = 100;
    spotLight.decay = 1.6;
    spotLight.position.set(-10, 8, 20);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.height = 2048;
    spotLight.shadow.mapSize.width = 2048;
    scene.add(spotLight);
}

function render() {
    const time = Date.now() * 0.001;
    const amplitude = 1;
    const speed = 2.2;
    const changeyPosition = Math.sin(time * speed) * amplitude;
    cube.position.y = changeyPosition;
    cube.rotation.y += 0.01;
    cylinderGeometry.rotation.z += 0.1;
    cylinderGeometry.rotation.y += 0.1;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

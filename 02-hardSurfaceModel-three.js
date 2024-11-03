import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer;
let axesHelper, controlCamera, ambientLight, spotLight;
let cube, plane, cylinderGeometry, objModel;

main(); 
async function main() {
    initScene();
    initRenderer();
    initCamera();
    initControlCamera();
    initAmbientLight();
    init();
    await initObjModel();
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
    axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
    const firstBox = new THREE.BoxGeometry(2, 5, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0xffff00, metalness: 0.5, roughness: 0.2 });
    cube = new THREE.Mesh(firstBox, material);
    cube.castShadow = true;
    cube.position.x = 5;
    scene.add(cube);
}

async function initObjModel() {
    const { OBJLoader } = await import('three/examples/jsm/loaders/OBJLoader.js');
    if (!OBJLoader) {
        console.error('OBJLoader is not available');
        return;
    }

    objModel = new OBJLoader();
    objModel.load(
        './model/hardSurfaceModel01.obj', // 替换为你的 OBJ 文件路径
        (object) => {
            object.scale.set(10);
            object.position.set(0, 0, 0);
            const boxHelper = new THREE.BoxHelper(object, 0xff0000);
            scene.add(object, boxHelper);
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (error) => {
            console.error('An error happened', error);
        }
    );
}

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
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
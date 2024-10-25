import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // 引入OrbitControls控件
// http://localhost:5173/

var scene, cube, camera, renderer, plane;
var axesHelper, controlCamera, ambientLight, cylinderGeometry;


init();
render();
createLight();

function init() {
    scene = new THREE.Scene(); // 创建场景对象

    var firstbox = new THREE.BoxGeometry(2, 5, 1); // 创建立方体
    var boxMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); //立方体材质 颜色值为16进制
    cube = new THREE.Mesh(firstbox, boxMaterial);
    scene.add(cube); // 添加到场景中

    axesHelper = new THREE.AxesHelper(5); // 添加xyz坐标轴线
    scene.add(axesHelper);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // 创建透视摄像头
    camera.position.z = 5; // 设置摄像头在z轴的位置 (距离标原点)
    camera.position.x = 2;  // 设置摄像头在x轴的位置 (距离标原点)
    camera.position.y = 0.4; // 设置摄像头在y轴的位置 (距离标原点)

    renderer = new THREE.WebGLRenderer(); // 创建一个WebGL渲染器
    renderer.setSize(window.innerWidth, innerHeight); // 设置渲染器尺寸 与窗口大小一致
    document.body.appendChild(renderer.domElement); // 将渲染器的DOM元素添加到页面中

    controlCamera = new OrbitControls(camera, renderer.domElement); // 调用OrbitControls控件 (需要知道哪个摄像机需要被控制,需要监听用户的输入事件)

    var firsPlane = new THREE.PlaneGeometry(8, 4);
    var planMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
    plane = new THREE.Mesh(firsPlane, planMaterial);
    plane.position.set(0, -3, 0); // 设置平面位置 (x, y, z)
    scene.add(plane);
    plane.rotation.x = -Math.PI / 2; // 旋转平面 -90° 2分之Π

    var firstcylinderGeometry = new THREE.CylinderGeometry(1, 1, 8, 64, 1, false); // 创建圆柱体 (上底半径, 下底半径, 高度, 圆的段数, 高度段数, 是否有底)
    var cylinderGeometryMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    cylinderGeometry = new THREE.Mesh(firstcylinderGeometry, cylinderGeometryMaterial);
    cylinderGeometry.position.set(-4, 0, 0);
    scene.add(cylinderGeometry);
}

// function createLight() {
//     ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
//     scene.add(ambientLight);
// }

function render() {
    renderer.render(scene, camera); // 渲染场景
    cube.rotation.y += 0.01; // 旋转立方体 绕着y轴 每帧0.1弧度
    // cylinderGeometry.rotation.x += 0.1;
    cylinderGeometry.rotation.z += 0.1;
    cylinderGeometry.rotation.y += 0.1;
    requestAnimationFrame(render); // 请求下一帧，实现动画效果
}

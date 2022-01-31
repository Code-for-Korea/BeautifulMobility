//import * as THREE from 'https://cdn.skypack.dev/three@0.135.0/build/three.module.js'
//import { OrbitControls } from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/controls/OrbitControls.js'
import * as THREE from '/js/three/build/three.module.js';
import { OrbitControls } from '/js/three/examples/jsm/controls/OrbitControls.js';


//// 초기화
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xbfd1e5 );

// 랜더러
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0xbfd1e5 );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// 카메라
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
const controls = new OrbitControls( camera, renderer.domElement );



// 조명
let dirLight = new THREE.DirectionalLight( 0xffffff , 1);
dirLight.color.setHSL( 0.1, 1, 0.95 );
dirLight.position.set( -1, 1.75, 1 );
dirLight.position.multiplyScalar( 100 );
scene.add( dirLight );

//const light = new THREE.AmbientLight( 0x404040 ); // soft white light
//scene.add( light );
const directionalLight = new THREE.DirectionalLight( 0xff0000, 0.5 );
directionalLight.position.set(10,10,10)
scene.add( directionalLight );


//// 오브젝트 생성
// Ground
const ground_geo = new THREE.BoxGeometry(5,0.2,5);
    const ground = new THREE.Mesh( ground_geo, new THREE.MeshPhongMaterial({color: 0xa0afa4}) );
scene.add( ground );

// 카메라 설정
camera.position.set(5,5,5);
camera.lookAt(0,0,0)


function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
};

animate();
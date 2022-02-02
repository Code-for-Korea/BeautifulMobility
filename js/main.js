//import * as THREE from 'https://cdn.skypack.dev/three@0.135.0/build/three.module.js'
//import { OrbitControls } from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/controls/OrbitControls.js'
import * as THREE from '/js/three/build/three.module.js';
import { OrbitControls } from '/js/three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from '/js/three/examples/jsm/loaders/FBXLoader.js'
import { OBJLoader } from '/js/three/examples/jsm/loaders/OBJLoader.js'
 

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


//// 오브젝트 생성
// Ground
//const ground_geo = new THREE.BoxGeometry(5,0.2,5);
//    const ground = new THREE.Mesh( ground_geo, new THREE.MeshPhongMaterial({color: 0xa0afa4}) );
//scene.add( ground );

// Gound (FBX Obj)
let obj_ground = undefined;
const fbxLoader = new FBXLoader()
fbxLoader.load(
    '/asset/ground.fbx',
    (object) => {
        scene.add(object);
        obj_ground = object;
    },
    (xhr) => {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    (error) => {
        console.log(error)
    }
)

// Wheelchair (Obj)
let obj_wheelchair = undefined;
const obj_loader = new OBJLoader();
obj_loader.load(
	// resource URL
	'/asset/wheelchair.obj',
	function ( object ) {
		scene.add( object );
        obj_wheelchair = object
	},
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.log( 'An error happened' );
	}
);

// 카메라 설정
camera.position.set(5,5,5);
camera.lookAt(0,0,0)


function animate() {
    requestAnimationFrame( animate );
    if (obj_wheelchair != undefined) {
        obj_wheelchair.position.z -= 0.01;
        if(obj_wheelchair.position.z < -5)
            obj_wheelchair.position.z = 0; 
    }

    renderer.render( scene, camera );
};

animate();
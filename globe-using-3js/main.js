import * as THREE from 'three';


//basic objects
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//setting position is imp
camera.position.z = 15
//                              smoothing image
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
// making picture clean
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement);

// creating sphere
const geometry = new THREE.SphereGeometry(5, 50, 50);
// covering sphere with map
const material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("./partials/globe.jpg") });
const sphere = new THREE.Mesh(geometry, material); scene.add(sphere)
scene.add(sphere)


// animate function
const animate = () => {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  sphere.rotation.y += 0.01
}
animate()
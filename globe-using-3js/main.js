import * as THREE from 'three';


//basic objects
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// creating sphere
const geometry = new THREE.SphereGeometry(5, 50, 50);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const sphere = new THREE.Mesh(geometry, material); scene.add(sphere)
scene.add(sphere)


// animate function
const animate = () => {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()
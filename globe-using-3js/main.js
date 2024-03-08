import * as THREE from 'three';
import vertexShader from "./shaders/vertex.glsl"
import fragmentShader from "./shaders/fragment.glsl"
import atmosphereVertexShader from "./shaders/atmosphereVertex.glsl"
import atmosphereFragmentShader from "./shaders/atmosphereFragments.glsl"
import gsap from 'gsap';

//basic objects
const scene = new THREE.Scene();
const canvasContainer = document.querySelector("#canvasContainer")
// console.log(canvasContainer);
const camera = new THREE.PerspectiveCamera(75, canvasContainer.offsetWidth / canvasContainer.offsetHeight, 0.1, 1000);
//setting position is imp
camera.position.z = 15
//                              smoothing image
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.querySelector("canvas")
});


renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
// making picture clean
renderer.setPixelRatio(window.devicePixelRatio)


// creating sphere
const geometry = new THREE.SphereGeometry(5, 50, 50);
// covering sphere with map


// const material = new THREE.MeshBasicMaterial({
//   //  map: new THREE.TextureLoader().load("./partials/globe.jpg") 

// });

// creating custom shader
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    globeTexture: {
      value: new THREE.TextureLoader().load("./partials/globe.jpg")
    }
  }
})
const sphere = new THREE.Mesh(geometry, material); scene.add(sphere)
// scene.add(sphere)

//atmosphere mesh
const atmosphereGeometry = new THREE.SphereGeometry(5, 50, 50)
const atmosphereMaterial = new THREE.ShaderMaterial(
  {
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
  }
)
const atmosphere = new THREE.Mesh(
  atmosphereGeometry,
  atmosphereMaterial
)
atmosphere.scale.set(1.1, 1.1, 1.1)
scene.add(atmosphere)
const group = new THREE.Group()
group.add(sphere)
scene.add(group)


const starGeometry = new THREE.BufferGeometry()
const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff
})
const startVertices = []
for (let i = 0; i < 10000; i++) {
  const x = (Math.random() - 0.5) * 2000
  const y = (Math.random() - 0.5) * 2000
  const z = -Math.random() * 12000
  startVertices.push(x, y, z)
}
starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(startVertices, 3))
const stars = new THREE.Points(starGeometry, starMaterial)
scene.add(stars)


//mouse interaction
const mouse = {
  x: undefined,
  y: undefined
}

// animate function
const animate = () => {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  sphere.rotation.y += 0.01
  gsap.to(group.rotation, {
    x: -mouse.y * 0.3,
    y: mouse.x * 0.5,
    duration: 2
  })
}
animate()


addEventListener("mousemove", (e) => {

  mouse.x = ((e.clientX / innerWidth) * 2) - 1
  mouse.y = -((e.clientY / innerHeight) * 2) + 1
  // console.log(mouse);
})

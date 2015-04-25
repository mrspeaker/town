import things from './things';

let ground;

things.load.then(() => {
  const groundGeom = new THREE.PlaneBufferGeometry(30, 30, 32, 32);
  const groundMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
  ground = new THREE.Mesh(groundGeom, groundMaterial);
  ground.rotation.x = -Math.PI / 2;

});

export default () => ground.clone();

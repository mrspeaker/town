let height = window.innerHeight;
let width = window.innerWidth;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
const r = new THREE.WebGLRenderer({ canvas: document.querySelector('#board'), antialias: true });

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  r.setSize(width, height);
}, false);

r.setSize(width, height);
r.setClearColor(0x282E3F, 1);

const manager = new THREE.LoadingManager();
//const loader = new THREE.ImageLoader( manager );
//loader.load('textures/UV_Grid_Sm.jpg', function ( image ) {
//          texture.image = image;
//          texture.needsUpdate = true;
//} );


const things = [];
//THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
var loader = new THREE.OBJMTLLoader(manager);

['test', 'Banner_01', 'Tree_01', 'Wood_Border_Wall_01'].forEach(file => {
  loader.load( `res/${file}.obj`, `res/${file}.mtl`, function ( object ) {
    object.position.z = -(Math.random() * 20) - 20;
    object.position.x = (Math.random() * 20) - 10;
    object.position.y = (Math.random() * 20) - 10;

    //object.rotation.y = Math.PI / 2;
    scene.add(object);
    things.push(object);
  });
});

let house;
setTimeout(() => {
  for (var i =0; i < 10; i++) {
    const t2 = things[2].clone();
    t2.position.set((i - 5) * 2 + 1.5, 0, -30);
    t2.rotation.set(0, 0, 0);
    scene.add(t2);
  }

house = new THREE.Object3D();

let wall = things[3].clone();
wall.position.set(0, 0, 0);
wall.rotation.set(0, 0, 0);
house.add(wall);

let wall2 = things[3].clone();
wall2.position.set(2.5, 0, 0);
wall2.rotation.set(0, 0, 0);
house.add(wall2);


let roof = things[0].clone();
roof.position.set(1.45, 0.85, -1.65);
roof.rotation.set(0, 0, 0);
house.add(roof);

house.position.set(5, -0.5, -38);
house.rotation.y = Math.PI / 3;
scene.add(house);

}, 1000);


scene.add(new THREE.AmbientLight(0x555555));
const light2 = new THREE.DirectionalLight(0xffffff, 0.9);
light2.position.set(0, -5, 10);
scene.add(light2);


let last, start, dt;
function animate (time) {

  if (!last) { last = start = time; }
  dt = time - last;
  last = time;

  time *= 0.0001;
  requestAnimationFrame(animate);

  things.forEach(t => {
    t.rotation.x += dt * 0.0007;
    t.rotation.y += dt * 0.0009;
    t.rotation.z += dt * 0.0008;
  })
  r.render(scene, camera);
  camera.position.z = (Math.sin(Date.now() / 2000) * 10) - 11
  camera.position.y = 2

  if (house) house.rotation.y += dt * 0.0005;
};
requestAnimationFrame(animate);

export default {};

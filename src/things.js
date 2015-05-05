import manager from './loaderManager';

const objectsToLoad = [
  { name: 'roof', file: 'villiage/Roof_Point_Green_01' },
  { name: 'fire', file: 'nature/Campfire_01' },
  { name: 'trunk', file: 'nature/Tent_01' },
  { name: 'tree', file: 'villiage/Tree_01' },
  { name: 'wall', file: 'villiage/Wood_Window_Round_01' }
];

const loader = new THREE.OBJMTLLoader(manager);
const things = {
  textures: {},
  o: {},
  load: new Promise((res, rej) => {
    manager.onLoad = () => res();
  })
};

//const loader = new THREE.ImageLoader( manager );
//loader.load('textures/UV_Grid_Sm.jpg', function ( image ) {
//          texture.image = image;
//          texture.needsUpdate = true;
//} );

objectsToLoad.forEach(({name, file}, i) => {
  loader.load( `res/${file}.obj`, `res/${file}.mtl`, object => {
    things.o[name] = object;
  });
});

export default things;
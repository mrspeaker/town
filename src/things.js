import manager from './loaderManager';

const objectsToLoad = [
  { name: 'roof', file: 'test' },
  { name: 'banner', file: 'Banner_01' },
  { name: 'tree', file: 'Tree_01' },
  { name: 'wall', file: 'Wood_Border_Wall_01' }
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
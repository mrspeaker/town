import things from './things';

let house;

things.load.then(() => {

  house = new THREE.Object3D();

  const wall = things.o.wall.clone();
  wall.position.set(0, 0, 0);
  wall.rotation.set(0, 0, 0);
  house.add(wall);

  const wall2 = things.o.wall.clone();
  wall2.position.set(2.5, 0, 0);
  wall2.rotation.set(0, 0, 0);
  house.add(wall2);

  const roof = things.o.roof.clone();
  roof.position.set(1.45, 0.85, -1.65);
  roof.rotation.set(0, 0, 0);
  house.add(roof);

  house.traverse(o => {
    if (o === house) return;
    o.castShadow = true;
    o.receiveShadow = true;
  });

  return house;

});

export default () => house.clone();

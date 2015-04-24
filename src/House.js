import things from './things';

let house;

things.load.then(() => {

  house = new THREE.Object3D();

  let wall = things.o.wall.clone();
  wall.position.set(0, 0, 0);
  wall.rotation.set(0, 0, 0);
  house.add(wall);

  let wall2 = things.o.wall.clone();
  wall2.position.set(2.5, 0, 0);
  wall2.rotation.set(0, 0, 0);
  house.add(wall2);

  let roof = things.o.roof.clone();
  roof.position.set(1.45, 0.85, -1.65);
  roof.rotation.set(0, 0, 0);
  house.add(roof);

  return house;

});

export default () => house.clone();
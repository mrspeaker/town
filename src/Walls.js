import things from './things';

let walls;

things.load.then(() => {

  walls = new THREE.Object3D();

  const wall = things.o.wall.clone();
  wall.position.set(0, 0, 0);
  wall.rotation.set(0, 0, 0);
  walls.add(wall);

  const wall2 = things.o.wall.clone();
  wall2.position.set(2.5, 0, 0);
  wall2.rotation.set(0, 0, 0);
  walls.add(wall2);

  return walls;

});

export default () => walls.clone();

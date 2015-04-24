import env from './env';
import things from './things';
import House from './House';

const TownScreen = () => {

  const scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight(0x555555));
  const light2 = new THREE.DirectionalLight(0xffffff, 0.9);
  light2.position.set(0, -5, 10);
  scene.add(light2);

  let t;
  for (var i =0; i < 10; i++) {
    const t2 = things.o.tree.clone();
    t2.position.set((i - 5) * 2 + 1.5, 0, -30);
    t2.rotation.set(0, 0, 0);
    scene.add(t2);
    t = t2;
  }

  const house = House();
  house.position.set(5, -0.5, -38);
  house.rotation.y = Math.PI / 3;
  scene.add(house);

  const house2 = House();
  house2.position.set(-5, -0.5, -38);
  house2.rotation.y = Math.PI / 3;
  scene.add(house2);

  const tick = (dt) => {
    t.rotation.y += 0.001 * dt;
  }

  return {
    scene,
    tick
  };

};


export default TownScreen;

import env from './env';
import things from './things';
import House from './House';
import Ground from './Ground';
import Keys from './Keys';

const TownScreen = (camera) => {

  const keys = new Keys();
  const selectables = [];

  const scene = new THREE.Scene();
  //scene.add(new THREE.AmbientLight(0x777777));
   var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
    hemiLight.color.setHSL( 0.6, 0.75, 0.5 );
    hemiLight.groundColor.setHSL( 0.095, 0.5, 0.5 );
    hemiLight.position.set( 0, 200, 0 );
    scene.add( hemiLight );
  //const light2 = new THREE.DirectionalLight(0xffffff, 0.1);
  //light2.position.set(0, 0, 10);
  //scene.add(light2);

  var dirLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
            dirLight.position.set( -1, 0.75, 1 );
            dirLight.position.multiplyScalar(50);
  scene.add(dirLight)
  dirLight.shadowCameraNear = 60;
  dirLight.shadowCameraFar = 160;
  dirLight.shadowCameraLeft = -10.5;
  dirLight.shadowCameraRight = 10.5;
  dirLight.shadowCameraTop = 10.5;
  dirLight.shadowCameraBottom = -10.5;
  dirLight.shadowMapWidth = dirLight.shadowMapHeight = 1024*2;

  dirLight.castShadow = true;
  //dirLight.shadowCameraVisible = true;
    dirLight.shadowDarkness = 0.1 ;
  /*const spotLight = new THREE.DirectionalLight(0x777777, 0.6);
  //spotLight.shadowCameraVisible = true;
  spotLight.position.set(0, 3.8, -20);

  const tar = new THREE.Object3D();
  tar.position.set(0, 3.3, -21);
  scene.add(tar);
  spotLight.target = tar;

  spotLight.shadowCameraNear = 0.1;
  spotLight.shadowCameraFar = 25;

  spotLight.shadowCameraLeft = -12;
  spotLight.shadowCameraRight = 12;
  spotLight.shadowCameraTop = 10;
  spotLight.shadowCameraBottom = -10;

  spotLight.castShadow = true;
  spotLight.shadowDarkness = 0.4  ;*/

  //scene.add(spotLight);

  const mat = new THREE.MeshPhongMaterial({color:0x550000 });

  const ground = Ground();
  ground.position.set(0, -0.2, 0);
  ground.rotation.set(-Math.PI / 2, 0, 0);
  ground.receiveShadow = true;
  scene.add(ground);

  let t;
  for (var i =0; i < 10; i++) {
    const t2 = things.o.tree.clone();
    t2.castShadow = true;
    t2.traverse(o => o.castShadow = true);
    t2.position.set((i - 5) * 2 + 1.5, 0.1, 0);
    t2.rotation.set(0, 0, 0);
    scene.add(t2);
    selectables.push(t2);
    t = t2;
  }

  const house = House();
  house.position.set(5, -0.3, -3);
  house.rotation.y = Math.PI / 3;
  scene.add(house);
  selectables.push(house);

  const house2 = House();
  house2.position.set(-5, -0.3, -3);
  house2.rotation.y = Math.PI / 3;

  scene.add(house2);
  selectables.push(house2);

    camera.position.set(0, 1, 5);
    const raycaster = new THREE.Raycaster();

  const tick = (dt) => {
    t.rotation.y += 0.001 * dt;
    const x = keys.x();
    if (x) {
      camera.translateX(x * dt * 0.01);
    }
    const y = keys.y();
    if (y) {
      camera.translateZ(y * dt * 0.01);
    }
    const rot = keys.rot();
    if (rot) {
      camera.rotation.y += -rot * dt * 0.002;
    }

    if (keys.m.down) {
      raycaster.setFromCamera(keys.mouse(), camera);
      const intersects = raycaster.intersectObjects(selectables, true);
      const ch = Math.random();
      intersects.forEach(i => {
        if (ch !== i.object.ch) {
          i.object.ch = ch;
          if (i.object.material === mat) {
            i.object.material = i.object._oldMat;
          } else {
            i.object._oldMat = i.object.material;
            i.object.material = mat;
          }
        }
      });

      keys.m.down = false;
    }
  }

  return {
    scene,
    tick
  };

};


export default TownScreen;

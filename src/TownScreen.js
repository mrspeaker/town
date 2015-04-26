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

  for (var i =0; i < 10; i++) {
    const t2 = things.o.tree.clone();
    t2.name = "tree";
    t2.castShadow = true;
    t2.traverse(o => {
      o.castShadow = true;
      //o.userData.parent = t2;
    });
    t2.position.set((i - 5) * 2 + 1.5, 0.1, 0);
    t2.rotation.set(0, 0, 0);
    scene.add(t2);
    selectables.push(t2);
  }

  const house = House();
  house.position.set(5, -0.3, -3);
  house.rotation.y = Math.PI / 2;
  scene.add(house);
  house.traverse(h => h.userData.parent = house);
  selectables.push(house);

  const house2 = House();
  house2.position.set(-5, -0.3, -3);
  house2.rotation.y = Math.PI / 2;
  house2.traverse(h => h.userData.parent = house2);

  scene.add(house2);
  selectables.push(house2);

  camera.position.set(0, 1, 5);
  const raycaster = new THREE.Raycaster();

  const tick = (dt) => {

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

    let addX = 0;
    let addZ = 0;
    let p1;
    if (keys.m.down) {
      raycaster.setFromCamera(keys.mouse(), camera);
      const intersects = raycaster.intersectObjects(selectables, true);
      const n = Date.now();
      intersects.forEach(({ distance, point, face, faceIndex, indices, object }) => {
        const p = object.userData.parent;
        if(!p || p.userData.changed === n) return;
        p.userData.changed = n;
        //p.translateZ(Math.random() < 0.5 ? 0.3 : -0.3);

        console.log(distance, point, face, faceIndex)

        if (face.normal.z < -0.8) {
          addX = -1;
          p1 = p;

        } else if (face.normal.z > 0.8) {
          addX = 1;
          p1 = p;
        }

        if (face.normal.x < -0.8) {
          addZ = -1;
          p1 = p;

        } else if (face.normal.x > 0.8) {
          addZ = 1;
          p1 = p;
        }

        if (object.material === mat) {
          object.material = object._oldMat;
        } else {
          object._oldMat = object.material;
          object.material = mat;
        }
      });

      if (addX !== 0) {
        const l = House();
        l.position.copy(p1.position);
        l.rotation.copy(p1.rotation);
        l.position.x += addX * 3;
        l.traverse(h => h.userData.parent = l);
        selectables.push(l);
        scene.add(l);
      }

      if (addZ !== 0) {
        const l = House();
        l.position.copy(p1.position);
        l.rotation.copy(p1.rotation);
        l.position.z -= addZ * 3.5;
        l.traverse(h => h.userData.parent = l);
        selectables.push(l);
        scene.add(l);
      }

      keys.m.down = false;
    }

  }

  return {
    scene,
    tick
  };

};


export default TownScreen;

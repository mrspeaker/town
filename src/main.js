import env from './env';
import things from './things';
import TownScreen from './TownScreen';

const camera = new THREE.PerspectiveCamera(60, env.w / env.h, 0.1, 1000);
const r = new THREE.WebGLRenderer({ canvas: document.querySelector('#board'), antialias: true });
r.shadowMapEnabled = true;
r.shadowMapSoft = true;

env.onResize(() => {
  camera.aspect = env.w / env.h;
  camera.updateProjectionMatrix();
  r.setSize(env.w, env.h);
});

r.setSize(env.w, env.h);
r.setClearColor(0x282E3F, 1);

things.load.then(() => {

  const screen = TownScreen(camera);

  let last, start, dt;
  function animate (time) {

    if (!last) { last = start = time; }
    dt = time - last;
    last = time;

    time *= 0.0001;
    requestAnimationFrame(animate);

    r.render(screen.scene, camera);

    screen.tick(dt);
  };
  requestAnimationFrame(animate);

});

export default {};

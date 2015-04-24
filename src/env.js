const env = {
  w: window.innerWidth,
  h: window.innerHeight,
  onResize(handler) {
    handlers.push(handler);
  }
}

const handlers = [];
window.addEventListener('resize', () => {
  env.w = window.innerWidth;
  env.h = window.innerHeight;
  handlers.forEach(h => h(env));
}, false);

export default env;

const lol = 10;

const env = {
  w: window.innerWidth - lol,
  h: window.innerHeight - lol,
  onResize(handler) {
    handlers.push(handler);
  }
}

const handlers = [];
window.addEventListener('resize', () => {
  env.w = window.innerWidth - lol;
  env.h = window.innerHeight - lol;
  handlers.forEach(h => h(env));
}, false);

export default env;

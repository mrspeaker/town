let h = window.innerHeight;
let w = window.innerWidth;
const handlers = [];

window.addEventListener('resize', () => {
  env.w = window.innerWidth;
  env.h = window.innerHeight;
  handlers.forEach(h => h(env));
}, false);

export default {
  w,
  h,
  onResize(handler) {
    handlers.push(handler);
  }
}

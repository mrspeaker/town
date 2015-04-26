class Keys {

  constructor () {
    this._keys = [];
    this.m = new THREE.Vector2();
    document.addEventListener('keydown', e => {
      if ([37, 38, 39, 40].indexOf(e.which) >= 0) {
        e.preventDefault();
      }
      this._keys[e.which] = 1;
    }, false);
    document.addEventListener('keyup', e => {
      this._keys[e.which] = 0;
    }, false);

    document.addEventListener('mousemove', e => {
      event.preventDefault();
      this.m.x = ( e.clientX / window.innerWidth ) * 2 - 1;
      this.m.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    }, false);

  }

  x () {
    var left = !!(this._keys[37] || this._keys[81]);
    var right = !!(this._keys[39]);
    return -left + right;
  }

  y () {
    var up = !!(this._keys[38] || this._keys[90] || this._keys[87]);
    var down = !!(this._keys[40] || this._keys[83]);
    return -up + down;
  }

  rot () {
    var left = !!(this._keys[65]);
    var right = !!(this._keys[68]);
    return -left + right;
  }

  mouse () {
    return this.m;
  }


};

export default Keys;
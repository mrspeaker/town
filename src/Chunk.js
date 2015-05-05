import Block from './Block';
import House from './House';
import Walls from './Walls';

class Chunk {
  constructor (scene) {
    this.scene = scene;
    this.time = 0;
    const blocks = [];
    for (let z = 0; z < 16; z++) {
      const yblocks = [];
      blocks.push(yblocks);
      for (let y = 0; y < 5; y++) {
        const xblocks = [];
        yblocks.push(xblocks);
        for (let x = 0; x < 16; x++) {
          xblocks.push(new Block(0, {x, y, z}));
        }
      }
    }
    this.blocks = blocks;

    let x = Math.random() * 16 | 0;
    //const y = Math.random() * 5 | 0;
    let z = Math.random() * 16 | 0;
    this.setBlock({z, y:0, x});

  }

  setBlock ({x, y, z}) {
    if (this.blocks[z][y][x].type) {
      console.log('already here');
      return;
    }
    this.blocks[z][y][x].type = 1;
    const h = House();
    h.position.set(x * 2.5, y * 2.2 - 0.4, z * 2.5);
    this.scene.add(h);
    this.blocks[z][y][x].obj = h;

    // Remove roof below
    if (y > 0 && this.blocks[z][y - 1][x]) {
      const below = this.blocks[z][y - 1][x].obj;
      this.scene.remove(below);

      const w = Walls();
      w.position.copy(below.position);
      w.rotation.copy(below.rotation);
      this.scene.add(w);
    }
  }

  getBlock({x, y, z}) {

  }

  getBelow({x, y, z}) {

  }

  evolve () {

    for (var z = 0; z < 16; z++) {
      for (var y = 0; y < 5; y++) {
        for (var x = 0; x < 16; x++) {

          if (this.blocks[z][y][x].type !== 0 && Math.random() < 0.1) {

            const dir = Math.random() * 6 | 0;
            if ((dir === 0 || dir ==5) && x > 0 && this.blocks[z][y][x - 1].type ===0) {
              if (y === 0 || this.blocks[z][y - 1][x - 1].type !== 0) {
                this.setBlock({z, y, x: x - 1});
              }
            }
            if (dir === 1 && x < 15 && this.blocks[z][y][x + 1].type === 0) {
              if (y === 0 || this.blocks[z][y - 1][x + 1].type !== 0) {
                this.setBlock({z, y, x: x + 1});
              }
            }
            if (dir === 2 && z > 0 && this.blocks[z - 1][y][x].type === 0) {
              if (y === 0 || this.blocks[z - 1][y - 1][x].type !== 0) {
                this.setBlock({z: z - 1, y, x});
              }
            }
            if (dir === 3 && z < 15 && this.blocks[z + 1][y][x].type === 0) {
              if (y === 0 || this.blocks[z + 1][y - 1][x].type !== 0) {
                this.setBlock({z: z + 1, y, x});
              }
            }
            if (dir == 4) {
              this.setBlock({z, y: y + 1, x});
            }
          }

        }
      }
    }

  }

  tick (dt) {
    this.time += dt;
    if (this.time > 2300) {
      this.time -= 2300;
      this.evolve();
    }
  }
}

export default Chunk;
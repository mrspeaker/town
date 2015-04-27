class Block {
  constructor (type, pos) {
    this.type = type;
    this.pos = pos;
    this.state = 'idle';
  }
};

export default Block;
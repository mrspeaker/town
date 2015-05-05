import things from './things';

export default (type, pos = {x: 0, y: 0, z: 0}) => {

  const obj = things.o[type].clone();
  const {x, y, z} = pos;
  obj.position.set(x, y, z);
  obj.rotation.set(0, 0, 0);
  return obj;

}

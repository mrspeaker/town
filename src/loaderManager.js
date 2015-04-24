const manager = new THREE.LoadingManager();

manager.onProgress = (item, loaded, total ) => {
  console.log('Loading: ' + item, loaded, total);
};

export default manager;
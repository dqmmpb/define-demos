
requirejs.config({
  //baseUrl: 'scripts',
  paths: {
    amd: '../libs/amd'
  },
  //把node自身的require方法传递给requirejs
  nodeRequire: require
});

requirejs([
  'app'
], function(app) {

});
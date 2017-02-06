if(typeof requirejs === 'undefined')
  var requirejs = require('requirejs');

requirejs.config({
  //把node自身的require方法传递给requirejs
  nodeRequire: require
});

requirejs([
  './amd/app'
], function(app) {

});
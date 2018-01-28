'use strict';

var module1 = (function (mod) {

  mod.add = function (x, y) {
    return x + y;
  };
  mod.multiply = function (x, y) {
    return x * y;
  };
  return mod;
})(module1 || {});

console.log(module1.add(1, 2));

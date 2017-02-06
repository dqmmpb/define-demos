'use strict';

var module1 = (function() {
  var _count = 0;
  var add = function(x, y) {
    return x + y;
  };
  var multiply = function(x, y) {
    return x * y;
  };

  return {
    add: add,
    multiply: multiply
  }
})();

console.log(module1.add(1, 2));
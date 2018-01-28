'use strict';

var module1 = new Object({
  _count: 0,
  add: function (x, y) {
    return x + y;
  },
  multiply: function (x, y) {
    return x * y;
  }
});

console.log(module1.add(1, 2));

/*global module */
'use strict';

var add = function (x, y) {
  return x + y;
};

var subtract = function (x, y) {
  return x - y;
};

var multiply = function (x, y) {
  return x * y;
};

var divide = function (x, y) {
  return x / y;
};

var abs = function (x) {
  try {
    var num = Number(x);
    return num >= 0 ? num : -num;
  } catch (err) {
    return x;
  }
};

module.exports = {
  add: add,
  subtract: subtract,
  multiply: multiply,
  divide: divide,
  abs: abs
};

console.log('------------------------');

console.log(module.id);
console.log(module.filename);
console.log(module.loaded);
console.log(module.parent);
console.log(module.children);
console.log(module.exports);
console.log(module.paths);
console.log(module);

console.log('------------------------');

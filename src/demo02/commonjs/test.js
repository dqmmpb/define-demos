/*global module */

var math = require('./math');

console.log(math.add(3, 4));
console.log(math.abs(10));
console.log(math.abs(-10));
console.log(math.abs('a12'));
console.log(math.abs('123'));

var requirejs = require('requirejs');

exports.r = requirejs;

console.log(module);
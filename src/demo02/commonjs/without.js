/*global module */
var counter = require('./counter').counter;
var incCounter = require('./counter').incCounter;

console.log(counter);
incCounter();
console.log(counter);
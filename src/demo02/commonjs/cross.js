/*global module */

console.log('cross.js', require('./a').x);
console.log('cross.js', require('./b').x);

console.log(require.main === module);
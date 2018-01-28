/*global module */

exports.x = 'a1';
console.log('a.js', require('./b').x);
exports.x = 'a2';

console.log(require.main === module);

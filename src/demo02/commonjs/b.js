exports.x = 'b1';
console.log('b.js', require('./a').x);
exports.x = 'b2';
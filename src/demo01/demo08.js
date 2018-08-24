'use strict';

console.log(0b1111);
console.log(Number('0b1111'));
console.log(Number('0b1111').toString(2));
console.log(Number('0b1111').toString(8));
console.log(Number('0b1111').toString(16));

console.log(0o11);
console.log(Number('0o11'));
console.log(Number('0o11').toString(2));
console.log(Number('0o11').toString(8));
console.log(Number('0o12').toString(16));

console.log(0xa1);
console.log(Number('0xa1'));
console.log(Number('0xa1').toString(2));
console.log(Number('0xa1').toString(8));
console.log(Number('0xa1').toString(16));


console.log(Number.isFinite(15));
console.log(Number.isFinite(Infinity));
console.log(Number.isFinite(Number.POSITIVE_INFINITY));
console.log(Number.POSITIVE_INFINITY === Infinity);
console.log(Number.NEGATIVE_INFINITY === -Infinity);


console.log(Number.isNaN(NaN));
console.log(Number.isNaN(Number.POSITIVE_INFINITY));
console.log(Number.isNaN(Number("abc")));
console.log('true'/ 0);

const R = require('ramda');
const log = console.log;

var square = n => n * n;

var res = R.map(square, [4, 8]);

console.log(res);

var res2 = R.map(square)([4, 8]);

console.log(res2);

var add = R.curry(function(x, y) {
    return x + y;
});

console.log(add(4, 2));
console.log(add(4)(2));

var add4 = add(4);

console.log(add4);

console.log(add4(2));


// 比较运算
console.log(R.gt(2)(1));
console.log(R.gt(2, 1));
console.log(R.gt('a', 'z'));
console.log(R.gt('a')('z'));
console.log(R.gte(2)(2));
console.log(R.gte(2)(1));

log(R.lt(2)(1));
log(R.lt('a')('z'));

log(R.lte(2)(2));
log(R.lte('a')('z'));

log(R.equals(1)(1));
log(R.equals('a')('z'));
log(R.equals(1)('1'));
log(R.equals([1, 2, 3])([1, 2, 3]));
log(R.equals([1, 2, 3])([1, 2, '3']));

var a= {};
a.v = a;
var b = {};
b.v = b;
log(R.equals(a)(b));

log(R.eqBy(Math.abs, 5)(-5));

log(R.add(7)(9));
log(R.subtract(10)(8));
log(R.multiply(5)(10));
log(R.divide(10)(3));


var gt10 = x => x > 10;
var even = x => x % 2 === 0;
var f = R.either(gt10, even);
log(f(101));
log(f(8));

var b = R.both(gt10, even);
log(b(101));
log(b(102));
log(b(8));

var isEvenAndGt10 = R.allPass([gt10, even]);
log(isEvenAndGt10(102));
log(isEvenAndGt10(15));
log(isEvenAndGt10(30));

log(R.split(',')('a, b, c, def, e'));

log(R.test(/^xyz$/)('xyabcz'));
log(R.test(/^xyz$/)('xyz'));
log(R.test(/^xyz$/)('xy'));
log(R.test(/^xyz$/)('xyza'));

log(R.test(/y/gi)('abcXYzya'));
log(R.match(/xy/gi)('abcXyzabbyxYccxydd'));

var reg = R.test(/^xyz/g);

log(reg('xyzabc'));
log(reg('xyzabc'));

var reg2 = /xyz/g;

// 正则表达式使用g来test的小问题，见regexp.demo.js
log(reg2.test('xyzabc'));
log(reg2.test('xyzabc'));

var addOne = x => x + 1;
var square = x => x * x;

var addOneAndSquare = R.pipe(addOne, square);

log(addOneAndSquare(2));


var prop = (p, obj) => obj[p];
var propRole = R.curry(prop)('role');

var isWorker = s => s === 'worker';
var getWorkers = R.filter(R.pipe(propRole, isWorker));

var data = [
    {name: '张三', role: 'worker'},
    {name: '李四', role: 'worker'},
    {name: '李四', role: 'manager'}
]
log(getWorkers(data));

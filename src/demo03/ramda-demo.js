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



// 函数的合成

var myCompose = R.compose(Math.abs, R.add(1), R.multiply(2));
log(myCompose(-4));

var negative = x => -1 * x;
var increaseOne = x => x + 1;

var myPipe = R.pipe(Math.pow, negative, increaseOne);
log(myPipe(3, 4));
var myPipeCurry = R.curry(myPipe);
log(myPipeCurry(3)(4));

var sumOfArr = arr => {
    var sum = 0;
    arr.forEach( i => sum += i);
    return sum;
}

var lengthOfArr = arr => arr.length;

var average = R.converge(R.divide, [sumOfArr, lengthOfArr]);

log(average([1, 2, 3, 4, 5, 6, 7]));
log(sumOfArr([1, 2, 3, 4, 5, 6, 7]));

// sumOfArr2的写法以下两种是一致的
//var sumOfArr2 = R.partial(R.reduce(R.add), [0]);
var sumOfArr2 = R.reduce(R.add, 0);
var average2 = R.converge(R.divide, [sumOfArr2, lengthOfArr]);
log(sumOfArr2([1, 2, 3, 4, 5, 6, 7]));
log(average2([1, 2, 3, 4, 5, 6, 7]));


var toUpperCase = s => s.toUpperCase();
var toLowerCase = s => s.toLowerCase();
var strangeConcat = R.converge(R.concat, [toUpperCase, toLowerCase]);
log(strangeConcat('Yodel'));


var decreaseOne = x => x - 1;
var increaseOne = x => x + 1;
var useWith1 = R.useWith(Math.pow, [decreaseOne, increaseOne]);
log(useWith1(3)(4));
log(useWith1(3, 4));
var useWith2 = R.useWith(Math.pow, [increaseOne, decreaseOne]);
log(useWith2(3)(4));
log(useWith2(3, 4));

var gt10 = x => x > 10;
var lte10 = R.complement(gt10);
log(gt10(7));
log(lte10(7));

var takesThressArgs = function(a, b, c) {
    return [a, b, c];
};

var takesTwoArgs = R.binary(takesThressArgs);
log(takesTwoArgs(1, 2, 3));

var sayX = x => log('x is ' + x);
log(R.tap(sayX)(100));

var ss = R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))
log(ss({a : 1}))


var f = (x, y) => {
    return x + y;
};

log(R.zipWith(f, [1, 2, 3], ['a', 'b', 'c']));

var nums = [1, 2, 3, -99, 42, 6, 7];
log(R.apply(Math.max)(nums));
log(R.apply(Math.min)(nums));
log(R.apply(Math.abs)(nums));


log(R.contains(4)([1, 2, 3, 4]));
log(R.contains(4)([1, 2, 3, 5]));
log(R.contains([42])([[42]]));
log(R.contains({ name: 'Fred'})([{ name: 'Fred'}]));


var equals3 = R.equals(3);
log(R.all(equals3)([3, 3, 3, 3]));
log(R.all(equals3)([3, 3, 1, 3]));

var lessThan0 = R.flip(R.lt)(0);
var lessThan2 = R.flip(R.lt)(2);
log(R.any(lessThan0)([1, 2]));
log(R.any(lessThan2)([1, 2]));


var isEven = n => n % 2 === 0;
var isOdd = R.complement(isEven);

log(R.none(isEven)([1, 3, 5, 7, 9, 11]));
log(R.none(isEven)([1, 3, 5, 7, 8, 11]));


log(R.head(['fi', 'fo', 'fum']));
log(R.head([]));
log(R.head('abc'));
log(R.head(''));

log(R.last(['fi', 'fo', 'fum']));
log(R.last([]));
log(R.last('abc'));
log(R.last(''));

log(R.tail(['fi', 'fo', 'fum']));
log(R.tail([1, 2]));
log(R.tail('abc'));
log(R.tail(''));

log(R.init(['fi', 'fo', 'fum']));
log(R.init([1, 2]));
log(R.init('abc'));
log(R.init(''));


var list = ['foo', 'bar', 'baz', 'quux'];
log(R.nth(1)(list));
log(R.nth(-1)(list));
log(R.nth(-99)(list));
log(R.nth(2)('abc'));
log(R.nth(3)('abc'));

log(R.take(1)(list));
log(R.take(2)(list));
log(R.take(3)(list));
log(R.take(4)(list));
log(R.take(3)('ramda'));

log(R.takeLast(1)(list));
log(R.takeLast(2)(list));
log(R.takeLast(3)(list));
log(R.takeLast(4)(list));
log(R.takeLast(3)('ramda'));

var list2 = ['a', 'b', 'c', 'd', 'e'];
log(R.slice(1, 3)(list2));
log(R.slice(1, Infinity)(list2));
log(R.slice(0, -1)(list2));
log(R.slice(-3, -1)(list2));
log(R.slice(0, 3)('ramda'));

log(R.remove(1, 2)(list2));
log(list2);
log(R.insert(2, 'x')(list2));
log(R.insertAll(2, [1, 2, 3])(list2));


log(R.prepend(['fee', 'abc'])(list2));
log(R.prepend('fee')(list2));

log(R.append('test')(list2));
log(R.append(['test1'])(list2));

log(R.intersperse('n')(list2));

log(R.join(',')(list2));
log(R.join('!')(list2));
log(R.join(['1', '2'])(list2));

var list3 = [1, 2, 3, 4, 5, 6, 7];

log(R.filter(isEven)(list3));
log(R.reject(isOdd)(list3));
log(R.filter(isOdd)(list3));

var isNotFour = x => x !== 4;
log(R.takeWhile(isNotFour)(list3));

var lteTwo = x => x <= 2;
log(R.dropWhile(lteTwo)(list3));

log(R.without([3, 5])(list3));


var numbers = [1.0, 1.1, 1.2, 2.0, 3.0, 2.2];
log(R.countBy(Math.floor)(numbers));

var letters = ['a', 'b', 'A', 'a', 'B', 'c'];
log(R.countBy(R.toLower)(letters));

log(R.splitAt(1)(numbers));
log(R.splitAt(2)('hello, world'));
log(R.splitAt(-1)('foobar'));

log(R.splitEvery(3)(numbers));
log(R.splitEvery(3)('foobarbazxy'));

log(R.splitWhen(R.equals(2))(numbers));

log(R.aperture(3)(numbers));

log(R.partition(R.contains('s'))(['sss', 'ttt', 'foo', 'bars']));

log(R.indexOf(3)(numbers));
log(R.indexOf(10)(numbers));

log(R.lastIndexOf(3)([1, 2, 3, 4, 5, 3, 5, 6, 1, 3, 2]));
log(R.lastIndexOf(10)([1,2,3,4]));

var double = x => x * 2;
log(R.map(double)(numbers));

var mapIndexed = R.addIndex(R.map);

var logMap = (val, idx) => {
    log(idx, val);
}

mapIndexed(logMap)(numbers);

var printXPlusFive = x => {
    log(x + 5);
}
log(R.forEach(printXPlusFive)(numbers));


var mySubtract = (a, b) => {
    log(a, b);
    return a - b;
}
log(R.reduce(mySubtract)(0)(numbers));

// rediceRight的用法需要注意
log(R.reduceRight(mySubtract)(0)(numbers));


// map方法的callback函数， 参数（item, index, array），item当前项，index索引，array元数组
log(['11','11','11','11'].map(parseInt));
// parseInt函数参数可变，因此上述代码的执行结果是
// [ 11, NaN, 3, 4]，原因parseInt(str,radix)，radis表示转换的进制基数，在2~36之间
// 缺省是0，则使用10进制，其余非2~36之间的，一律返回NaN。可参看如下结果
['11','11','11','11'].map(log);
// 11 0 [ '11', '11', '11', '11' ]
// 11 1 [ '11', '11', '11', '11' ]
// 11 2 [ '11', '11', '11', '11' ]
// 11 3 [ '11', '11', '11', '11' ]
// 对于parseInt，接收了前两个参数
// parseInt('11', 0) => 11   //10进制
// parseInt('11', 1) => NaN
// parseInt('11', 2) => 3    //二进制
// parseInt('11', 3) => 4    //三进制

// 因此，使用Array的map方法时要慎重
var isOdd2 = (acc, x) => x % 2 === 1;
var xs = [1, 3, 5, 60, 777, 800];
log(R.reduce(R.add, 0)(xs));
log(R.reduceWhile(isOdd2, R.add, 0)(xs));
log(R.map(isOdd)(xs));

var ys = [2, 4, 6];
log(R.reduceWhile(isOdd2, R.add, 111)(ys));

var diff = (a, b) => {
    return a - b;
};

var list3 = [4, 2, 6, 5, 7, 3];
log(R.sort(diff)(list3));

var alice = {
    name: 'alice',
    age: 40
};
var bob = {
    name: 'bob',
    age: 30
};
var clara = {
    name: 'clara',
    age: 40
}
var people = [clara, bob, alice];
var ageNameSort = R.sortWith([
    R.descend(R.prop('age')),
    R.ascend(R.prop('name'))
])
log(ageNameSort(people));

var list4 = [1, 2, 3, 4, 5];
log(R.adjust(R.add(10), 1)(list4));
log(R.adjust(R.add(10), 2)(list4));
log(list4);

log(R.ap([R.multiply(2), R.add(3)])(list4));

log(R.ap([R.concat('tasty '), R.toUpper])(['pizza', 'salad']));

log(R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12], 5, 2]]]));

log(R.groupWith(R.equals)([0, 1, 1, 2, 2, 3, 4, 5, 7, 7, 13, 8, 21]));

var equalsE = (val) => {
    return val < 5 ? 'A' :
        val < 10 ? 'B' : 'C';
}
log(R.groupBy(equalsE)([0, 1, 1, 2, 2, 3, 4, 5, 7, 7, 13, 8, 21]));


// 双数组运算
log(R.concat('ABC')('DEF'));
log(R.concat(list)(list4));
log(R.concat([])([]));

log(R.zip(list)(list4));
log(R.zipObj(list)(list4));

log(R.xprod(list)(list4));
log(list, list2, list3, list4);
log(R.intersection(list3, list4));


var buffaloSpringfield = [
    {id: 456, name: 'Stephen Stills 1'},
    {id: 824, name: 'Richie Furay'},
    {id: 956, name: 'Dewey Martin'},
    {id: 313, name: 'Bruce Palmer'},
    {id: 177, name: 'Neil Young'}
];

var csny = [
    {id: 204, name: 'David Crosby'},
    {id: 456, name: 'Stephen Stills 3'},
    {id: 539, name: 'Graham Nash'},
    {id: 177, name: 'Neil Young'}
];

// 这个问题有意思，无论buffaloSpringfield和csny谁在前，结果都是
// [ { id: 456, name: 'Stephen Stills 3' }, { id: 177, name: 'Neil Young' } ]

log(R.intersectionWith(R.eqBy(R.prop('id')), buffaloSpringfield)(csny));

var list5 = [1, 2, 3, 4, 5];
var list6 = [7, 6, 5, 4, 3];
log(R.difference(list5)(list6));
log(R.difference(list6)(list5));
log(R.difference(buffaloSpringfield)(csny));

var cmp = (x, y) => x.a === y.a;
var l1 = [{a: 1}, {a: 2}, {a: 3}];
var l2 = [{a: 3}, {a: 4}];
log(R.differenceWith(cmp, l1)(l2));

log(R.symmetricDifference(list5)(list6));
log(R.symmetricDifference(list6)(list5));

var eqA = R.eqBy(R.prop('a'));
var l3 = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
var l4 = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
log(R.symmetricDifferenceWith(eqA, l3, l4));

log(R.find(R.propEq('a', 2))(l3));
log(R.find(R.propEq('a', 5))(l4));
log(R.find(R.propEq('a', 7))(l4));

log(R.findIndex(R.propEq('a', 2))(l3));
log(R.findIndex(R.propEq('a', 5))(l4));
log(R.findIndex(R.propEq('a', 7))(l4));



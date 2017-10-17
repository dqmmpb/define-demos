/**
 * Created by alphabeta on 17-8-8.
 */


class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    valueOf() {
        return this.x + this.y;
    }
    // valueOf和toString同时存在，优先调用valueOf
    toString() {
        return '(' + this.x + ',' + this.y + ')';
    }
}

function* numbers() {
    console.log('function start.');

    var v1 = yield new Point(1, 2);
    console.log('v1 = ' + v1);

    var v2 = yield 1;
    console.log('v2 = ' + v2);

    return 5;
}

var nums = numbers();

console.log(nums.next(2));

console.log(nums.next(new Point(3, 4)));

console.log(nums.next(4));

console.log(new Point(5, 6)); //=> { [Number: 11] x: 5, y: 6 }
// 输出上述的Number:11
console.log(new Point(5, 6).toString()); //=> (5,6)
// 主动调用，输出(5,6)
console.log('toString() = ' + new Point(7, 8)); //=> toString() = 15
// 隐式类型转换 有限调用valueOf

function* objectEntries(obj) {
    let propKeys = Reflect.ownKeys(obj);

    for(let propKey of propKeys) {
        yield [propKey, obj[propKey]];
    }
}

let jane = { first: 'Jane', last: 'Doe'};


for(let [key, value] of objectEntries(jane)) {
    console.log(`${key}: ${value}`);
}

function* objectEntries2() {
    let propKeys = Object.keys(this);

    for(let propKey of propKeys) {
        yield [propKey, this[propKey]];
    }
}

let jame = { first: 'Jame', last: 'Doe' };

jame[Symbol.iterator] = objectEntries2;

for(let [key, value] of jame) {
    console.log(`${key}: ${value}`);
}
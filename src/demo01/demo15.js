'use strict';

// 数组的扩展
const log = console.log;
const l = log;

l(...[1, 2, 3]);
l(1, 2, ...[3, 4, 5], 6);
l(Math.max(...[14, 3, 77]));


let str = 'x\uD83D\uDE80y';
l(str);
l(str.split('').reverse().join(''));
// 'y\uDE80\uD83Dx'
l([...str].reverse().join(''));
// 'y\uD83D\uDE80x'

l(Array.from('hello'));

l(Array.from(new Set(['a', 'b'])));

l(Array.of());
l(Array.of(3, 11, 8));
l(Array.of(3));
l(Array.of(3).length);
l(new Array());
l(new Array(3, 11, 8));
l(new Array(3));
l(new Array(3).length);

function ArrayOf(){
  return Array.prototype.slice.call(arguments);
}

l(ArrayOf(3));
l([1,2,3,4,5].copyWithin(0, 3));
l([1,2,3,4,5].copyWithin(0, 2, 3));
l([1,4,-5,10].find(n => n < 0));
l([1,5,10,15].find((value, index, arr) => {
  return value > 9;
}));
l([1,5,10,15].findIndex((value, index, arr) => {
  return value > 9;
}));
l(['a', 'b', 'c'].fill(7));
l(new Array(3).fill(7));
l(['a', 'b', 'c'].fill(7, 1, 2));
for(let index of ['a', 'b'].keys()) {
  l(index);
}

// for(let elem of ['a', 'b'].values()) {
//   l(elem);
// }

for(let [index, elem] of ['a', 'b'].entries()) {
  l(index, elem);
}

l([1, 2, 3].includes(2));
l([1, 2, 3].includes(4));
l([1, 2, NaN].includes(NaN));

l([1, 2, 3].includes(3, 3));
l([1, 2, 3].includes(3, -1));

l([NaN].indexOf(NaN));
l([NaN].includes(NaN));

l(0 in [undefined, undefined, undefined]);
l(0 in [,,]);


// forEach方法
[,'a'].forEach((x,i) => console.log(i)); // 1

// filter方法
l(['a',,'b'].filter(x => true)); // ['a','b']

// every方法
l([,'a'].every(x => x==='a')); // true

// reduce方法
l([1,,2].reduce((x,y) => x+y)); // 3

// some方法
l([,'a'].some(x => x !== 'a')); // false

// map方法
l([,'a'].map(x => 1)); // [,1]

// join方法
l([,'a',undefined,null].join('#')); // "#a##"

// toString方法
l([,'a',undefined,null].toString()); // ",a,,"

l(Array.from(['a',,'b']));

const obj = {
  _wheels: 4,
  toString() {
    return this._wheels;
  }
};

l(obj);
l(obj.toString());

const foo = 'bar';
const bar = 'abc';
const baz = {[[foo]]: '123'};
l(baz);

const keyA = {a: 1};
const keyB = {b: 2};

const myObj = {
  [keyA]: 'valueA',
  [keyB]: 'valueB',
};
l(myObj);


const key1 = Symbol('description');
const key2 = Symbol();
const myObj2 = {
  [key1]() {},
  [key2]() {},
};
l(myObj2[key1].name);
l(myObj2[key2].name);


l(Object.is('foo', 'foo'));
l(Object.is({}, {}));
l(+0 === -0);
l(NaN === NaN);
// 在node和chrome Object.is(+0, -0)的行为不一样，node中为true；chrome为false
l(Object.is(+0, -0));
l(Object.is(NaN, NaN));

const obj3 = { foo: 123 };
l(Object.getOwnPropertyDescriptor(obj3, 'foo'));


class MyClass {
  [Symbol.hasInstance](foo) {
    return foo instanceof Array;
  }
}

l([1,2,3] instanceof new MyClass());


console.log('-------------华丽的分割线-------------');

class Even {
  static [Symbol.hasInstance](obj) {
    return Number(obj) % 2 === 0;
  }
}

l(1 instanceof Even);
l(2 instanceof Even);
l(12345 instanceof Even);
l(12345678910111213141516 instanceof Even);


console.log('-------------华丽的分割线-------------');

let arr1 = ['c', 'd'];
l(['a', 'b'].concat(arr1, 'e'));
l(arr1[Symbol.isConcatSpreadable]);
let arr2 = ['c','d'];
arr2[Symbol.isConcatSpreadable] = false;
l(['a', 'b'].concat(arr2, 'e'));

let obj1 = {length: 2, 0: 'c', 1:'d'};
l(obj1);
l(['a', 'b'].concat(obj1, 'e'));

let obj2 = {length: 2, 0: 'c', 1:'d'};
obj2[Symbol.isConcatSpreadable] = true;
l(obj2);
l(['a', 'b'].concat(obj2, 'e'));


console.log('-------------华丽的分割线-------------');


class MyArray extends Array {

}

const myArr1 = MyArray.of(1, 2, 3);
const myArr2 = myArr1.map(x => x);
const myArr3 = myArr1.filter(x => x > 1);
l(myArr1);
l(myArr2 instanceof MyArray);
l(myArr3 instanceof MyArray);
l(myArr3 instanceof Array);

// Symbol.species
// Symbol.species属性，创建衍生对象时就会使用这个属性返回的函数，作为构造函数
console.log('-------------华丽的分割线-------------');

class MyArray2 extends Array {
  static get [Symbol.species]() { return Array; }
}

const myArr21 = MyArray2.of(1, 2, 3);
const myArr22 = myArr21.map(x => x);
const myArr23 = myArr21.filter(x => x > 1);
l(myArr21);
l(myArr22 instanceof MyArray2);
l(myArr23 instanceof MyArray2);
l(myArr22 instanceof Array);

console.log('-------------华丽的分割线-------------');

let sobj = {
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'number':
        return 123;
      case 'string':
        return 'str';
      case 'default':
        return 'default';
      default:
        throw new Error();
    }
  }
};

l(2 * sobj); // 246
l(3 + sobj); // '3default'
l(sobj == 'default'); // true
l(String(sobj)); // 'str'
l(sobj);

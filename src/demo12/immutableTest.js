'use strict';

const {List, Map, fromJS} = require('immutable');
const assert = require('assert');

const map1 = Map({a: 1, b: 2, c: 3});
const map2 = map1.set('b', 50);
``

console.log(`${map1.get('b')} vs. ${map2.get('b')}`);


const list1 = List([1, 2]);
const list2 = list1.push(3, 4, 5);
const list3 = list2.unshift(0);
const list4 = list1.concat(list2, list3);

assert.equal(list1.size, 2);
assert.equal(list2.size, 5);
assert.equal(list3.size, 6);
assert.equal(list4.size, 13);
assert.equal(list4.get(0), 1);
console.log(list1);
console.log(list2);
console.log(list3);
console.log(list4);


const map3 = Map({a: 1, b: 2, c: 3, d: 4});
const map4 = Map({a: 20, c: 10, t: 30});
const obj = {d: 100, o: 200, g: 300};
const map5 = map3.merge(map4, obj);

console.log(map5);


const obj1 = {1: 'One'};
console.log(Object.keys(obj1));
assert.equal(obj1['1'], obj1[1]);

const map6 = fromJS(obj1);
assert.notEqual(map6.get('1'), map6.get(1));

console.log(map3.toJS());

const mapped = list1.map(x => x * x);

console.log(mapped);

const aList = List([1, 2, 3]);

'use strict';

// Set和Map

const log = console.log;
const l = log;

l(new Set([1, 2, 3, 4, 5, 6]));
l(new Set([1, 1, 2, 3, 5, 3]), new Set([1, 1, 2, 3, 5, 3]).size);
l([...new Set([1, 1, 2, 3, 5, 3])]);


const s = new Set();
s.add(1).add(1).add(2).add(3).add(5).add(3);
l(s, s.size);
l(s.has(1), s.has(2), s.has(4));
s.delete(2);
l(s.has(2));

// 扩展运算符（...）内部使用for...of循环
// 使用的就是values
for(let item of s) {
  l(item);
}

for(let item of s.keys()) {
  l(item);
}

for(let item of s.values()) {
  l(item);
}

for(let item of s.entries()) {
  l(item);
}

s.forEach((value, key) => {
  l(value, key);
});


// 实现并集（Union）、交集（Intersect）和差集（Difference）
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}

l(union);
l(intersect);
l(difference);


// Map
const m = new Map();
const o = {p: 'Hello World'};
m.set(o, 'content');
l(m);
l(m.get(o));
l(m.has(o));
l(m.delete(o));
l(m.has(o));


const map = new Map([
  ['name', '张三'],
  ['title', 'Author'],
]);

l(map.size);
l(map.has('name'));
l(map.get('name'));
l(map.has('title'));

map.set(2, 'aaa');

l(map.get(2));

map.set(['a'], 555);
l(map.get(['a']));

const k1 = ['a'];
const k2 = ['a'];

map.set(k1, 111);
map.set(k2, 222);

l(map.get(k1));
l(map.get(k2));
l(map.size);

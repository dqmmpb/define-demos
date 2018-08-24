'use strict';
require('colors');

const log = (x = 1, y = 2, {x1, y1} = {x1:3, y1:4}, ...args) => {
  console.log(x);
  console.log(y);
  console.log(x1, y1);
  for(let arg of args) {
    console.log(arg);
  }
};

log(
  1,
  Infinity,
  undefined,
  3,
  [5, 6],
  Symbol('log test'),
  { x: 100, y: 200},
);

console.log('-------------华丽的分割线-------------');

const foo = ({x = 'a', y = 'b'} = {}) => {
  console.log(x, y, typeof x, typeof y);
};

foo({x: 1, y: 2});
foo({});
foo();
foo({x: 1});
foo({y: 2});
console.log(foo.length);

console.log('-------------华丽的分割线-------------');

const bar = ({x, y = 'b'} = {x: 'c', y:'d'}) => {
  console.log(x, y, typeof x, typeof y);
};

bar({x: 1, y: 2});
bar({});
bar();
bar({x: 1});
bar({y: 2});
console.log(bar.length);

console.log('-------------华丽的分割线-------------');

var x = 1;
function foo1(x, y = function() { x = 2; }) {
  x = 3;
  y();
  console.log(x);
}

foo1();
console.log(x);


function throwIfMissing() {
  throw new Error('Missing parameter');
}

function foo2(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}

console.log(foo2('must be provided'));

console.log('-------------华丽的分割线-------------');

const bar1 = function() {};
const bar2 = function baz() {};

console.log(bar1.name);
console.log(bar2.name);
console.log((new Function).name);
// bind返回的函数，name属性值会加上bound前缀。
console.log(bar2.bind({}).name);
console.log((new Function).bind({}).name);
console.log((function(){}).bind({}).name);
console.log('color red, underline, bg green'.red.underline.bgGreen);
console.log('log'.blue);

console.log('-------------华丽的分割线-------------');



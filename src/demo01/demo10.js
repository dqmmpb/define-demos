'use strict';

const colors = require('colors');

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});


const obj = {
  abc: 1,
};
console.dir(obj);

console.dir(console);

console.log('log default');
console.log('blue underline bgGreen'.blue.underline.bgGreen);
console.info('OMG Rainbows!'.rainbow);
console.log('Run the trap'.trap);
console.log('Run the random'.random);
console.log('Run the zebra'.zebra);
console.log('Run the america'.america);
console.log('Run the inverse'.inverse);
console.log (('foo'.cyan + 'bar').red);


console.log('-------------华丽的分割线-------------');
console.group('--- console.group ---'.red);

console.group("第一组信息");
console.log('第一组第一条');
console.log('第一组第二条');
console.groupEnd();
console.group("第二组信息");
console.log('第二组第一条');
console.log('第二组第二条');
console.groupEnd();

console.groupEnd();

console.log('-------------华丽的分割线-------------');
console.group('--- console.trace ---'.red);
function add(a, b) {
  console.trace();
  return a + b;
}

function add3(a,b){return add2(a,b);}
function add2(a,b){return add1(a,b);}
function add1(a,b){return add(a,b);}

add3(1,1);

console.groupEnd();


console.log('-------------华丽的分割线-------------');
console.time('计时器一');
for(let i = 0; i < 1000; i++) {
  for(let j = 0; j < 1000; j++) {

  }
}
console.timeEnd('计时器一');


console.assert(1 === 2, '1 === 2, 不相等');

console.log('-------------华丽的分割线-------------');

function Foo() {
  for (let i = 0; i < 10; i++) {
    funcA(1000);
  }
  funcB(10000);
}

function funcA(count) {
  console.count('funcA 被执行的次数：');
  for (let i = 0; i < count; i++) {
  }
}

function funcB(count) {
  for (let i = 0; i < count; i++) {
  }
}

// chrome 开启 dev tools
// chrome://inspect
// node --inspect-brk src/demo01/demo10.js
// 进入调试模式
// 在Profiler中能够查看性能分析
console.profile('性能分析器一');
Foo();
console.profileEnd();

console.log('-------------华丽的分割线-------------');

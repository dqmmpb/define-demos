'use strict';

// 引自 https://github.com/chokcoco/cnblogsArticle/issues/15
// 最近群里有人发了下面这题：
// 实现一个函数，运算结果可以满足如下预期结果：

// add(1)(2) // 3
// add(1, 2, 3)(10) // 16
// add(1)(2)(3)(4)(5) // 15

// by alphabeta
// 上述问题分析后就会发现，其实就是希望实现类似`函数式编程`的范式
// 对于`函数式编程`可以参看
// https://ramdajs.com/
// http://www.ruanyifeng.com/blog/2012/04/functional_programming.html

// // 但如下代码有个问题，就是node和chrome中console.log的输出是不一样的
// const add = (...args) => {
//   const fn = (...argv) => {
//     return add(...args, ...argv);
//   };
//   fn.valueOf = () => {
//     return args.reduce((a, b) => a + b, 0);
//   };
//   return fn;
// };
//
// console.log(add(1)(2));
// // node中 { [Function: fn] valueOf: [Function] }
// // chrome中 ƒ 3
// // 因此客观来讲，valueOf方法没有实质意义。更合理的调用方式应该是
// // console.log(add(1)(2).valueOf()); 或者 console.log('' + add(1)(2));
// // 直接调用或触发隐式类型转换

// 一种处理方式就是修改console.log的默认行为，但这样还是不好，无法处理类似add(1)(2)+1这种情况的输出
const add = (...args) => {
  if(args.length > 0) {
    const addInner = (...argv) => {
      if(argv.length > 0) {
        return add(...args, ...argv);
      } else {
        return args.reduce((a, b) => a + b, 0);
      }
    };
    return addInner;
  } else {
    return 0;
  }
};

const consoleLog = console.log;
console.log = (...args) => {
  args = args.map((arg) => {
    if (typeof arg === 'function' && (arg.name === 'add' || arg.name === 'addInner')) {
      return arg();
    } else {
      return arg;
    }
  });
  return consoleLog(...args);
};

console.log(add);
console.log(add(1)(2));
console.log(add(1, 2, 3)(10));
console.log(add(1)(2)(3)(4)(5));

// 于是问题出来了，能否根据表达式判断出当前函数调用是否是最后一步
// 例如add(1)(2)，如何判断addInner(2)的这次调用是链式中的最后一个？
// 至少现在还没有想法


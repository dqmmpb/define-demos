'use strict';

// function timeout(ms) {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, ms, 'done');
//     throw new Error('so sad!');
//   });
// }
//
// timeout(100).then((value) => {
//   console.log(value);
// }, (error) => {
//   console.log(error);
// });


// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => reject(new Error('fail')), 3000);
// });
//
// p1.then(value => {
//   console.log(value);
//   return 'p1 done';
// }).catch(error => {
//   console.log(error);
//   return 'p1 error';
// }).then(value => {
//   console.log(value);
// }).finally(() => {
//   console.log(`finally`);
// });

// 这里也需要注意setTimeout和promise的resolve的执行顺序
setTimeout((value) => {
  console.log(`timeout ${value}`);
}, 0, 0);

const promises = [2, 3, 5, 7, 11, 13].map(id => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(id + 4);
    }, Math.ceil(Math.random() * 8000))
  });
  // return id + 4;
});

console.log('start');
console.log(promises);
// 注意Promise.all的then执行，是发生在本轮事件结束的时候触发的
Promise.all(promises).then(value => {
  console.log(value);
});

console.log('end');

// 总结： 上述代码中setTimeout和promise的resolve以及最外的事件的执行顺序是很有意思的
// 第一轮事件： 最外层
// 第二轮事件： setTimeout引起的
// Promise.all的resolve发生在第一轮`事件循环`结束时触发，而不是在下一轮（第二轮`事件循环`）开始时
// 在使用promise是要注意这一点。所有的resolve都是发生所在`事件循环`结束时才触发
// 请看如下的例子:

// 不起作用的分割线 注意到 所有的promise和timeout都没有在分割线之前出现
console.log('-----------------不起作用的分割线------------------');

// 如果有多个timeout呢？到底有几轮事件循环呢？ 这是一个很有一意思的问题
// tag: a
setTimeout(() => {
  console.log('level 2 start');
  Promise.resolve('level 2 end').then(value => {
    console.log(value);
  });
  console.log('level 2 middle')
}, 3000);
// tag: b
setTimeout(() => {
  console.log('level 2or3 ? start');
  Promise.resolve('level 2or3 ? end').then(value => {
    console.log(value);
  });
  console.log('level 2or3 ? middle')
}, 2999);
// 如果 a和b 的timeout相同，例如都为0，或者都为3000，那么这两个timeout被视作在同一个事件循环中
// 因此 你会看到
//> level 2 start
//> level 2 middle
//> level 2or3 ? start
//> level 2or3 ? middle
//> level 2 end
//> level 2or3 ? end
// 这样的输出结果 level 2和level 2or3被视为同一个`事件循环`，
// 也就是 start和middle会出现在end前，而且是出现在level 2和level 2or3的所有end前

// 如果 a和b 的timeout不同，a为3000，b为2999，则两个timeout被视作不同的事件循环
// 输出如下:
//> level 2or3 ? start
//> level 2or3 ? middle
//> level 2or3 ? end
//> level 2 start
//> level 2 middle
//> level 2 end

Promise.resolve('level 1 end').then(value => {
  console.log(value);
});

console.log('level 1 start');

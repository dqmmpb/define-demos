'use strict';
/**
 题目： 抽奖
 描述： 问题是这样的，能否在有限时间和空间内完成从N个数的重新排列，即对[1...n]个数进行随机排列，并保证每个数出现任意位置上的概率相同
 抽象： 问题还能进一步抽象，能否在有限时间和空间内完成从N个数中随机抽取M个数，并保证每个数被抽中（出现在前M个位置上）的概率相同
 **/
const testRandom = [5, 3, 3, 1, 2, 1];
// result = [ 5, 2, 6, 1, 4, 3 ];

/**
 * @deprecated js支持不好，node的v8也已经不支持尾递归的优化 https://node.green/，会导致RangeError: Maximum call stack size exceeded
 *
 * 计算选取的位置在总数(N)范围内的位置
 * 说明： indexOf方法需要解决的是，采用倒推的方式计算p所在的值域为[1,N]时的索引
 * 例如： 从[1, 2, 3, 4, 5, 6]中按照random = [5, 3, 3, 1, 2, 1]来计算位置的步骤如下
 * a1 => [1, 2, 3, 4, 5, 6]
 * a2 =>              5 [6, 1, 2, 3, 4]
 * a3 =>                       2 [3, 4, 6, 1]
 * a4 =>                                6 [1, 3, 4]
 * a5 =>                                   1 [3, 4]
 * a6 =>                                         4 [3]
 * a7 =>                                            3 []
 * 根据random中的选中位置，计算在值域[1,N]中的位置，以第2次选中的为例，过程如下
 * 0  p = random[2]; 在a2中选择是a2[p-1] => a2[random[2]-1] => a2[2]
 * 1. 调用indexOf(3, 2, 6, random);
 * 2. pre = 2-1 = 1；前1元素，判断 pre > 0
 * 3. p = p+random[pre-1] => p = 3+random[0] => p = 8
 * 4. p > (6 - pre + 1)。判断p是否超出个数N的显示，如果超出，则
 * 5. p -= (6 - pre + 1) => p = 2。即在a1中选择的是a1[p-1] => a1[1] => 2
 *
 *
 * 复杂度分析：
 * indexOf递归的调用次数取决于n，（即，已选中的个数）；每次递归调用执行2次比较和3次赋值操作。
 * 每次递归调用，n减少1,
 * 因此，indexOf的时间复杂度为 Sum(n) = 5 + Sum(n - 1)；因需要访问random，所以占用的空间为n
 * 所以，indexOf的时间复杂度为 O(n)，空间复杂度为O(n)
 * @param p 当前剩余个数中的位置
 * @param n 当前个数
 * @param N 总个数
 * @param random
 * @returns {*}
 */
function __indexOf(p, n, N, random) {
  if(n <= 1) {
    return p;
  }
  const pre = n - 1;
  p += random[pre - 1];
  if(p > (N - pre + 1)) {
    p -=  (N - pre + 1);
  }
  // 使用尾递归
  return __indexOf(p, pre, N, random);
}


/**
 * 注： 使用循环调用，防止 RangeError: Maximum call stack size exceeded
 *
 * 计算选取的位置在总数(N)范围内的位置
 * 说明： indexOf方法需要解决的是，采用倒推的方式计算p所在的值域为[1,N]时的索引
 * 例如： 从[1, 2, 3, 4, 5, 6]中按照random = [5, 3, 3, 1, 2, 1]来计算位置的步骤如下
 * a1 => [1, 2, 3, 4, 5, 6]
 * a2 =>              5 [6, 1, 2, 3, 4]
 * a3 =>                       2 [3, 4, 6, 1]
 * a4 =>                                6 [1, 3, 4]
 * a5 =>                                   1 [3, 4]
 * a6 =>                                         4 [3]
 * a7 =>                                            3 []
 * 根据random中的选中位置，计算在值域[1,N]中的位置，以第2次选中的为例，过程如下
 * 0  p = random[2]; 在a2中选择是a2[p-1] => a2[random[2]-1] => a2[2]
 * 1. 调用indexOf(3, 2, 6, random);
 * 2. pre = 2-1 = 1；前1元素，判断 pre > 0
 * 3. p = p+random[pre-1] => p = 3+random[0] => p = 8
 * 4. p > (6 - pre + 1)。判断p是否超出个数N的显示，如果超出，则
 * 5. p -= (6 - pre + 1) => p = 2。即在a1中选择的是a1[p-1] => a1[1] => 2
 *
 *
 * 复杂度分析：
 * indexOf的调用次数取决于n，（即，已选中的个数）；每次while调用执行2次比较和3次赋值操作。
 * 每次while调用，n减少1,
 * 因此，indexOf的时间复杂度为 Sum(n) = 5 + Sum(n - 1)；因需要访问random，所以占用的空间为n
 * 所以，indexOf的时间复杂度为 O(n)，空间复杂度为O(n)
 * @param n 当前个数
 * @param N 总个数
 * @param random
 * @returns {*}
 */
function indexOf(n, N, random) {
  let p = random[n - 1];
  while( n > 1) {
    let pre = n - 1;
    p += random[pre - 1];
    if(p > (N - pre + 1)) {
      p -=  (N - pre + 1);
    }
    n--;
  }
  return p;
}

/**
 * 随机选取一个数
 * 复杂度分析：
 * 因直接返回indexOf的结果，所以时间复杂度为 O(n)，空间复杂度为O(n)
 * @param n 当前个数
 * @param N 总个数
 * @param random
 * @returns {*}
 */
function pick(n, N, random) {
  // __indexOf递归方式调用
  // const p = random[n - 1];
  // // 计算选取的位置在总数(N)范围内的位置
  // return indexOf(p, n, N, random);
  // 计算选取的位置在总数(N)范围内的位置
  return indexOf(n, N, random);
}

/**
 * 生成M个随机位置，生成位置的规则：
 * 1.生成N中的随机位置r1，即 r1 ∈ [1,N]
 * 2.生成(N-1)中的随机位置r2，即 r2 ∈ [1,N-1]
 * 3.生成(N-2)中的随机位置r3，即 r3 ∈ [1,N-2]
 * ...以此类推
 * M.生成(N-M+1)中的随机位置rM，即 rM ∈ [1,N-M+1]
 * 总共生成了M个随机数
 * @param N
 * @param M
 */
function random(N, M) {
  if(N <= 0 || M <=0 || M > N) {
    throw new Error('N or M error');
  }
  const random = [];
  for(let i = 1; i <= M; i++) {
    // 从剩余(N - i + 1)个位置中随机选取一个位置
    random[i - 1] = Math.floor(Math.random() * (N - i + 1)) + 1;
  }
  return random;
}

/**
 * 从N个数中随机选取M个数
 *
 * 复杂度分析：
 * 调用了M次pick方法，每次pick的时间复杂度为 O(M)，空间复杂度为O(M)
 * 所以lottery方法的时间复杂度为 O(M^2)，空间复杂度为O(M)
 *
 * 从复杂度看O(M^2)并不是很好，但需要注意的是M是从N中随机选取。
 * 当N很大(N > 10000000)，M远小于N(M << N)时，本方法消耗的时间和空间只取决M
 * @param N
 * @param M
 * @returns {Array}
 */
function lottery(N, M) {
  const rand = random(N, M);
  const result = [];
  for(let i = 1; i <= M; i++) {
    result[i - 1] = pick(i, N, rand);
  }
  return result;
}

const result = lottery(100000, 100000);

console.log(result);

//
//
// function randomNum(N, Num) {
//   let min = 1;
//   let max = 1;
//   for(let i = 1; i <= Num; i++ ) {
//     const p = Math.floor(Math.random() * N) + 1;
//     min = min < p ? min : p;
//     max = max < p ? p : max;
//   }
//   console.log(min, max);
// }
//
// randomNum(10, 100000);
// function computeMaxCallStackSize() {
//   try {
//     return 1 + computeMaxCallStackSize();
//   } catch (e) {
//     // Call stack overflow
//     return 1;
//   }
// }
//
// console.log(computeMaxCallStackSize())

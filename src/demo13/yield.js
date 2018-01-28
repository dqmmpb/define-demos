function* numbers() {
  console.log('function start.');

  var v1 = yield 0;
  console.log('v1 = ' + v1);

  var v2 = yield 1;
  console.log('v2 = ' + v2);


}

var nums = numbers();

console.log(nums.next(2));
console.log(nums.next(3));
console.log(nums.next());

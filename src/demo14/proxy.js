/**
 * Created by alphabeta on 18-2-4.
 */

var obj = new Proxy({}, {
  get: function (target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: function (target, key, value, receiver) {
    console.log(`setting ${key}!`);
    return Reflect.set(target, key, value, receiver);
  }
});


// obj.count = 1;
//
// ++obj.count;

// 无法用var定义，用var定义的变量不是在global上
double = n => n * 2;
pow = n => n * n;
reverseInt = n => n.toString().split('').reverse().join("") | 0;

var pipe = (function() {
  return function (value) {
    var funcStack = [];
    var oproxy = new Proxy({}, {
      get: function(pipeObject, fnName) {
        if(fnName === 'get') {
          return funcStack.reduce(function(val, fn) {
            console.log(val, fn);
            return fn(val);
          }, value);
        }
        console.log(global[fnName]);
        funcStack.push(global[fnName]);
        return oproxy;
      }
    });
    return oproxy;
  }
})();

// console.log(global)
console.log(pipe(3).double.pow.reverseInt.get);


const target = Object.defineProperties({}, {
  foo: {
    value: 123,
    // writable: true,
    // configurable: false,
  },
});

const handler = {
  set(target, propKey, value, receiver) {
    console.log(propKey, value);
    return Reflect.set(target, propKey, value, receiver);
  },
  get(target, propKey, receiver) {
    return Reflect.get(target, propKey, receiver);
  }
};

const proxy = new Proxy(target, handler);

proxy.foo = 333;
console.log(proxy.foo);

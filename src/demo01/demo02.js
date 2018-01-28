'use strict';


console.log(undefined);
console.log(null);
console.log(Number.prototype);
console.log(Boolean.prototype);
console.log(String.prototype);
console.log(Array.prototype);
console.log(Function.prototype);
console.log(Date.prototype);
console.log(RegExp.prototype);
console.log(Object.prototype);

function MyFunc(name) {
  this.name = name;
}

Object.defineProperty(MyFunc.prototype, 'say', {
  configurable: false,
  value: function (message) {
    console.log(this.name + ': "' + message + '"');
  }
});

console.log(MyFunc.prototype);

var myFunc = new MyFunc('dqm');
var date = new Date();
myFunc.say('world');
console.log(date.getDay());

console.log(Object instanceof Function);
console.log(Function instanceof Object);
console.log(myFunc.__proto__);
console.log(myFunc.constructor);

var obj = new Object();

var func = new Function('a', 'b', 'c', 'this.a = a; this.b = b; this.c = c;');

console.log(Object.prototype.constructor.__proto__);
console.log(obj.__proto__);
console.log(func.__proto__);

console.log(func);
var bb = new func(1, 2, 3);
console.log(bb);
console.log(Object.getPrototypeOf(bb));

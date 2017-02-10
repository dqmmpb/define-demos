var a = {
  b: {
    m: function() {
      console.log(this.p);
    },
    p: 'Hello'
  }
};

var hello = a.b.m;
hello();
var hello2 = a.b.m();


var aa = [ 'a', , 'b'];
function print(i) {
  console.log(i);
}

aa.forEach(print);

Array.apply(null, aa).forEach(print);


var Vehicle = function() {
  this.price = 1000;
};

var v = new Vehicle();
console.log(v.price);
console.log(Vehicle.prototype);
console.log(v.__proto__);
console.log(v.constructor.prototype);

function _new(constructor, params) {
  var args = [].slice.call(arguments);
  var constructor = args.shift();
  var context = Object.create(constructor.prototype);
  var result = constructor.apply(context, args);

  return (typeof result === 'Object' && result !== null) ? result : context;
}

var Person = function(name, age) {
  this.name = name;
  this.age = age;
};

var p = _new(Person, '张三', 1000);

console.log(p);

/*function f() {
  console.log(new.target === f);
}

f();
new f();*/


var Obj = function(p) {
  this.p = p;
};

Obj.prototype.m = function() {
  return this.p;
};

var o = new Obj('Hello World!');

console.log(o.p);
console.log(o.m());

var ooo = o.m;

console.log(ooo());

console.log(this === global);
console.log(this === module.exports);



var o = {
  f1: function() {
    console.log(this);
    this.f3();
    var f2 = function() {
      console.log(this);
    }();
  },
  f3: function() {
    console.log(this);
  }
};

o.f1();

function Cat(name, color) {
  this.name = name;
  this.color = color;
  this.meow = function() {
    console.log('mew, mew, mew...');
  };
}

var cat1 = new Cat('damao', 'white');
console.log(cat1.name);
console.log(cat1.color);
var cat2 = new Cat('ermao', 'white');

console.log(cat1.meow === cat2.meow);

console.log(Cat.prototype);

function Animal(name) {
  this.name = name;
}

Animal.prototype.color = 'white';

var cat1 = new Animal('damao');
var cat2 = new Animal('ermao');

console.log(cat1.color === cat2.color);

Animal.prototype.color = 'black';

console.log(cat1.color, cat2.color, cat1.color === cat2.color);

var MyArray = function() {};

MyArray.prototype = new Array();
MyArray.prototype.constructor = MyArray;

var mine = new MyArray();
mine.push(1, 2, 3);

console.log(mine.length);
console.log(mine instanceof Array);

function P() {

}

var p = new P();

console.log(p.constructor);

console.log(p.constructor === P.prototype.constructor);

console.log(p.hasOwnProperty('constructor'));

console.log(p.constructor.name);

console.log(p instanceof P);

console.log(Object.getPrototypeOf({}) === Object.prototype);

function f() {}
console.log(Object.getPrototypeOf(f));
console.log(Object.getPrototypeOf(f) === Function.prototype);

var a = { x: 1};
var b = Object.setPrototypeOf({}, a);

console.log(b.x);

var A = {
  print: function() {
    console.log('hello');
  }
};

var B = Object.create(A);

console.log(B.print());
console.log(B.print === A.print);
console.log(B.__proto__);
console.log(B.constructor);


if(typeof Object.create !== 'function') {
  Object.create =function(o) {
    function F() {}
    F.prototype = o;
    return new F();
  }
}

var o1 = Object.create({});
var o2 = Object.create(Object.prototype);
var o3 = new Object();

console.log(o1);
console.log(o2);
console.log(o3);
console.log(o1.constructor);
console.log(o2.constructor);
console.log(o3.constructor);


/*
var o = Object.create(null);
console.log(o.valueOf());*/


var o = Object.create({}, {
  p1: { value: 123, enumerable: true},
  p2: { value: 'abc', enumerable: true}
});

console.log(o);

var o = Object.create({});
o.p1 = 123;
o.p2 = 'abc';

console.log(o);


var P = function() {

};

var p = new P();

var C = function(a) {
  this.name = 'C = function define';
};
C.prototype = p;
//C.prototype.constructor = C;

var c = new C();

var D = C;

var d = new D();
console.log(d.constructor);
console.log(D.prototype);
console.log(c.constructor.prototype);
console.log(c.constructor.prototype === p);
console.log(Object.getPrototypeOf(c) === p);

console.log(Object.getOwnPropertyNames(o));
console.log(Object.getOwnPropertyNames(Date));
console.log(Object.getOwnPropertyNames(C));
console.log(C.hasOwnProperty('length'));
console.log(Object.length);

function C(a, b) {
  this.name = 'function C define';
}
// 函数function C的声明被提前了，因此 这里new C()实际上使用的是var C = function(a)
var c = new C();
console.log(Object.getOwnPropertyNames(C));
console.log(c.constructor);
console.log(c.name);
// Object的length属性，实际上是function Object的length属性，表示形参的数量
// 由于函数声明的提前，导致C使用的是 var C的函数，因此C.length = 1
console.log(C.length); // 是var C = function(a)中的1，而不是function C(a,b)中的2



var A = function() {
  this.a = 'A';
};

var BB = function() {
  this.b = 'B';
};

BB.prototype = new A();
BB.prototype.constructor = BB;

var bb = new BB();

console.log(bb.hasOwnProperty('b'));
console.log(bb.hasOwnProperty('a'));
console.log(Object.getOwnPropertyNames(bb));
console.log(Object.getOwnPropertyNames(bb));
console.log(BB.prototype.hasOwnProperty('b'));


var colors = require('colors');

console.log('Hello'.green);
console.log(colors.red(' world'));
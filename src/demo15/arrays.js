/**
 * Created by alphabeta on 17-12-18.
 */

console.log([, 'a']);

// forEach方法
[, 'a'].forEach((x, i) => console.log(i));

// filter方法
console.log(['a', , 'b'].filter(x => true));

// every方法
console.log([, 'a'].every(x => x === 'a'));

// reduce方法
console.log([1, , 2].reduce((x, y) => x + y));

// some方法
console.log([, 'a'].some(x => x !== 'a'));

// map方法
console.log([, 'a'].map(x => 1));

// join方法
console.log([, 'a', undefined, null].join('#'));

// toString方法
console.log([, 'a', undefined, null].toString());


console.log([, 'a', undefined, null].map(x => x === undefined));


console.log(Array.from(['a', , 'b']));

let arr = [, ,];
for (let i of arr) {
  console.log(i, 1);
}
console.log(arr.length);
arr.map(x => console.log(x, 1));

let person = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}('张三');

person.sayName();

class Foo {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log(this.name);
  }
}

class Bar extends Foo {
  constructor(name) {
    super(name);
    this.name = 'bar+' + name;
  }

  sayHello() {
    super.sayHello();
    console.log('child');
  }
}

let foo = new Foo('parent');
let bar = new Bar('bar');
foo.sayHello();
bar.sayHello();

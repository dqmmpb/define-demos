'use strict';

const l = console.log;

const obj = new Proxy({}, {
  get(target, key, receiver) {
    console.log(`getting ${key}`);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log(`setting ${key}`);
    return Reflect.set(target, key, value, receiver);
  }
});

obj.count = 1;
l(obj.count);
l(++obj.count);


const person = {
  name: '张三',
};

const proxy = new Proxy(person, {
  get(target, key) {
    if (key in target) {
      return target[key];
    } else {
      throw new ReferenceError(`Property "${key}" does not exist`);
    }
  }
});

l(proxy.name);
try {
  l(proxy.age);
} catch(e) {
  l(e);
}

const proto = new Proxy({}, {
  get(target, key, receiver) {
    l(`Get ${key}`);
    return target[key];
  }
});

const objP = Object.create(proto);
l(objP.foo);


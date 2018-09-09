'use strict';

const apiHello = function *(){
  yield 'send';
  yield 'response1';
  yield 'response2';
  yield 'response3';
  yield 'response4';
  return 'hello world';
};

const run = function(fn) {
  const gen = fn();

  return new Promise((resolve, reject) => {
    function next(err, data) {
      try {
        const result = gen.next(data);
        console.log(result);
        if (result.done) {
          return resolve(result.value);
        } else {
          next(err, data);
        }
      } catch(e) {
        return reject(e);
      }
    }
    next();
  });
};

run(apiHello).then(data => {
  console.log(data);
}).catch(e => {
  console.log(e);
});

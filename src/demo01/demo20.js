'use strict';

const apiHello = async function (){
  await 'send';
  await 'response1';
  await new Promise((resolve, reject) => {
    try {
      console.log('response2 start');
      setTimeout(() => {
        resolve('response2');
      }, 3000);
    } catch(e) {
      reject(e);
    }

  });
  await 'response3';
  await 'response4';
  return await 'hello world';
};

const run = function(fn) {
  return fn();
};

run(apiHello).then(data => {
  console.log(data);
}).catch(e => {
  console.log(e);
});

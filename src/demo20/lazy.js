let x = 99;

function foo(p = x + 1) {
  console.log(p, x);
}

foo();

x = 100;

foo();


function foo2({x, y = 5} = {}) {
  console.log(x, y);
}

foo2({});

foo2({x: 1});

foo2({x: 1, y: 3});

foo2();

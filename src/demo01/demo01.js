'use strict';

function add(x, y) {
  return x + y;
}

function multiply(x, y) {
  return x * y;
}

var x = 2, y = 5;

//console.log(x + ' + ' + y + ' = ' + add(x, y));
//console.log(x + ' * ' + y + ' = ' + multiply(x, y));

var start = 1, end = 9, prefix = '', subffix = ' ';

var colwidth = [];
var results = [];
for(var i = start; i <= end; i++) {
  var res = [];
  for(var j = 1; j <= i; j++) {
    var str = j + '*' + i + '=' + multiply(j, i);
    res.push(str);
    colwidth[j-1] = colwidth[j-1] && colwidth[j-1] > str.length ? colwidth[j-1] : str.length;
  }
  results.push(res);
}

function _prefix(str, fill, prefix) {
  prefix = prefix || ' ';
  var len = ('' + str).length;
  return (Array(fill > len ? fill - len + 1 || 0 : 0).join(prefix)) + str;
}

function _suffix(str, fill, suffix) {
  suffix = suffix || ' ';
  var len = ('' + str).length;
  return str + (Array(fill > len ? fill - len + 1 || 0 : 0).join(suffix));
}

console.time('test');

for(var i = 0; i < results.length; i++) {
  var res = results[i];
  var line = res.reduce(function(a, b, index) {
    return a + (a ? ' ': '') + _suffix(b, colwidth[index], subffix);
  }, '');
  console.log(line);
}
console.timeEnd('test');

/*
console.assert(true, 'does nothing');

try {
  console.assert(false, 'Whoops %s', 'didn\'t work');
} catch(err) {
  console.error(err.stack);
}*/

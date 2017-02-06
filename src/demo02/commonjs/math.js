var add = function(x, y) {
  return x + y;
};

var subtract = function(x, y) {
  return x - y;
};

var multiply = function(x, y) {
  return x * y;
};

var divide = function(x, y) {
  return x / y;
};

var abs = function(x) {
  try {
    var num = Number(x);
    return num >= 0 ? num : -num;
  } catch (err) {
    return x;
  }
};


module.exports = {
  add: add,
  subtract: subtract,
  multiply: multiply,
  divide: divide,
  abs: abs
};


define(function(require, exports, module) {
  'use strict';

  var user = require('./user');

  var say2 = function(message) {
    console.log(user.name + ' say: "' + message + '"')
  };

  exports.say2 = say2;

});
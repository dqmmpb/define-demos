define([
  './user'
], function (user) {
  'use strict';

  var say = function (message) {
    console.log(user.name + ' say: "' + message + '"')
  };

  return {
    say: say
  };

});

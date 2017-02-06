
define([
  './user'
], function(user) {

  var say = function(message) {
    console.log(user.name + ' say: "' + message + '"')
  };

  return {
    say: say
  };

});
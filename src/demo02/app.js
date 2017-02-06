
define([
  'amd/person',
  'amd/animal'
], function(person, animal) {
  console.log(person);
  person.say('Hello world!');
  animal.say2('123');
});
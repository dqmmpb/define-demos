define('user', [], {
    name: 'dqm',
    age: 18
});
define('person', ['user'], function (user) {
    var say = function (message) {
        console.log(user.name + ' say: "' + message + '"');
    };
    return { say: say };
});
define('app', ['person'], function (person) {
    console.log(person);
    person.say('Hello world!');
});
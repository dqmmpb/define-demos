/**
 * Created by alphabeta on 17-8-21.
 */

'use strict';

let friends = [{
    name: 'Tom',
    age: 11
}, {
    name: 'Sam',
    age: 12
}, {
    name: 'Kate',
    age: 8
}];

let names = friends.map(friend => {
    console.log(friend);
    return friend.name;
});

console.log(names);

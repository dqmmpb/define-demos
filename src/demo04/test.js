'use strict';

const R = require('ramda');

import set1 from './test.json';
import set2 from './house_resource.json';

console.log(set1.length);
console.log(set2.length);

let result = R.symmetricDifference(set1, set2);
console.log(result.length);
console.log(JSON.stringify(result));
var fs = require('fs');
var path = require('path');

fs.writeFile('./houser_not_in.txt', JSON.stringify(result), function (err) {

});

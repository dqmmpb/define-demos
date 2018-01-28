/**
 * Created by alphabeta on 17-11-14.
 */

// CommonJS引入
var {fixedMoney} = require('./FixedNumber');
// ES6 引入
// import {fixedMoney} from './FixedNumber';

var numbers = [
  '3.15',
  '3.15555',
  '3.1',
  '3',
  '1.',
  '1.1.',
  '1.1.5',
  '3.0',
  '4.00',
  '1..'
];

numbers.forEach(function (value) {
  console.log(value, fixedMoney(value, 2))
});

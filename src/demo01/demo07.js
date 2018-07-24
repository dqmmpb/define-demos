'use strict';

const regex = new RegExp('xyz', 'gimsuy');

console.log(regex.test('abcxyz'));


console.log(regex.flags);
console.log(regex.global);
console.log(regex.ignoreCase);
console.log(regex.multiline);
console.log(regex.dotAll);
console.log(regex.unicode);
console.log(regex.sticky);

console.log(/foo.bar/.test('foo\nbar'));
console.log(/foo.bar/s.test('foo\nbar'));


// const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;
// const matchObj = RE_DATE.exec('1999-12-31');
// const year = matchObj[1];
// const month = matchObj[2];
// const day = matchObj[3];
// console.log(year, month, day);

// node v9.11.2暂时不支持具名组匹配，但在harmony和谐模式下可支持。
// `node --harmony src/demo01/demo07.js` 或
// `babel-node --harmony src/demo01/demo07.js`
// node v10.3.0开始支持 详见https://node.green/
const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj.groups.year;
const month = matchObj.groups.month;
const day = matchObj.groups.day;
console.log(year, month, day);



var CryptoJS = require('crypto-js');

for(var i in CryptoJS.SHA1('123')) {
  console.log(i);
}

console.log(CryptoJS.SHA1('123').toString());


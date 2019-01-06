'use strict';

function to16(char) {
  return char.toString(16).toUpperCase().padStart(2, '0');
}

function Unicode2Utf8(unicode) {
  const utf8Codes = [];
  for(let char of unicode) {
    const utf8Code = [];
    const codePoint = char.codePointAt(0);
    if (codePoint < 0x80) {
      utf8Code.push(to16(codePoint));
    } else if (codePoint < 0x800) {
      utf8Code.push(to16(codePoint >> 6 & 0xDF | 0xC0));
      utf8Code.push(to16(codePoint & 0x3F | 0x80));
    } else if (codePoint < 0x10000) {
      utf8Code.push(to16(codePoint >> 12 & 0xEF | 0xE0));
      utf8Code.push(to16(codePoint >> 6 & 0x3F | 0x80));
      utf8Code.push(to16(codePoint & 0x3F | 0x80));
    } else if (codePoint < 0x110000) {
      utf8Code.push(to16(codePoint >> 18 & 0xF7 | 0xF0));
      utf8Code.push(to16(codePoint >> 12 & 0x3F | 0x80));
      utf8Code.push(to16(codePoint >> 6 & 0x3F | 0x80));
      utf8Code.push(to16(codePoint & 0x3F | 0x80));
    }
    utf8Codes.push(utf8Code.join(' '));
  }
  return utf8Codes.join('');
}


function Unicode(unicode) {
  const unicodes = [];
  for(let char of unicode) {
    const code = [];
    const codePoint = char.codePointAt(0);
    if (codePoint < 0xFFFF) {
      code.push(to16(codePoint >> 8 & 0xFF));
      code.push(to16(codePoint & 0xFF));
    } else {
      code.push(to16(codePoint >> 16 & 0xFF));
      code.push(to16(codePoint >> 8 & 0xFF));
      code.push(to16(codePoint & 0xFF));
    }
    unicodes.push(code.join(' '));
  }
  return unicodes.join('');
}

/**
 * \uXXXX  ->  \u7528
 * \xXX    ->  \xE7\x94\xA8
 * 10进制   ->  29992
 */
console.log(Unicode('\u7528') + '---------' + Unicode2Utf8('\u7528'));
console.log(Unicode('\u0040') + '---------' + Unicode2Utf8('\u0005'));
console.log(Unicode('\u0580') + '---------' + Unicode2Utf8('\u0580'));
console.log(Unicode('\u{1F680}') + '---------' + Unicode2Utf8('\u{1F680}'));
console.log(Unicode('\u{1F683}') + '---------' + Unicode2Utf8('\u{1F683}'));
console.log(Unicode('\u{1F684}') + '---------' + Unicode2Utf8('\u{1F684}'));
console.log(Unicode('\u{1F685}') + '---------' + Unicode2Utf8('\u{1F685}'));
console.log(Unicode('\u{1F681}') + '---------' + Unicode2Utf8('\u{1F681}'));

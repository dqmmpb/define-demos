'use strict';

console.log('\u0061');
console.log('\uD842\uDFB7');
console.log('\u20BB7');
console.log('\u{20BB7}');
console.log('\u{41}\u{42}\u{43}');

const s = '𠮷';
console.log(s.length);
console.log(s.charAt(0));
console.log(s.charAt(1));
console.log(s.charCodeAt(0));
console.log(s.charCodeAt(1));

const s1 = '𠮷a';
console.log(s1.length);
console.log(s1.codePointAt(0));
console.log(s1.codePointAt(1));
console.log(s1.codePointAt(2));


console.log(String.fromCharCode(0x20BB7));
console.log(String.fromCodePoint(0x20BB7));

for (let codePoint of 'foo') {
  console.log(codePoint);
}

const text = String.fromCodePoint(0x20BB7);

for (let i = 0; i < text.length; i++) {
  console.log(text[i]);
}

for (let i of text) {
  console.log(i);
}

console.log('abc'.charAt(0));
console.log('𠮷'.charAt(0));
console.log('abc'.at(0));
console.log('𠮷'.at(0));

const s2 = 'Hello world!';
console.log(s2.startsWith('Hello'));
console.log(s2.endsWith('!'));
console.log(s2.includes('o'));
console.log(s2.startsWith('world', 6));
console.log(s2.endsWith('Hello', 5));
console.log(s2.includes('Hello', 6));


console.log('x'.padStart(5, 'ab'));
console.log('x'.padStart(4, 'ab'));
console.log('x'.padEnd(5, 'ab'));
console.log('x'.padEnd(4, 'ab'));
console.log('12'.padStart(10, 'YYYY-MM-DD'));
console.log('09-12'.padStart(10, 'YYYY-MM-DD'));

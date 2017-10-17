var regexp_css = /http(s)?:\/\/.+?\.css$/gi;

// 正则表达式的深入学习 参看http://javascript.ruanyifeng.com/stdlib/regexp.html
// 另两篇关于此问题的讨论 但真的会从上一次结束的位置匹配吗？
// http://vilic.info/blog/archives/531
// http://www.cnblogs.com/_franky/archive/2010/05/02/1725859.html

/**
 * 如果正则表达式带有g修饰符，则每一次test方法都从上一次结束的位置开始向后匹配。
 * 因此对于同一个包含g的正则表达式对象regex，重复调用会出现意想不到的效果
 * 第一次返回true，第二次就返回false
 * 这是因为包含g修饰符的RegExp.test()方法，第一次从位置0开始查找，可以匹配；第二次的查找位置就不是0了，所以就不能匹配了。
 * 解决方式挺简单：每次都让test从第0个位置开始匹配就可以了
 */

var s1 = 'https://dqmmpb.github.io/';
var s2 = 'https://dqmmpb.github.io/assets/main.css';
console.log('1: ' + regexp_css.test(s1)); // false;
console.log('2: ' + regexp_css.test(s1)); // false;
console.log('1: ' + regexp_css.test(s2)); // true;
console.log('2: ' + regexp_css.test(s2)); // false;

/**
 * 设置lastIndex = 0;
 */
console.log('1: ' + regexp_css.test(s1)); // false;
regexp_css.lastIndex = 0;
console.log('2: ' + regexp_css.test(s1)); // false;
regexp_css.lastIndex = 0;
console.log('1: ' + regexp_css.test(s2)); // true;
regexp_css.lastIndex = 0;
console.log('2: ' + regexp_css.test(s2)); // false;


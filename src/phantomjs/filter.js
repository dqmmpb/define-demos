/**
 * Command in Terminal
 *   phantomjs filter.js
 * @type {*}
 */
/*

phantom.onError = function(msg, trace) {
  var msgStack = ['PHANTOM ERROR: ' + msg];
  if (trace && trace.length) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
      msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function +')' : ''));
    });
  }
  console.error(msgStack.join('\n'));
  //phantom.exit(1);
};
*/


var page = require('webpage').create();
var address = 'https://dqmmpb.github.io';
var regexp_css = /http(s)?:\/\/.+?\.css$/gi;

/**
 * 如果正则表达式带有g修饰符，则每一次test方法都从上一次结束的位置开始向后匹配。
 * 因此对于同一个包含g的正则表达式对象regex，重复调用会出现意想不到的效果
 * 第一次返回true，第二次就返回false
 * 这是因为包含g修饰符的RegExp.test()方法，第一次从位置0开始查找，可以匹配；第二次的查找位置就不是0了，说以就不能匹配了。
 * 解决方式挺简单：每次都让test从第0个位置开始匹配就可以了
 */
page.onResourceRequested = function(requestData, request) {
  var url = requestData['url'];
  console.log(url);
  console.log('1: ' + regexp_css.test(url));
  regexp_css.lastIndex = 0;
  console.log('2: ' + regexp_css.test(url));
  regexp_css.lastIndex = 0;

  // regexp_css.lastIndex = 0;
  // console.log('3: ' + regexp_css.test(url));
  if(regexp_css.test(url)) {
    console.log('Skiping', requestData['url']);
    request.abort();
  }
};

// 打开网址
page.open(address, function(status) {
  console.log('Status: ' + status);

  if(status !== 'success') {
    console.log('FAIL to load the address');
  } else {
    console.log('success');
  }
  phantom.exit();

});
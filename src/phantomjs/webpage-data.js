/**
 * Command in Terminal
 *   phantomjs webpage.js
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

// page.onConsoleMessage = function (msg) {
//   console.log('Evaluate: ' + msg);
// };
//
// page.onResourceRequested = function (requestData, networkRequest) {
//   console.log('Request (#' + requestData.id + '): ' + JSON.stringify(requestData));
// };
//
// page.onResourceReceived = function (response) {
//   console.log('Response (#' + response.id + ', stage "' + response.stage + '"): ' + JSON.stringify(response));
// };

// console.log(page);

var cdn_jquery = 'http://cdn.bootcss.com/jquery/3.1.1/jquery.min.js';
var address = 'http://www.xiniudata.com/search/%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD';
console.log('Address: ' + address);

// 指定浏览器视口的大小，height必须指定，不可省略
page.vieportSize = {
  width: 1920,
  height: 1080
};
// 指定渲染时（render方法和renderBase64方法）页面的放大系数，默认是1（100%）
page.zoomFactor = 0.5;

// 打开网址
page.open(address, function (status) {
  console.log('Status: ' + status);

  // 加载外部脚本，加载结束后调用回调函数
  page.includeJs(cdn_jquery, function () {

    // 打开网页后，在页面执行js代码
    var title = page.evaluate(function () {
      // console.log($('.post-link').html());
      // 加载jquery脚本后，可使用$获取元素
      console.log($('#filter').length);

      // 执行js代码，返回页面的title
      return document.title;
    });

    phantom.exit();
  });

});





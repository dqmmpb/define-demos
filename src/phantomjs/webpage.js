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

page.onConsoleMessage = function (msg) {
  console.log('Evaluate: ' + msg);
};

page.onResourceRequested = function (requestData, networkRequest) {
  console.log('Request (#' + requestData.id + '): ' + JSON.stringify(requestData));
};

page.onResourceReceived = function (response) {
  console.log('Response (#' + response.id + ', stage "' + response.stage + '"): ' + JSON.stringify(response));
};

console.log(page);

var cdn_jquery = 'http://cdn.bootcss.com/jquery/3.1.1/jquery.min.js';
var address = 'https://dqmmpb.github.io';
//var address = 'http://www.baidu.com/';
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
      console.log($('a.post-link').length);

      // 执行js代码，返回页面的title
      return document.title;
    });


    // 用于将网页保存成图片，参数就是文件名，目前支持PNG、GIF、JPEG和PDF格式
    page.render(title + '.jpeg', {
      format: 'jpeg',
      quality: '100'
    });
    page.render(title + '.png', {
      format: 'png',
      quality: '100'
    });
    page.render(title + '.gif', {
      format: 'gif',
      quality: '100'
    });

    page.evaluate(function () {
      var pageHeading = document.getElementsByClassName('page-heading');
      pageHeading[0].style.backgroundColor = '#0f0';
    });

    // 制定网页截图的大小，左上角从(0,0)坐标开始，宽100，高700
    page.clipRect = {top: 0, left: 0, width: 100, height: 700};
    page.render(title + '.pdf', {
      format: 'pdf',
      quality: '100'
    });

    console.log(page.renderBase64());
    phantom.exit();
  });

  /*  var title = page.evaluate(function() {
   console.log('Hello world!');
   return document.title;
   });

   console.log('Page title is ' + title);

   phantom.exit();*/
});




